const moment from 'moment';
import db from '../../database/tree';

/* GET */

// FIXME: 由于不合理的数据维护结构导致获取历史树的过程极为啰嗦且低效

export default async function (req, res, next) {
    const _id = req.cookies.user_id;
    res.status = 200;
    if (!_id) {
        res.send({
            code: 400,
            success: false,
            msg: '没有权限',
        });
        return;
    }
    const user = await db.findUser({ _id });
    const treeInfos = Array.apply(null, { length: user.trees.length });
    const task = new Promise((resolve, reject) => {
        num = user.trees.length;
        count = 0;
        user.trees.forEach((_id, idx) => {
            db.findTree(_id).then(tree => {
                count ++;
                treeInfos[idx] = {
                    createdOn: moment(tree.createOn).format('YYYY-MM-DD hh:mm:ss'),
                    _id,
                };
                if (count === num) {
                    resolve();
                }
            }, reject);
        });
    });
    task.then(() => {
        res.send({
            code: 200,
            msg: '',
            success: true,
            data: treeInfos,
        });
    }, () => {
        res.send({
            code: 500,
            msg: '读取家谱错误',
            success: false,
        });
    });
}