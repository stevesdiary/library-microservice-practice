const mongoose = require('mongoose');

mongoose.model("Book", {
   title: {
      type: String,
      require: true
   },
   author: {
      type: String,
      require: true
   },
   numberPages: {
      type: Number,
      require: true
   },
   category: {
      type: String,
      require: false
   }
});
