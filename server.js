const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require("./routes/api/items")

const app = express()

if(process.env.Node_ENV === 'production'){
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

app.use(bodyParser.json())

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log("mongo connect"))
    .catch((err) => console.log(err))


app.use('/api/items', items)

const port = process.env.Port || 5000;

app.listen(port, () => console.log(`server started on ${port}`))