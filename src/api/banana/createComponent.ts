import db from '../../database/banana';

/* GET */

export default async function (req, res, next) {
    const { name = '', unit = ''} = req.query;
    const { result, msg } = await db.createComponent({
        name,
        unit,
    });
    if (!result) {
        res.status = 400;
        res.send({
            code: 400,
            msg,
            data: null,
        });
    } else {
        res.status = 200;
        res.send({
            code: 200,
            msg: null,
            data: result,
        });
    }
}