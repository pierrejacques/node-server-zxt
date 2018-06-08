const db = require('../../database/banana')();

/* GET */

module.exports = async function (req, res, next) {
    const { id } = req.query;
    const { n } = await db.Records.deleteMany({ _id: id });
    res.status = 200;
    res.send({
        code: 200,
        msg: n ? '删除成功' : '删除失败',
        data: n,
    });
}