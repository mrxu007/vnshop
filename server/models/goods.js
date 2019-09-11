var mongoose = require('mongoose');
var Schema =  mongoose.Schema;
var goodsSchema =new Schema({
    "productId" : String,
    "productName" : String,
    "salePrice" : Number,
    "productImage" : String,
    "productNum" : Number,
    "productUrl" : String
})

module.exports = mongoose.model('Goods',goodsSchema);




