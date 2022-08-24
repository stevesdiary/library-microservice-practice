const express = require('express');
const app = express();

app.get('/', (req, res)=> {
   res.send("This is our main endpoint!")
});

app.listen(4000, ()=> {
   console.log('Book service is up and running on port 4000')
});