const multer = require('multer')

const fileError = (err,req,res,next)=>{  //send errors of fileFilter and limits as a response to the client
    if(err){
        if(req.errObj){
            return res.json({error:true,message:req.errObj})
        }else{
            return res.json({error:true,message:"allows upto 2mb files"})
        }
    }else{
        next()
    }
}

const Storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage:Storage,
    fileFilter: (req,file,cb)=>{
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf'){
            cb(null,true)
        }else{
            req.errObj = "accepts only png, jpg, jpng, pdf format files"
            cb(true,false)
        }  // accepts only png, jpg, jpng, pdf format files
    },
    limits: {
        fieldSize: 1024 * 1024 * 2  //allows upto 2mb files
    }
})

module.exports = {
    upload, fileError
}