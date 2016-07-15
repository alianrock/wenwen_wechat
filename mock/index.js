var express = require("express");
var router = express.Router();


//gettokens
router.use('/gettoken',require('./gettoken'));

//获取路由信息
router.use('/getroute',require('./getroute'));

//获取验证码
router.use('/getcode',require('./getcode'));

//绑定手机
router.use('/bine',require('./bine'));

//获取收件列表
router.use('/getarrivelist',require('./getarrivelist'));

module.exports = router;
