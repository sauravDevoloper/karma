const productModel = require("../Models/productModel")
const firmModel = require("../Models/firmModel")
const multer = require("multer");
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


const addproduct = async(req,res)=>{

    const{productname,price,category,bestSeller,description} = req.body

    const image = req.file? req.file.filename:undefined

    const firmId = req.params.id

    try {

        const firm = await firmModel.findById(firmId)
        if(!firm){
            return res.status(404).send({message:"firm not found"})
        }

        const product = new productModel({
            productname,
            price,
            category,
            image,
            bestSeller,
            description,
            firm:firm._id
        })

        const savedProduct = await product.save()
        firm.product.push(savedProduct)
        await firm.save()
        return res.status(200).send({message:"product added sucessfully"})
    } catch (error) {
        return res.status(400).send({message:"internal error occured "})
        
    }

}

//get products by firmId

const getProducts = async(req,res)=>{

    try{
        const firmId = req.params.id
        const firm = await firmModel.findById(firmId)
        
        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }
        const restaurantName = firm.firmname;


        const products = await productModel.find({firm:firmId})
        return res.status(200).send({restaurantName,products})
    }
    catch(error){

        return res.status(400).send({message:"internal error occured mmm"})
        
    }
}
//deleteproducts

const deleteproduct = async(req,res)=>{
    try {

        const productId = req.params.id
        const deletedproduct = await productModel.findByIdAndDelete(productId)
        if(!deletedproduct){
            return res.status(404).send({message:"product not found"})
        }

        return res.status(200).send({message:"product deleted successfully"})
    } catch (error) {

        return res.status(400).send({message:"internal error occured mmm"})
        
    }
}

module.exports = {addproduct:[upload.single("image"),addproduct,],getProducts,deleteproduct}