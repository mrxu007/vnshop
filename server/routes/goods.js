var express = require('express');
var router =  express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

mongoose.connect('mongodb://localhost:27017/shop',{ useNewUrlParser: true });
mongoose.connection.on('connected',function () {
    console.log('mongodb 连接成功');
})

mongoose.connection.on('error',function () {
    console.log('mongodb connected fail');
})

mongoose.connection.on('disconnected',function () {
    console.log('mongodb connected disconnected');
})

router.get('/list',function(req,res){
    // db.col.find({likes : {$gt : 100}})
    //接收前端传过来的数据
    let sort = req.param('sort');
    let priceLevel = req.param('priceLevel');
    // let priceGt = '',priceLte = '';
    let param = {};
    if(priceLevel!='All') {
        // switch (priceLevel) {
        //     case '0' : priceGt = 0; priceLte = 100; break;
        //     case '1' : priceGt = 100; priceLte = 500; break;
        //     case '2' : priceGt = 500; priceLte = 1000; break;
        //     case '3' : priceGt = 1000; priceLte = 5000; break;
        // }
        //表驱动法：
        let priceItem = [[0,100],[100,500],[500,1000],[1000,5000]];
        param = {
            salePrice : {
                $gt : priceItem[priceLevel][0],
                $lte : priceItem[priceLevel][1]
            }
        }
    }
    let currentPage = parseInt(req.param('page'))>0 ?  parseInt(req.param('page')) : 1;
    let pageSize = parseInt(req.param('pageSize'))>0 ? parseInt(req.param('pageSize')) : 8;
    //当分码在哪页，数据库就要跳过多少条数据
    let skip = (currentPage -1) * pageSize;
    let goodSort = Goods.find(param).sort({'salePrice':sort}).skip(skip).limit(pageSize);
    goodSort.exec({},function (err,data) {
        res.json({status: 0, result:data})
    })
})
module.exports = router;