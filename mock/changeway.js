var express = require("express");
var router = express.Router();
var Mock = require('mockjs');


router.get('/',function (req, res, next){
	res.json({"respCode":"5","respMsg":"操作成功"});
});
module.exports = router;
