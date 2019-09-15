var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    "userId" : String,
    "userName" : String,
    "userPwd" : String,
    "orderList" : Array,
    "cartList" : Array,
    "cartList" : [{
        "productId" : String,
        "productName" : String,
        "salePrice" : Number,
        "productImage" : String,
        "productNum" : Number,
        "productUrl" : String,
        "checked" : Boolean,
    }],
    "addressList" : []
})

module.exports =  mongoose.model('Users',userSchema);