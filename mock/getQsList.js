var express = require("express");
var router = express.Router();
var Mock = require('mockjs');


router.get('/',function (req, res, next){
	res.json(
{"code":0,"msg":"获取成功","list":[{"_id":"5803a843b6ae06cf4d4d5524","contant":"<p><img src=\"/upload/images//787292030492610560.jpg\" alt=\"787292030492610560.jpg\"/></p>","title":"sdfsdf","__v":0,"editorList":[{"_id":"57ff5348b6e6fb3f2dab8f58","name":"wzl","realName":"王","password":"$2a$10$yxQmEaPY1998rh0VQh32KuyAf5rNGWem2xR8xhGkP81NegxRfVvH.","__v":0,"isAdmin":true,"grade":0}]},{"_id":"5803a845b6ae06cf4d4d5525","contant":"<p><img src=\"/upload/images//787292030492610560.jpg\" alt=\"787292030492610560.jpg\"/></p>","title":"sdfsdf","__v":0,"editorList":[{"_id":"57ff5348b6e6fb3f2dab8f58","name":"wzl","realName":"王","password":"$2a$10$yxQmEaPY1998rh0VQh32KuyAf5rNGWem2xR8xhGkP81NegxRfVvH.","__v":0,"isAdmin":true,"grade":0}]},{"_id":"5803afaeb7e6a8d0baea915b","contant":"<p>sadfsdafa</p>","title":"sdfsfsafs","__v":0,"editorList":[{"_id":"57ff5348b6e6fb3f2dab8f58","name":"wzl","realName":"王","password":"$2a$10$yxQmEaPY1998rh0VQh32KuyAf5rNGWem2xR8xhGkP81NegxRfVvH.","__v":0,"isAdmin":true,"grade":0}]}]}
);
});
module.exports = router;

