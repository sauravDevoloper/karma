
const firmModel = require("../Models/firmModel")
const vendorModel = require("../Models/vendorModel")
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });


const addfirm = async(req,res)=>{
    const{firmname,Area,category,region,offer} = req.body

    try {

        const image = req.file? req.file.filename:undefined

        const vendor = await vendorModel.findById(req.vendorId)

        if(!vendor){
            return res.status(404).send({message:"vendor not found"})
        }

        const newfirm = new firmModel({
            firmname,
            Area,
            category,
            region,
            offer,
            image,
            vendor:vendor._id
        })

        const savedfirm = await newfirm.save()
        vendor.firm.push(savedfirm)
        await vendor.save()
        return res.status(200).send({message:"firm added successfully"})








        
    } catch (error) {


        console.log(error)

        return res.status(400).send({message:"internal error occured mmm"})
        
        
    }
}

//get all firms

const getAllFirms = async(req,res)=>{
    try {

        const firms = await firmModel.find().populate("product")
        return res.status(200).send(firms)



        
    } catch (error) {
        console.log(error)

        return res.status(400).send({message:"internal error occured mmm"})
        
    }
}




//delete firm

const deletefirm = async(req,res)=>{

    try {

        const firmId = req.params.id
        const deletedfirm = await firmModel.findByIdAndDelete(firmId)
        if(!deletedfirm){
            return res.status.send({message:"firm not found"})
        }
    } catch (error) {

        console.log(error)

        return res.status(400).send({message:"internal error occured mmm"})
        
    }
}

module.exports = {addfirm:[upload.single("image"),addfirm],getAllFirms,deletefirm}