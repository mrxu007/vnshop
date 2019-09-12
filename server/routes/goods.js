var express = require('express');
var router =  express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var Users= require('../models/users');

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
//前端商品数据
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
//前端购物车
router.post('/addCart',function (req, res) {
    // api
    // 接收商品
    // good_id
    // user_id  谁加入的购物车  （总不可能全网页的人加入一个购物车把）
    //
    // 1）查询用户，确定是哪个用户添加的商品
    // 2）通过商品的id去数据库查询，把商品的信息查出来
    // 此时去查询这个商品是否存在于用户购物车列表里，
    //     如果有，就商品的数量+1，不存在就把整个商品信息存在里面
    // 然后存在用户里面
    //用户id
    let userId = '100000077';
    //商品id
    let productId = req.body.productId
    // console.log(productId);
    Users.findOne({ 'userId' : userId },function (err1, usersDoc) {
        // 2）通过商品的id去数据库查询，把商品的信息查出来
        let goodItem = '';
        usersDoc.cartList.forEach(function (item) {
            if(item.productId == productId){
                //如果用户购物车中存在这个商品 那这个商品数量就增加
                goodItem = item;
                item.productNum++
            }
        })
        if(goodItem){
            usersDoc.save(function(err4,goodItemDoc){
                if(err4){
                    res.json({status : 1 ,msg : err4.message})
                }else{
                    res.json({status : 0 ,msg : '',result : "商品数量添加成功"})
                }

            })
        }else{
            Goods.findOne({ productId : productId },function (err2,goodsDoc) {

                goodsDoc.productNum = 1;
                // res.json({result : goodsDoc});
                usersDoc.cartList.push(goodsDoc);
                usersDoc.save(function (err3,doc) {
                    if(err3){
                        res.json({
                            status : 1,
                            msg : err3.message
                        })
                    }else{
                        res.json({
                            status : 0,
                            msg : '',
                            result : "加入购物车成功"
                        })
                    }

                })
            })

        }



    })

})

module.exports = router;