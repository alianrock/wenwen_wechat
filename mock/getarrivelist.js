var express = require("express");
var router = express.Router();
var Mock = require('mockjs');


router.get('/',function (req, res, next){
	res.json({
		respCode:'0',
		respMsg:'成功',
		dataList:[
		{
			dataId:1234,
			waybillStatus:0,
			taskId:1234124,
			taskStatus:0,
			pickupType:0,
			dispatchingWay:0,
			dispatchingWay:'顺丰',
			waybillNo:34143143143,
			storeName:'问问门店',
			areaNum:112345,
			ownerName:'',
			ownerPhone:'',
			senderName:'',
			senderPhone:'',
			senderAddress:'',
			receiverName:'',
			receiverPhone:'',
			receiverAddress:''
		}
		]

	});
});
module.exports = router;
