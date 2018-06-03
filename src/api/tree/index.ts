const router from 'express').Router()
const regist from './regist');
const checkusername from './checkusername');
const login from './login');
const saveTree from './saveTree');
const userinfo from './userinfo');
const latestTree from './latestTree');
const logout from './logout');
const gethistory from './gethistory');

router.get('/userinfo', userinfo);
router.get('/checkusername', checkusername);
router.get('/latestTree', latestTree);
router.get('/logout', logout);
router.get('/gethistory', gethistory);
router.post('/regist', regist);
router.post('/login', login);
router.post('/saveTree', saveTree);


export default router;
