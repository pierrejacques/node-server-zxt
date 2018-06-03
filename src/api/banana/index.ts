import { Router } from 'express';
import getRecord from './getRecord';
import createRecord from './createRecord';
import deleteRecord from './deleteRecord';
import getComponent from './getComponent';
import createComponent from './createComponent';
import deleteComponent from './deleteComponent';
import getStatisticTypes from './getStatisticTypes';
import getLocation from './getLocation';

const router = new Router();

router.get('/record/get', getRecord);
router.post('/record/create', createRecord);
router.get('/record/delete', deleteRecord);
router.get('/component/get', getComponent);
router.get('/component/create', createComponent);
router.get('/component/delete', deleteComponent);
router.get('/statistic/type/get', getStatisticTypes);
router.get('/location/suggest/get', getLocation);

export default router;