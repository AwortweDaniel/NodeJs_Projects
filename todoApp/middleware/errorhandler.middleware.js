

const errorHandler = async (error, req, res, next)=>{

    //check if statusCode = 200, change it to 500, else maintain the statusCode
    const statusCode = res.statusCode===200?500:res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: error.message,
        //checking if stack is in production, return null else return the stack
        stack : process.env.NODE_ENV==="PRODUCTION"?null :error.stack
    })
}


module.exports = {errorHandler}