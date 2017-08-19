var express = require("express");
var router = express.Router();
var Mock = require('mockjs');


router.get('/',function (req, res, next){
	res.json(
        {"code":0,"msg":"获取成功","title":"sdfsdf","con":"<p><img src=\"/upload/images//787292030492610560.jpg\" alt=\"787292030492610560.jpg\"/></p>"}
    );
});

module.exports = router;

