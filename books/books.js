const express = require('express');
const app = express();
// const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const env = require('dotenv');
const bodyParser = require('body-parser');
const { ppid } = require('process');
// import 'dotenv/config'
app.use(bodyParser.json());

require("./Book")
const Book = mongoose.model("Book")
//CONNECT TO DATABASE
mongoose.connect("mongodb+srv://process.env.DBUSER:process.env.PASSWORD@cluster0.kmxki6p.mongodb.net/?retryWrites=true&w=majority", ()=> {
   console.log("Database is connected!");
});
// const client = new MongoClient(uri);

app.get('/', (req, res)=> {
   res.send("This is our main endpoint!")
});

app.post('/book', (req, res) => {
   var newBook = {
      title: req.body.title,
      author: req.body.author,
      numberPages: req.body.numberPages,
      category: req.body.category
   }
   var book = new Book(newBook)
   book.save().then(() => {
      console.log('New book created!')
   }).catch((err) => {
      if (err){
         throw err;
      }
   })
   res.send('A new book created successfully!')
   }
)
// Get all books
app.get('/books', (req, res) => {
   Book.find().then((books) => {
      res.json(books)
   }).catch(err => {
      if (err){
         throw err;
      }
   })
})

// get a book 

app.get('/book/:id', (req, res)=> {
   Book.findById(req.params.id).then((book) => {
      if (book){
         res.json(book)
      }else {
         res.sendStatus(404);
      }
   }).catch(err => {
      if(err){
         throw err;
      }
   })
})
//delete book
app.delete('/book/:id', (req, res)=> {
   Book.findOneAndRemove(req.params.id).then(() => {
      res.send("Book deleted successfully")
      
   }).catch(err => {
      if(err){
         throw err;
      }
   })
})



app.listen(4000, ()=> {
   console.log('Book service is up and running on port 4000')
});