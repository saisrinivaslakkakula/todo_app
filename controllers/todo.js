const todo = require('../models/todo')

const {
 HTTP_OK,
 HTTP_CREATED,
 HTTP_BAD_REQUEST
} = require ('../util/constants')

const {validateDate} = require('../util/validations')

const ErrorResponse = require('../util/errorResponse')

exports.getAllTodos = async (req,res,next) =>{
    try{
        const data = await todo.find()
        res.status(HTTP_OK).json({
            success: true,
            data: data
        })

    } catch(err) {
        next(err)
    }
}


exports.getTodoByDate = async (req,res,next) =>{
    try{
        const date = req.params.date
        if (!validateDate(date)){
            next(new ErrorResponse("Invalid Date", HTTP_BAD_REQUEST))
        }
        const data = await todo.find({'date':req.params.date})
        res.status(HTTP_OK).json({
            success: true,
            data: data
        })

    } catch(err) {
        next(err)
    }
}

exports.addTodo = async (req,res,next) => {
    try {
        const {date} = req.body
        if(!validateDate(date)){
            next( new ErrorResponse("Invalid date passed. Please try again", HTTP_BAD_REQUEST))
        }
        const data = await todo.create(req.body)

        res.status(HTTP_CREATED).json({
            success:true,
            length : data.length,
            data:data
        })

    } catch(err) {
        next(err)
    }
}

exports.updateTodoByID = async (req,res,next) => {

    try {

        if('date' in req.body) {
            const {date} = req.body
            if(!validateDate(date)){
                next( new ErrorResponse("Invalid date passed. Please try again", HTTP_BAD_REQUEST))
            }
        }
        
        const updatedData = await todo.findByIdAndUpdate(
            req.params.id,
            req.body, 
            {
                new: true,
                runValidations: true
            })
        
        res.status(HTTP_OK).json({
            success:true,
            data:updatedData
        })

    } catch(err) {
        next(err)
    }
}

exports.deleteTodoByID = async (req,res,next) => {
    try {
        const deletedData = await todo.findByIdAndDelete(
            req.params.id)
        
        res.status(HTTP_OK).json({
            success:true,
            data:deletedData
        })

    } catch(err) {
        next(err)
    }
}

exports.findToDoByID = async(req,res,next) => {
    const id = req.params.id
    try{
        const data = await todo.findById(id)
        res.status(200).json({
            succes: true,
            data
        })
    } catch(err) {
        next(err)
    }
}
