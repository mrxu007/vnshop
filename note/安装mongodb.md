1.mongodb :     轻型数据储存数据库
                默认端口270717
                储存方式为文档方式
                键 ：值   的这种方式进行储存

        下载mongodb  并安装
        下载mongodb可视化工具
        配置环境变量 再path里   把 mongodb的bin路径复制放入就行
        开启服务 和mysql服务一样
        进入server文件夹
            先自己新建一个文件夹（data）   使用 mongod --dapath e:\data  将数据库初始化
            再安装mongoose依赖 npm install mongoose -D



2.在server文件夹中如何实现一个接口呢
    首先确保服务中的mongodb服务开启
    再在server使用npm start 启动后端

        1）先建一个是视图模型输出数据的格式（暂用models/goods.js）与routes中的good.js对应
            var mongoose = require('mongoose');//需要mongoose的依赖
            var Schema = mongoose.Schema;
            var prouductSchema = new Schema({
                "productId" : String,
                "productName" : String,
                "productPrice" : Number,
                "productImage" : String,
                "productNum" : String,
            })
            module.exports =  mongoose.model('Goods',prouductSchema)

        2）在routes中写一个对应的配置（暂用goods.js）
            var exprss = require('express');
            var router =  exprss.Router();
            var mongoose = require('mongoose');
            var Goods = require('../models/goods');
            mongoose.connect('mongodb://localhost:27017/shop');
            mongoose.connection.on('connected',function () {
                    console.log('mongondb connected success');
            })
            mongoose.connection.on('error',function () {
                console.log('mongondb connected fail');
            })

            mongoose.connection.on('disconnected',function () {
                console.log('mongondb connected disconnected');
            })
            //二级路由输出数据
            router.get('/list',function(req,res){
                Goods.find({},function (err,doc) {
                    res.json({status: 0,result: doc})
                })
            })
            //导出该路由
            module.exports = router;

        3）在app.js中使用该路由
            var goods = require('./routes/goods');
            app.use('/goods',goods);




