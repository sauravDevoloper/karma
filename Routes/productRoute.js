const productController = require("../Controllers/productController")
const express  = require("express")

const router = express.Router()

router.post("/addproduct/:id",productController.addproduct )
router.get("/getproducts/:id",productController.getProducts)
router.delete("/delete/:id",productController.deleteproduct)
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

module.exports = router