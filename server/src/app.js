import express from 'express';
import bodyParser from 'body-parser'; // to parse incoming request bodies
import dotenv from 'dotenv'; // to load environment variables from .env file
import * as db from './pgbouncer/index.js';
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const app = express();




export default app;