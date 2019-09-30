var express = require('express');
var router = express.Router();
var Users = require('../models/users');
require('../dateTranslateString/dateTranslateString');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//用户登录的api
router.post('/login',function (req, res, next) {
    let param = {
        userName : req.body.userName,
        userPwd : req.body.userPwd
    }
    Users.findOne(param,function (err, userDoc) {
        if(err){
            res.json({status : 1,msg: '用户名或密码错误',result:''})
        }
        if(userDoc){
            res.cookie('userId',userDoc.userId,{
                path: '/',
                maxAge: 3 * 24 * 60 * 60 * 1000
            });
            res.cookie('userName',userDoc.userName,{
                path: '/',
                maxAge:  3 * 24 * 60 * 60 * 1000
            });
            res.json({
                status : 0,
                msg: '返回用户名',
                result : {
                    userName: userDoc.userName
                }
            })
        }else{
            res.json({status : 1,msg: '用户名不存在',result:''})
        }


    })
})
//检测用户登录的状态api
router.post('/checkLogin',function (req,res,next) {
    if(req.cookies.userId){
        res.json({
            status: 0 ,
            msg: '用户已登录',
            result: req.cookies.userName
        })
    }else{
        res.json({
            status: 1,
            msg: '未登录',
            result: ''
        })
    }

})
//检测退出，账户状态的api
router.post('/loginOut',function (req,res,next) {
    res.cookie('userId','',{
        path: '/',
        maxAge: -1
    })

    res.json({
        status: 0,
        msg: '账号退出成功',
        result: ''
    })


})
//获取用户购物车里面的信息api
router.post('/cartList',function (req, res, next) {
    let userId = req.cookies.userId;
    Users.findOne({userId:userId},function (err, doc) {
        if(err){
            res.json({
                status: 1,
                msg: err.doc,
                result: ''
            })
        }else{
            res.json({
                status: 0,
                msg: '',
                result:doc.cartList
            })
        }

    })
})
//前端更新商品数量api
router.post('/cartEdit',function (req, res, next) {
    let userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum,
        checked = req.body.checked

    Users.update({ 'userId':userId , "cartList.productId": productId},{
        "cartList.$.productNum": productNum,
        "cartList.$.checked": checked
    },function (err, doc) {
        if(err){
            res.json({
                status: 1,
                msg: '',
                result: '改变商品数量失败'
            })
        }else{
            res.json({
                status: 0,
                msg: '',
                result: '改变商品数量成功'
            })
        }
    })
})
//前端更新全选数据
router.post('/editCheckedAll',function (req, res, next) {
    let userId = req.cookies.userId,
        checkedAll = req.body.checkedAll

    Users.findOne({'userId': userId},function (err, doc) {
        if(err){
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            })
        }else{
            doc.cartList.forEach((item)=>{
                item.checked = checkedAll;
            })

            doc.save(function(err1,doc1){
                if(err) {
                    res.json({
                        status: 1,
                        msg: err.message,
                        result: '全选操作失败'
                    })
                }else{
                    res.json({
                        status : 0,
                        mag: '',
                        result:'全选操作成功'
                    })
                }
            })
        }

    })
})
//购物车商品删除接口
router.post('/cartListDel',function (req, res, next) {
    var userId = req.cookies.userId,
        productId = req.body.productId;

    Users.update({
            userId:userId
    },{
        $pull:{
            'cartList' : {
                'productId' : productId
            }
        }
    },function (err, doc) {
        if(err){
            res.json({
                status : 1,
                msg : err.message,
                result : ''
            })
        }else{
            res.json({
                status : 0,
                msg : '',
                result : '商品删除成功'
            })
        }
    })
})
//获取用户收获地址‘
router.post('/addressList',function (req, res, next) {
    var userId = req.cookies.userId;
    Users.findOne({
        userId : userId
    },function (err, doc) {
        if(err){
            res.json({
                status : 0,
                msg : err.message,
                result : ''
            })
        }else{
            res.json({
                status : 0,
                msg : '',
                result : doc.addressList
            })
        }
    })
})
//设置默认地址
router.post('/setDefault',function (req, res, next) {
   var userId = req.cookies.userId,
       addressId  = req.body.addressId
   if(!addressId){
       res.json({
           status : 1,
           msg : '地址id错误',
           result : ''

       })
   }else{
       Users.findOne({userId : userId},function (err,doc) {
           var addressList = doc.addressList
           addressList.forEach((item)=>{
               if(item.addressId == addressId){
                   item.isDefault = true
               }else{
                   item.isDefault = false
               }
           })
           doc.save(function (err1, doc1) {
               if(err1){
                   res.json({
                       status : 1,
                       msg : err1.message,
                       result : ''
                   })
               }else{
                   res.json({
                       status : 0,
                       msg : '',
                       result : doc1
                   })
               }
           })

       })

   }
})
//生成详细订单
router.post('/payment',function (req, res, next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId,
        orderTotal = req.body.orderTotal
    Users.findOne({userId : userId},function (err, doc) {
        if(err){
            res.json({
                status : 1,
                msg : err.message,
                result : ''
            })
        }else{
            var address = '',
                goodsList = []
            doc.addressList.forEach((item)=>{
                if(item.addressId == addressId){
                    address = item
                }
            })
            doc.cartList.filter((item)=>{
                if(item.checked){
                    goodsList.push(item)
                }
            })

            var prev = '622';
            var r1 = Math.floor(Math.random()*10);
            var r2 = Math.floor(Math.random()*10);
            var sysDate = new Date().Format('yyyyMMddhhmmss');
            var orderId = prev + r1 + sysDate + r2;
            var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
            var order = {
                orderId : orderId,
                orderTotal : orderTotal,
                addressInfo : address,
                goodsList : goodsList,
                orderStatus : '10',
                createDate : createDate
            }
            doc.orderList.push(order);
            doc.save(function (err1,orderList) {
                if(err1){
                    res.json({
                        status : 1,
                        msg : err1.message,
                        result : ''
                    })
                }else{
                    res.json({
                        status : 0,
                        msg : '',
                        result : {
                            orderId : order.orderId,
                            orderTotal : order.orderTotal
                        }
                    })
                }
            })

        }
    })
})
//根据订单id查询信息
router.get('/orderDetail',function(req,res,next){
    var userId = req.cookies.userId,orderId = req.param("orderId");
    Users.findOne({userId : userId},function(err,userInfo){
        if(err){
            res.json({
                status : 1,
                msg : err.message,
                result : ''
            })
        }else{
            var orderList = userInfo.orderList;
            var orderTotal = 0
            if(orderList.length > 0){
                orderList.forEach((item)=>{
                    if(item.orderId == orderId){
                        orderTotal = item.orderTotal
                    }
                })
                if(orderTotal > 0){
                    res.json({
                        status : 0,
                        msg : '',
                        result : {
                            orderId : orderId,
                            orderTotal : orderTotal
                        }
                    })
                }
            }else{
                res.json({
                    status : 1,
                    msg : '',
                    result : '还未购买过商品哦！'
                })
            }

        }


    })
})
module.exports = router;
