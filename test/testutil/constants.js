const API_END_POINT = "/api/v1"
const testTodo = {
    date: "2023-11-12",
    time: "3PM",
    text: "test text",
    notes: "test notes"
}

const testTodoWithMissingDateField = {
    time: "3PM",
    text: "test text",
    notes: "test notes"
}

const testToDoWithEmptyNotesField = {
    date: "2023-11-13",
    time: "3PM",
    text: "test text",
}
module.exports = {API_END_POINT,testTodo,testToDoWithEmptyNotesField,testTodoWithMissingDateField}