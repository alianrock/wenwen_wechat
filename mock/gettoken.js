var express = require("express");
var router = express.Router();
var Mock = require('mockjs');


router.get('/',function (req, res, next){
	res.json({
		respCode:0,
		respMsg:'成功',
		token:'',
		phone:'123233333'
	});
});
module.exports = router;
