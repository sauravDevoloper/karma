const express = require("express")
const firmController = require("../Controllers/firmController")
const verifyToken = require("../Middlewares/verifyToken")


const router = express.Router()

router.post("/addfirm",verifyToken,firmController.addfirm)
router.get("/allfirms",firmController.getAllFirms)
router.delete("/deletefirm/:id",firmController.deletefirm)
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});


module.exports = router