var mongoose = require('mongoose');
var Schema =  mongoose.Schema;
var goodsSchema =new Schema({
    "productId" : String,
    "productName" : String,
    "salePrice" : Number,
    "productImage" : String,
    "productUrl" : String
})

module.exports = mongoose.model('Goods',goodsSchema);




