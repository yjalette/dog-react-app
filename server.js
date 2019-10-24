const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const app = express()

if(process.env.Node_ENV === 'production'){
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

app.use(express.json())

const db = config.get('mongoURI');

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("mongo connect"))
    .catch((err) => console.log(err))


app.use('/api/items', require("./routes/api/items"))
app.use('/api/users', require("./routes/api/users"))
app.use('/api/auth', require("./routes/api/auth"))

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`server started on ${port}`))