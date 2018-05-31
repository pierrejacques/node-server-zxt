const router = require('express').Router();
const getRecord = require('./getRecord');
const createRecord = require('./createRecord');
const deleteRecord = require('./deleteRecord');
const getComponent = require('./getComponent');
const createComponent = require('./createComponent');
const deleteComponent = require('./deleteComponent');
const getStatisticTypes = require('./getStatisticTypes');

router.get('/record/get', getRecord);
router.post('/record/create', createRecord);
router.get('/record/delete', deleteRecord);
router.get('/component/get', getComponent);
router.get('/component/create', createComponent);
router.get('/component/delete', deleteComponent);
router.get('/statistic/type/get', getStatisticTypes);

module.exports = router;

// TODO: record导出
// TODO: record导入