const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const axios = require('axios');
const { response } = require('express');
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://process.env.DBUSER:process.env.PASSWORD@cluster0.kmxki6p.mongodb.net/?retryWrites=true&w=majority", () => {
   console.log("Database is connected!");
});

require('./Order.js')
const Order = mongoose.model('Order')

app.post('/order', (req, res) => {

   var newOrder = {
      CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
      BookID : mongoose.Types.ObjectId(req.body.BookID),
      initialDate: req.body.initialDate,
      deliveryDate: req.body.deliveryDate
   }

   var order = new Order(newOrder)

   order.save().then(() => {
      res.send('Order created successfully!')
      console.log("Order created successfully!")
   }).catch((err)=>{
      if(err){
         throw err
      }
   })
})
app.get('/orders', (req, res) => {
   Order.find({}).then((books) => {
      res.json(books)
   }).catch(err => {
      if (err){
         throw err;
      }
   })
})
app.get('/order/:id', (req, res) => {
   Order.findById(req.params.id).then(order => {
      console.log(order)
   });
   Order.find(req.params.id).then((order) => {
      console.log(order)
         if (order){
            axios.get("http://localhost:4444/customer/" + order.CustomerID).then((response)=>{
               console.log(response)

            var orderObject = {customerName: response.data.name, bookTitle: ''}
            axios.get("http://localhost:4000/book/" + order.BookID).then((response)=>{

               orderObject.bookTitle = response.data.title
               res.json(orderObject)
            })

            })
         }else{
            res.send("Invalid order")
         }
   })
}) 
app.listen(5555, () => {
   console.log('Order service running on port 5555')
})