const ErrorResponse = require('../util/errorResponse');
const {
 HTTP_BAD_REQUEST,
 HTTP_NOT_FOUND,
 HTTP_INTERNAL_SERVER_ERROR
} = require('../util/constants')
const errorHandler = (err,req,res,next) => {
    let error = { ...err}
    error.message = err.message;
    
    // Mongoose bad object
    if(err.name == 'CastError') {
        const message = `resource not found with id ${err.value} `
        error = new ErrorResponse(message, HTTP_NOT_FOUND)
    }

    // duplicate key error
    if(err.code === 11000) {
        const message = "Duplicate key filed"
        error = new ErrorResponse(message, HTTP_BAD_REQUEST)
    }

    // Validation error

    if (err.name === 'ValidationError') {
        const message = "Please Enter all the required fields"
        error = new ErrorResponse(message, HTTP_BAD_REQUEST)
    }
    res.status(error.statusCode || HTTP_INTERNAL_SERVER_ERROR).json({
        success:false, 
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler