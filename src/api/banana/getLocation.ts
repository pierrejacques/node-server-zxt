import db from '../../database/banana'

/* GET */

export default async function (req, res, next) {
    const name = String(req.query.name).trim();
    const query = {};
    if (name) {
        query.name = new RegExp(name, 'i');
    }
    const data = await db.Locations.find(query).lean();
    res.status = 200;
    res.send({
        code: 200,
        msg: null,
        data: data.map(i => i.name),
    });
}