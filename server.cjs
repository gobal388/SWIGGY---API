const express=require('express')
const bodyparser= require('body-parser')
const cors =require('cors')
const mongoose= require('mongoose')


const {Restaurant,Users}=require('./Schema.cjs')

const app=express()

app.use(bodyparser.json())
app.use(cors())

const port =process.env.PORT || 8000

async function connectToDb() {
    try{
        await mongoose.connect('mongodb+srv://krish:gobal@cluster0.3akbqm2.mongodb.net/Swigi?retryWrites=true&w=majority')

        app.listen(port,function () {
            console.log('Listening on port 8000... ')
        })
    }
    catch(error){
        console.log(error)
    }
}
connectToDb()
//add-res:post
//get-res-details:get
//update-res:patech
//delete-res:delete
//creat-new -user:post
//validate-user:post
app.post('/add-restaturant',async function(req,res){
    try{
        await Restaurant.create({
            "areaName":req.body.areaName,
           "avgRating" :req.body.avgRating,
           "costForTwo":req.body.costForTwo,
           "cuisines":req.body.cuisines,
           "imageLink":req.body.imageLink,
           "name":req.body.name
        })

        res.status(201).json({"Satus":"data set created"})
        
    }catch(errror){
        res.status(500).json({"status":"not created"})
        console.log(error)
    }
})

app.get('/get-res-details',async function (req,res) {
    try {
        const resDetails = await Restaurant.find()
        res.status(200).json(resDetails)
    } catch (error) {
        res.status(500).json({
            "satus":"no details found",
            "error":error
        })
    }
})


app.delete('/delete-restaurant/:id',async function(req,res) {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        if(restaurant){
            await restaurant.findByIdAndDelete(req.params.id)
            res.status(201).json({"Message":"Successfully Deleted"})
        }
        else{
            res.status(404).json({
                "status":"failure",
                "messge":"Give valid id"
            })
        }
    } catch (error) {
        res.status(500).json({
            "Status":"can not be Delete",
            "error":error
    })
    }
})

app.post('/add-user',async function (req,res) {
    try {
        await Users.create({
            "userName":req.body.userName,
            "email":req.body.emial,
            "password":req.body.password,
            "contact":req.body.contact
        })

        res.status(201).json({"Status":"user created"})
    } 
    catch (error) {
        res.status(500).json({"Status":"User Not created"})
    }
})

app.get('/valid-user',async function (req,res) {
    try {
        const user = await Users.findOne({
            "email":req.body.email,
            "password":req.body.password
        })
        if (user) {
            res.status(201).json({"Status":"user is avilable"})
        }
        else{
            res.status(401).json({"Status":"Invalid user"})
        }
    } 
    catch (error) {
        res.status(500).json({"Status":"No User"})
        console.log(error)
    }
})