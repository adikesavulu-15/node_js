const express=require("express")
const dotEnv=require('dotenv')
const mongoose=require('mongoose')
const vendorRoutes=require("./Routes/vendorRoutes")
const firmRoutes=require("./Routes/firmRoutes")
const bodyParser=require('body-parser')
const productRoutes=require('./Routes/productRoutes')
const cors=require('cors')
const path=require("path")
const app=express()


const PORT= process.env.PORT || 4000
dotEnv.config();
app.use(cors())
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('mongo db is  connected')).catch((error)=>console.log(error))

app.use(bodyParser.json())

app.use("/vendor",vendorRoutes)

app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use("/uploads",express.static('uploads'))
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})

app.use('/',(req,res)=>{
    res.send("<h1>Welcome to node js api </h1>")
})