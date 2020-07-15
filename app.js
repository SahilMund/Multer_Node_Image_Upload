const express = require("express");
const { mongoURI } = require('./config/key')
const mongoose = require('mongoose');

//init app
const app = express();


// setting Public folder as static
app.use(express.static('./public'));

//mongoose connection
mongoose
    .connect(mongoURI, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log("Mondodb Connected...."))
    .catch(err => console.error(err));




//use mode //model register 

require('./models/user')

// Use routes // route register

app.use('/', require('./router/imgRoute'))

//EJS
app.set('view engine', 'ejs');




app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.PORT || 4000;

app.listen(port,
    () => console.log(`Listening on port ${port}...`));