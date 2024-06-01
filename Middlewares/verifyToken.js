
const vendorModel = require("../Models/vendorModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const secret = process.env.Secret

const verifyToken = async(req,res,next)=>{
    const token = req.headers.token
    if(!token){
        return res.status(404).send({message:"token is required"})
    }

    try {

        const decoded = jwt.verify(token,secret)
        const vendor = await vendorModel.findById(decoded.vendorId)
        if(!vendor){
            return res.status(404).send({message:"vendor not found"})

            
        }
        req.vendorId = vendor._id

        next()

    } catch (error) {

        return res.status(500).send({message:"Internal error occured nn"})
        console.log(error)
        
    }
}

module.exports = verifyToken