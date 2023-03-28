const express = require('express')
const multer = require('multer')
const {upload, fileError }= require('./middlewares/multer')
const app = express()
const port = 5000

app.use('/uploads',express.static('uploads')) //this allows users to download the images
app.use(express.json())

let url = `http://localhost:5000/uploads/`
const Users = []  //assuming this as a database

app.post('/uploads',upload.single('profile_pic'),fileError, (req,res)=>{
    console.log(req.file)
    const file = req.file.originalname
    const obj = {
        id: `${Math.random()}` ,
        name: req.body.name,
        email: req.body.email,
        profile_pic: url+file
    }
    Users.push(obj)
    
    return res.json({message:true,obj})
})

app.post('/deleteuser/:id',(req,res)=>{
    const newUser = Users.filter((each)=>{
        return each.id !== req.params.id
    })
    return res.json({message:"successfully deleted"})
})

app.get('/getusers',(req,res)=>{
    return res.json({message:"Success",Users})
})

app.post('/updateprofile/:id',upload.single('profile_pic'),fileError,(req,res)=>{
    
    const param = req.params.id
    console.log(param)
    const file = req.file.originalname
    const exists = Users.find((each)=>{
        return each.id === param
    })
    if(exists){
        exists.profile_pic = url+file
        return res.json({message:"Success",exists})
    }else{
        return res.json({message:"User not found"})
    }
})



app.listen(port,()=>{
    console.log(`Listening on PORT ${port}`)
})