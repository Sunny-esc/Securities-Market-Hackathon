import express from 'express'; 
import bodyParser from 'body-parser'; // to parse incoming request bodies
import dotenv from 'dotenv';// to load environment variables from .env file
//import {app} from './app.js';
import * as db from './pgbouncer/index.js';

dotenv.config();


const app =express();
const port =process.env.PORT ;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', (request, response) => {
  response.json({ status: 'The server is running ✅✅' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});