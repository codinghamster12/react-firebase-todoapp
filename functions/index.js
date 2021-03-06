const functions = require('firebase-functions');
const app = require('express')();

var cors= require('cors');
app.use(cors());

const {
    getAllTodos, 
    postOneTodo,
    deleteTodo,
 
} = require('./APIs/todos')



app.post('/todo', postOneTodo);
app.get('/todos', getAllTodos);
app.delete('/todo/:todoId', deleteTodo);
exports.api = functions.https.onRequest(app);