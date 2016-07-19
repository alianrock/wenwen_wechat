var express = require("express");
var router = express.Router();
var Mock = require('mockjs');


router.get('/',function (req, res, next){
	res.json({"respCode":"0","respMsg":"操作成功","EBusinessID":"1260903","OrderCode":null,"ShipperCode":"ANE","LogisticCode":"210001633605","Success":true,"Reason":null,"State":"3","Traces":[{"AcceptTime":"2016-03-31 16:11:00","AcceptStation":"快件在【朝阳会员赵浩阳】装车","Remark":""},{"AcceptTime":"2016-03-31 17:07:14","AcceptStation":"快件到达【北京分拨中心】","Remark":""},{"AcceptTime":"2016-04-01 04:54:02","AcceptStation":"快件在【北京分拨中心】装车","Remark":""},{"AcceptTime":"2016-04-01 07:36:59","AcceptStation":"快件到达【天津分拨中心】","Remark":""},{"AcceptTime":"2016-04-01 10:55:56","AcceptStation":"快件在【天津分拨中心】装车","Remark":""},{"AcceptTime":"2016-04-01 13:44:10","AcceptStation":"快件到达【和平滨江道】","Remark":""},{"AcceptTime":"2016-04-01 13:44:12","AcceptStation":"【和平滨江道】的【和平滨江道】正在派件","Remark":""},{"AcceptTime":"2016-04-01 15:14:31","AcceptStation":"","Remark":""},{"AcceptTime":"2016-04-03 09:42:48","AcceptStation":"【和平滨江道】的【和平滨江道】正在派件","Remark":""},{"AcceptTime":"2016-04-03 09:43:16","AcceptStation":"【刘刚】已签收","Remark":""}]});
});
module.exports = router;
