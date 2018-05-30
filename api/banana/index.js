const router = require('express').Router();
const getRecord = require('./getRecord');
const createRecord = require('./createRecord');
const getComponent = require('./getComponent');
const createComponent = require('./createComponent');
const deleteComponent = require('./deleteComponent');
const getStatisticTypes = require('./getStatisticTypes');

router.get('/record/get', getRecord);
router.post('/record/create', createRecord);
router.get('/component/get', getComponent);
router.get('/component/create', createComponent);
router.get('/component/delete', deleteComponent);
router.get('/statistic/type/get', getStatisticTypes);

module.exports = router;

// TODO: record编辑
// TODO: record按时间范围查询
// TODO: record删除
// TODO: record导出
// TODO: record导入