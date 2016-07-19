var express = require("express");
var router = express.Router();
var Mock = require('mockjs');


router.get('/',function (req, res, next){
	res.json({
		respCode:'0',
		respMsg:'成功',
		addressId:'12ca5419596c463fb86cfc45ccb169bb12'
	});
});
module.exports = router;
