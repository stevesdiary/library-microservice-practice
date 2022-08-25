const mongoose = require('mongoose');

mongoose.model('Customer', {
   name: {
      type: String,
      require: true
   },
   age:{
      type: Number,
      require: true,
   },
   gender: {
      type: String,
      require: false
   },
   address: {
      type: String,
      required: true
   }
})