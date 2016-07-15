var express = require("express");
var router = express.Router();
var Mock = require('mockjs');


router.get('/',function (req, res, next){
	res.json({
		respCode:'0',
		respMsg:'成功',
		token:'12342341214',
		phone:'123467834567'
	});
});
module.exports = router;
