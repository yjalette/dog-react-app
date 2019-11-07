const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const app = express();
var cors = require('cors');

app.use(cors());

if(process.env.Node_ENV === 'production'){
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

app.use(express.json())

const db = config.get('mongoURI');

mongoose
    .connect(process.env.db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        
    })
    .then(() => console.log("mongo is connecting"))
    .catch((err) => console.log("this is the errorrrrr:", err))


app.use('/api/users', require("./routes/api/users"))
app.use('/api/auth', require("./routes/api/auth"))
app.use('/api/emailEvents', require("./routes/api/emailEvents"))
app.use('/api/events', require("./routes/api/events"))

const port = process.env.PORT || 5000; 


app.listen(port, () => console.log(`server started on ${port}`))