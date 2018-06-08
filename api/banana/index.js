const router = require('express').Router();
const getRecord = require('./getRecord');
const createRecord = require('./createRecord');
const deleteRecord = require('./deleteRecord');
const getComponent = require('./getComponent');
const getStatisticTypes = require('./getStatisticTypes');
const getLocation = require('./getLocation');

router.get('/record/get', getRecord);
router.post('/record/create', createRecord);
router.get('/record/delete', deleteRecord);
router.get('/component/get', getComponent);
router.get('/statistic/type/get', getStatisticTypes);
router.get('/location/suggest', getLocation);

module.exports = router;