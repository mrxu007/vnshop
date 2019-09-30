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
    "addressList" : [{
        "addressId" : String,
        "userName" : String,
        "streetName" : String,
        "postCode" : String,
        "tel" : String,
        "isDefault" : Boolean
    }]
})

module.exports =  mongoose.model('Users',userSchema);