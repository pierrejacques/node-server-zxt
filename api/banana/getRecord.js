const db = require('../../database/banana')();

/* GET */

module.exports = async function (req, res, next) {
    let { index = 0, amount = 10 } = req.query;
    const allrecord = await db.getRecords();
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