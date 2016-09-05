var express = require("express");
var router = express.Router();


//gettokens
router.use('/gettoken',require('./gettoken'));

//获取路由信息
router.use('/getroute',require('./getroute'));

//获取验证码
router.use('/getcode',require('./getcode'));

//绑定手机
router.use('/bind',require('./bind'));

//获取收件列表
router.use('/getarrivelist',require('./getarrivelist'));

//获取列表项log
router.use('/getlog',require('./getlog'));

//改变取件方式
router.use('/changeway',require('./changeway'));


//获取地址列表
router.use('/getaddrlist',require('./getaddrlist'));

//删除地址
router.use('/deladdr',require('./deladdr'));

//编辑地址
router.use('/editaddr',require('./editaddr'));

//获取地址信息
router.use('/getArea',require('./getArea'));

module.exports = router;
