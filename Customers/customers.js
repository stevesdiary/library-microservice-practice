const express = require('express');
const  app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// connect to database 
mongoose.connect("mongodb+srv://process.env.DBUSER:process.env.PASSWORD@cluster0.kmxki6p.mongodb.net/?retryWrites=true&w=majority", () => {
   console.log('Customer database connected!')
})
// Load model
require('./Customer')
const Customer = mongoose.model("Customer") 

app.post('/customer', (req, res) => {
   var newCustomer = {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      address: req.body.address
   }
   var customer = new Customer(newCustomer)
   customer.save().then(() =>{
      res.send('New customer created!')
   }).catch((err) => {
      if (err){
         throw err
      }
   })
})

app.get('/customer', (req, res) =>{
   Customer.find().then((customers) =>{
      res.json(customers)
   }).catch((err)=>{
      if (err){
         throw err
      }
   })
})
app.get('/customer/:id', (req, res)=>{
   Customer.findById(req.params.id).then((customer) => {
      if (customer){
         res.json(customer)
         console.log("Found one!", customer)
      }else {
         res.sendStatus(404);
      }
   }).catch((err) => {
      if(err){
         throw err;
      }
   })
})

app.delete('/customer/:id', (req, res) => {
   Customer.findByIdAndDelete(req.params.id).then(() => {
      res.send('Customer deleted successfully')
   }).catch((err)=> {
      if(err){
         throw err;
      }
   })
})
app.listen(4444, () => {
   console.log('Customers service running on port 4444')
})
