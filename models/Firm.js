const mongoose=require("mongoose")

const firmSchema=new mongoose.Schema({
    firmName:{
        type:String,
        required:true,
        unique:true,
    },
    area:{
        type:String,
        required:true,
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','nonveg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:['south','north','chineese','bakery']
            }
        ]
    },
    offer:{
        type:String,
    },
    image:{
        type:String,
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Vendor',
        }
    ],
    Products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Products"
        }
    ]
})

const Firm=mongoose.model('Firm',firmSchema);

module.exports=Firm