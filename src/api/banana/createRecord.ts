import db from '../../database/banana'

/* POST */

export default async function (req, res, next) {
    const result = await db.createRecord(req.body);
    if (!result) {
        res.status = 400;
        res.send({
            code: 400,
            msg: '参数格式错误',
            data: null,
        });
    } else {
        res.status = 200;
        res.send({
            code: 200,
            msg: null,
            data: result._id,
        });
    }
}