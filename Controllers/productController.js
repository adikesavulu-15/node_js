const Product=require("../models/Product")
const Firm=require("../models/Firm")
const multer=require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename will be current timestamp + original file name
    }
});

// Initialize multer instance with storage options
const upload = multer({ storage: storage });

const addProduct=async(req,res)=>{
   
    try {
        const{productName,price,category,bestseller,description}=req.body
        const image=req.file?req.file.filename:undefined;

        const firmId=req.params.firmId
        const firm=await Firm.findById(firmId)
        if(!firm){
            return res.status(404).json({error:'no firm found'})
        }

        const product=new Product({
            productName,price,category,bestseller,description,image,firm:firm._id
        })
        const savedProduct=await product.save()
        firm.Products.push(savedProduct) 
        await firm.save()

        res.status(200).json({savedProduct})
    } catch (error) {
        console.error(error)
        res.status(404).json({message:"not found"})
    }
}
const getProductByFirm=async(req,res)=>{
    try {
        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId)
        if(!firm){
            return res.status(500).json({messgae:"firm is not found"})
        }
        const rest=firm.firmName;
        const products=await Product.find({firm:firmId})
        res.status(200).json({rest,products})

    } catch (error) {
        console.error(error)
        res.status(404).json({message:"not found"})
    }
}

const deleteProductById=async(req,res)=>{
    try {
        const productId=req.params.productId
        const deletedProduct=await Product.findByIdAndDelete(productId)

        if(!deletedProduct){
            return res.status(500).json({message:"product not defined"})
        }
    } catch (error) {
        console.error(error)
        res.status(404).json({message:"not found"})
    }
}
module.exports={addProduct: [upload.single('image'),addProduct],getProductByFirm,deleteProductById}