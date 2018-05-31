const IPA = require('ipa.js');
const { or, From, Integer, assemble } = IPA;
const db = require('../../database/banana')();

/* GET */

const querySchema = new IPA({
    index: assemble(IPA.getInstance('looseStr'), IPA.getInstance('looseInt')),
    amount: assemble(IPA.getInstance('looseStr'), IPA.getInstance('looseInt')),
    from: IPA.getInstance('looseDateStr'),
    to: IPA.getInstance('looseDateStr'),
    type: IPA.getInstance('encodeTypeArr'),
});

module.exports = async function (req, res, next) {
    if (!querySchema.check(req.query)) {
        res.status = 400;
        res.send({
            code: 400,
            data: null,
            msg: '参数错误',
        });
    }
    const { index = 0, amount = 10, from, to, type } = querySchema.guarantee(req.query);
    console.log('index:', index);
    console.log('amount:', amount);
    const query = {};
    if (from || to) {
        query.date = {};
        if (from) {
            query.date.$gte = from;
        }
        if (to) {
            query.date.$lte = to;
        }
    }
    if (type) {
        query.type = {
            $in: type,
        };
    }
    const allrecord = await db.Records.find(query).lean();
    allrecord.sort((a, b) => a.date < b.date ? 1 : -1);
    if (!allrecord) {
        res.status = 500;
        res.send({
            code: 500,
            msg: '服务器错误',
            data: null,
        });
    } else {
        res.status = 200;
        const nextIndex = +index + amount;
        const recordList = allrecord.slice(+index, nextIndex);
        recordList.forEach(item => {
            item.id = item._id;
            delete item._id;
            delete item.__v;
            if (item.components) {
                item.components.forEach(comp => {
                    delete comp._id;
                });
            }
        });
        const reachEnd = nextIndex >= allrecord.length;
        res.send({
            code: 200,
            msg: null,
            data: {
                nextIndex,
                recordList,
                reachEnd,
            }
        });
    }
}