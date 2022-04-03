const jwt= require('jsonwebtoken')
const errorHandler= require('../utils/errorHandler')
const users= require('../models/userModel')
const isAuthentication= async(req,res,next)=>{

    const {token}= req.cookies;
    if(!token){
        return next(new errorHandler(400,"Please Login to access"))
    }
    const decodedData=  jwt.verify(token,process.env.PRIVATE_KEY)

    const id= decodedData.id;

    req.user= await users.findById({_id:id})
    next()




}

module.exports= isAuthentication