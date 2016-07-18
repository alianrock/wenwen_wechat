var express = require("express");
var router = express.Router();
var Mock = require('mockjs');


router.get('/',function (req, res, next){
	res.json({"respCode":"0","respMsg":"操作失败","EBusinessID":"1260903","OrderCode":null,"ShipperCode":"ANE","LogisticCode":"21000163360","Success":true,"Reason":"此单无物流信息","State":null,"Traces":[]});
});
module.exports = router;
