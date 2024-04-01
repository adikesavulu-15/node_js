const Vendor=require("../models/Vendor")
const Firm=require("../models/Firm")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs");
const dotEnv=require('dotenv')


dotEnv.config()
const secretKey=process.env.whatIsYourName
const vendorRegister=async(req,res)=>{
    const {username,email,password}=req.body;

    try{
        const vendorEmail=await Vendor.findOne({email})
        if(vendorEmail){
            return res.status(400).json("email already taken")
        }
        const hashPassword=await bcrypt.hash(password,10)

        const newVendor=new Vendor({
            username,
            email,
            password:hashPassword,
        });

        await newVendor.save();

        res.status(201).json({message:"vendor register successfully"})
        console.log('registered')
    }catch(error){
        console.log(error)
        res.status(500).json({error:"interbal server error"})
    }
}



const vendorLogin=async(req,res)=>{
    const {email,password}=req.body

    try {
        const vendor=await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"invalid username or pass"})
        }
        const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})
        res.status(200).json({success:'login success',token})
        console.log(email,token);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'})
    }
}
const getAllVendors=async(req,res)=>{
    try {
        const vendors=await Vendor.find().populate('firm')
        res.json(vendors)    
    } catch (error) {
        console.log(error)
    }
}

const getVendorById=async(req,res)=>{
    const vendorId=req.params.id
    
    try {
        const vendor=await Vendor.findById(vendorId).populate("firm")
        if(!vendor){
            return res.status(404).json({message:'not found'})
        }
        res.status(200).json({vendor})
        
    } catch (error) {
        console.log(error)
    }
}
module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}