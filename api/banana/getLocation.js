const db = require('../../database/banana')();

/* GET */

module.exports = async function (req, res, next) {
    const { name } = req.query;
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