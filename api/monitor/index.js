const router = require('express').Router();
const db = require('../../database/monitor')();

router.post('/push', async (req, res, next) => {
    const result = await db.createRecord(req.body);
    res.status = 200;
    res.send(!!result);
});

router.get('/get', async (req, res, next) => {
    const { type } = req.query;
    const queryObj = {};
    if (type) {
        queryObj.type = type;
    }
    const result = await db.Records.find(queryObj);
    res.status = 200;
    res.send({
        code: 200,
        msg: '',
        data: result,
    });
});

module.exports = router;