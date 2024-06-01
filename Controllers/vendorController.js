const vendorModel = require("../Models/vendorModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const { message } = require("prompt")

dotenv.config()

const secret = process.env.Secret

const vendorRegister = async(req,res)=>{
    const{username,email,password}=req.body

    try{

        const vendorEmail = await vendorModel.findOne({email})
        if(vendorEmail){
            return res.status(404).send({message:"email already taken"})
        }

        const hashedpassword = await bcrypt.hash(password,10)

        const newvendor = new vendorModel({
            username,
            email,
            password:hashedpassword
        })

        await newvendor.save()
        return res.status(200).send({message:"vendor registered successfully"})
    }
    catch(error){

        res.status(500).send({message:"Internal error occured"})
    }
}


//login 


const vendorLogin = async(req,res)=>{
    const{email,password}=req.body

    try {

        const vendor = await vendorModel.findOne({email})
        if(!vendor ||  !(await bcrypt.compare(password,vendor.password))){
            return res.status(404).send({message:"vendor or password is invalid"})
        }

        const vendorId = vendor._id

        const token = jwt.sign({vendorId:vendor._id},secret)
        res.status(200).send({message:"login success",token, vendorId})






        
    } catch (error) {
        res.status(500).send({message:"Internal error occured"})
        console.log(error)
        
    }

}


//get all vendors

const getAllVendors = async(req,res)=>{
    try {

        const vendors = await vendorModel.find().populate('firm')
        return res.status(200).send(vendors)
    } catch (error) {
        res.status(500).send({message:"Internal error occured"})
        console.log(error)
        
    }
}

//get vendor by id

const getvendorbyId = async(req,res)=>{
    try {

        const vendorId = req.params.id

        const vendor = await vendorModel.findById(vendorId).populate("firm")
        if(!vendor){
            res.status(404).send({message:"vendor not found"})
        }
        return res.status(200).send(vendor)
        
    } catch (error) {
        res.status(500).send({message:"Internal error occured"})
        console.log(error)
        
    }
}
module.exports = {vendorRegister,vendorLogin,getAllVendors,getvendorbyId}