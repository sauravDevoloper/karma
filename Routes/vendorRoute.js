const vendorController = require("../Controllers/vendorController")
const express = require("express")

const router = express.Router()

router.post("/register", vendorController.vendorRegister)
router.post("/login",vendorController.vendorLogin)
router.get("/allvendors",vendorController.getAllVendors)
router.get("/singleVendor/:id",vendorController.getvendorbyId)
module.exports = router