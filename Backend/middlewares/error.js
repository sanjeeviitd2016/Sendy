const ErrorHandler = require('../utils/errorHandler')

const errorMiddleware=(err, req, res, next) => {
    err.statusCode= err.statusCode|| 500;
    err.message= err.message || "Internal server code"

    console.log(err)
    //mongoose duplicate key error-->
    if(err.code===11000){
        const message= `User Already exits because of Duplicate ${Object.keys(err.keyValue)} Entered`
        err= new ErrorHandler(400,message)
    }


    res.status(err.statusCode).json({
        success:false,
        message: err.message,
    })
    

};

module.exports= errorMiddleware;
