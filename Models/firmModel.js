const mongoose = require("mongoose")

const firmSchema = mongoose.Schema({
    firmname:{
        type:String,
        required:true
    },
    Area:{
        type:String,
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:["veg","non-veg"]
        }]
            
    },
    region:{
        type:[{
            type:String,
            enum:["south-indian","north-indian","bakery","chineese"]
        }]
            
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    vendor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendor"
    }],
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }]
})


const firmModel = mongoose.model("firm",firmSchema)

module.exports = firmModel