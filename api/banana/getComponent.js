const db = require('../../database/banana')();

/* GET */

module.exports = async function (req, res, next) {
    const data = await db.Components.find({}).lean();
    if (!data) {
        res.status = 500;
        res.send({
            code: 500,
            msg: '服务器错误',
            data: null,
        });
    } else {
        res.status = 200;
        res.send({
            code: 200,
            msg: null,
            data: data.map(item => ({
                name: item.name,
                unit: item.unit,
            })),
        });
    }
}