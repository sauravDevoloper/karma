const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:["veg","non-veg"]
        }]
    },
    image:{
        type:String
        
    },
    bestSeller:{
        type:Boolean

    },
    description:{
        type:String
    },
    firm:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"firm"
        }]
    
})

const productModel = mongoose.model("product",productSchema)

module.exports = productModel