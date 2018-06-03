import statisticTypes from './statisticTypes';

/* GET */

export default function (req, res, next) {
    res.status = 200;
    res.send({
        code: 200,
        data: statisticTypes,
        msg: '',
    });
}