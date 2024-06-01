const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const vendorRoute = require("./Routes/vendorRoute")
const firmRoute = require("./Routes/firmRoute")
const productRoute = require("./Routes/productRoute")






const PORT =  process.env.PORT||8000
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongo server connected successfully")
})
.catch((err)=>{
    console.log(err)
})


const app = express()
app.use(express.json())
app.use("/vendor",vendorRoute)
app.use("/firm",firmRoute)
app.use("/product",productRoute)
app.use("/uploads",express.static("uploads"))

app.listen(PORT,()=>{
    console.log("server up and running")
})

app.use("/", (req,res)=>{
    res.send("<h1>Welcome to Karma")
})