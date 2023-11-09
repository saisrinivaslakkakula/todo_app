const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, closeConnection} = require('../server');
const todo = require('../models/todo')
const expect = chai.expect;

const {
    HTTP_OK,
    HTTP_CREATED,
    HTTP_BAD_REQUEST,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND

} = require("../util/constants")

chai.use(chaiHttp);

const {
 testTodo,
 testToDoWithEmptyNotesField,
 testTodoWithMissingDateField,
 API_END_POINT
} = require('./testutil/constants')

before(() => {
});

after(async() => {
  await todo.deleteMany();
  closeConnection();
});

describe('add ToDos API', ()=>{
    it('should add todo', async() => {
        const res = await chai.request(app)
        .post(`${API_END_POINT}/todo`)
        .send(testTodo);
        expect(res).to.have.status(HTTP_CREATED);
        expect(res.body.data.date).to.be.equal(testTodo.date);
      });
    
    it('should throw an error when date field is missing', async() => {
    const res = await chai.request(app)
    .post(`${API_END_POINT}/todo`)
    .send(testTodoWithMissingDateField);
    expect(res).to.have.status(HTTP_BAD_REQUEST);
    //console.log(res.body)
    expect(res.body.error).to.be.equal("Invalid date passed. Please try again");
    });

    it('should add Todo even though notes field is missing', async() => {
        const res = await chai.request(app)
        .post(`${API_END_POINT}/todo`)
        .send(testToDoWithEmptyNotesField);
        expect(res).to.have.status(HTTP_CREATED);
        expect(res.body.data.date).to.be.equal(testToDoWithEmptyNotesField.date);
        });
})

describe('get TODOs API', () => {
  it('should retrieve all todos', async() => {
    const res = await chai.request(app).get(`${API_END_POINT}/todo`);
    expect(res).to.have.status(HTTP_OK);
    expect(res.body.data).to.be.an('array');
  });

  it('should retrieve todos by date', async() => {
    const res = await chai.request(app).get(`${API_END_POINT}/todo/`+testTodo.date);
    expect(res).to.have.status(HTTP_OK);
    expect(res.body.data.length).to.be.equal(1);
  });

  it('should retrieve empty response when invalid date is passed', async() => {
    const res = await chai.request(app).get(`${API_END_POINT}/todo/undefined`);
    expect(res).to.have.status(400);
    expect(res.body.error).to.be.equal("Invalid Date");
  });
});


describe('Test Update and Delete TODO API', ()=>{
    let id;
    before(async()=>{
        const toDoByDate = await chai.request(app)
        .get(`${API_END_POINT}/todo/`+testTodo.date)
        id = toDoByDate.body.data[0]._id;
    })
    it('should update the todo added already', async()=>{
        const res = await chai.request(app)
            .put(`${API_END_POINT}/todo/`+id)
            .send({date:"2023-12-31"})
        expect(res.status).to.be.equal(HTTP_OK)
        expect(res.body.data.date).to.be.equal("2023-12-31")
    })

    it('should throw an error when invalid todo id is passed', async()=>{
        const res = await chai.request(app)
            .put(`${API_END_POINT}/todo/`+'12123')
            .send({date:"2023-12-31"})
        expect(res.status).to.be.equal(HTTP_NOT_FOUND)
        //console.log(res.body)
        //expect(res.body.error).to.be.equal("resource not found with id 12123")
    })

    it('should delete todo when id is passed', async()=>{
        const res = await chai.request(app)
            .delete(`${API_END_POINT}/todo/`+id)
        expect(res.status).to.be.equal(HTTP_OK)

        const findByID = await chai.request(app)
            .get(`${API_END_POINT}/todo/id/`+id)
        expect(findByID.body.data).to.be.equal(null)
    })

    it('should throw error when invalid id is passed to delete todo', async()=>{
        const res = await chai.request(app)
            .delete(`${API_END_POINT}/todo/undefined`)
        expect(res.status).to.be.equal(HTTP_NOT_FOUND)
        //expect(res.body.error).to.be.equal("resource not found with id undefined")
    })
})
