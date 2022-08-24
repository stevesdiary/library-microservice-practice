const express = require('express');
const app = express();
// const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const env = require('dotenv');
const bodyParser = require('body-parser');
// import 'dotenv/config'

//CONNECT TO DATABASE
mongoose.connect("mongodb+srv://microservice:abc789@cluster0.kmxki6p.mongodb.net/?retryWrites=true&w=majority", ()=> {
   console.log("Database is connected!");
});
// const client = new MongoClient(uri);

app.get('/', (req, res)=> {
   res.send("This is our main endpoint!")
});

app.post('/book', (req, res) => {
   res.send('Testing our book route')
})
app.listen(4000, ()=> {
   console.log('Book service is up and running on port 4000')
});