import dotenv from 'dotenv-defaults';
import mongo from './mongo.js';
import express from 'express';
import cors from 'cors'
import routes from './routes/index.js';
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use('/',routes);

mongo.connect();

const server = app.listen(process.env.PORT || 4000, function(){
    console.log('on'+server.address().port);
});