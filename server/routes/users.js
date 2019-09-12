var express = require('express');
var router = express.Router();
var Users = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
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
                maxAge: 1000 * 60 * 60
            });
            res.cookie('userName',userDoc.userName,{
                path: '/',
                maxAge: 1000 * 60 * 60
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
module.exports = router;
