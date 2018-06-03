import { Router } from 'express';
import regist from './regist';
import checkusername from './checkusername';
import login from './login';
import saveTree from './saveTree';
import userinfo from './userinfo';
import latestTree from './latestTree';
import logout from './logout';
import gethistory from './gethistory';

const router = Router();

router.get('/userinfo', userinfo);
router.get('/checkusername', checkusername);
router.get('/latestTree', latestTree);
router.get('/logout', logout);
router.get('/gethistory', gethistory);
router.post('/regist', regist);
router.post('/login', login);
router.post('/saveTree', saveTree);


export default router;
