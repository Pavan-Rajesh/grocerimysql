const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb://127.0.0.1:27017/appdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("connected");
}).catch(err => {
    console.log(err);
})
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const grocery = require('./models/products.js');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: false
}))




app.use(bodyParser.json())
app.use(express.static("public"));

const shop = require("./routes/routes");




app.use("/", shop);



app.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log("connected....")
});