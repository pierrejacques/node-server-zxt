const db = require('../../database/banana')();

/* GET */

// TODO: 下载记录

module.exports = async function (req, res, next) {
    const allrecord = await db.getRecords();
    if (!allrecord) {
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
            data: allrecord,
        });
    }
}