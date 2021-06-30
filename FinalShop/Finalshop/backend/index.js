import express from 'express';
import mongo from './mongo';
import routes from '.';

const app = express();
const port = process.env.PORT || 4000;


app.get('/',(req,res)=>{
    res.send('Welcome to immediate food web!');
})

app.listen(port, ()=>{
    console.log(`IF Web App is listening on port ${port}.`);
})