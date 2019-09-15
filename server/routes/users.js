var express = require('express');
var router = express.Router();
var Users = require('../models/users');

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
module.exports = router;
