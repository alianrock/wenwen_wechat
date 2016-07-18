var express = require("express");
var router = express.Router();
var Mock = require('mockjs');


router.get('/',function (req, res, next){
	res.json({"respCode":"0","respMsg":"操作成功","dataList":[{"time":1468573491945,"desc":"入库"}]});
});
module.exports = router;
