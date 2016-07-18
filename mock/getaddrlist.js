var express = require("express");
var router = express.Router();
var Mock = require('mockjs');


router.get('/',function (req, res, next){
	res.json({"respCode":"0","respMsg":"操作成功","dataList":[{"addressId":"12ca5419596c463fb86cfc45ccb169bb",
		"name":"哈哈",
		"phone":"15000000000",
		"pcdCode":"330000 330100 330102 ",
		"pcdName":"浙江省 杭州市 上城区 ",
		"detailAddress":"云水苑",
		"isDefault":"1",
		"type":"0"},{"addressId":"12ca5419596c463fb86cfc45ccb169bb12","name":"哈就哈哈哈哈哈哈","phone":"15000000000","pcdCode":"330000 330100 330102 ","pcdName":"浙江省 杭州市 上城区 ","detailAddress":"云水苑","isDefault":"0","type":"1"}]});
});
module.exports = router;
