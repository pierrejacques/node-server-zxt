const statisticTypes = require('./statisticTypes');

/* GET */

module.exports = function (req, res, next) {
    res.status = 200;
    res.send({
        code: 200,
        data: statisticTypes,
        msg: '',
    });
}