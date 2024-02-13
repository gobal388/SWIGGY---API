const mongoose=require('mongoose')

const RestaurantSchema=new mongoose.Schema({
    areaName:{
        type:String
    },
    avgRating:{
        type:Number
    },
    costForTwo:{
        type:String
    },
    cuisines:{
        type:Array
    },
    name:{
        type:String
    }
})

const userSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    contact:{
        type:Number
    }
})
const Users =mongoose.model('User-Details',userSchema)
const Restaurant =mongoose.model('RestaurantDetails',RestaurantSchema)

module.exports={Restaurant,Users}