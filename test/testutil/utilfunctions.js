const axios = require('axios')
const {API_URL} = require('./constants')

const addTestTodo = async()=>{
    payload = {
        text: "test todo",
        date: "2023-11-14",
        time: "3 PM",
        notes: "test notes"
    }
    const response = await axios.post(API_URL +'/todo', payload)

    return response.data;
}

const removeTestTodo = async(id) => {
    const removeTestDataResponse = await axios.delete(API_URL+"/todo/"+id)
}
module.exports = {
    addTestTodo,
    removeTestTodo
}
