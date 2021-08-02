const express = require('express');
const path = require('path');
//const bcrypt = require('bcryptjs');
const hbs = require('hbs');
const mongoose = require('mongoose')
const app = express();

mongoose.connect("mongodb://localhost:27017/mySite",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=> {
    console.log(`connection successful`);
}).catch((e)=> {
    console.log(`no connection`);
})

//const { dirname } = require('node:path');

const userSchema = new mongoose.Schema({
    Email:{
        type: String,
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    Phoneno:{
        type: String,
        required: true
    },
    Details:{
        type:String,
        required:true
    }
})

const Registerr = new mongoose.model("Registerr",userSchema);

module.exports = Registerr;

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const static_path = path.join(__dirname, "CSS")//Set dirname to public
app.use(express.static(static_path))

const htmlfiles = path.join(__dirname,"hbs/htmlFiles");

app.set("view engine","hbs");
app.set("views",htmlfiles);

hbs.registerPartials(htmlfiles);

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/services", (req, res) => {
    res.render("services")
})

app.get("/contact", (req, res) => {
    res.render("contact")
})

app.post("/contact",(req,res)=>{
    var myDataa = new Registerr(req,res)
    myDataa.save().then(()=>{
        res.send("Details Submitted Successfully")
    }).catch(()=>{
        res.status(404).render("Details not Submitted")
    })
   // const name = req.body.Name
    //const email = req.body.Email;
    //const phoneno = req.body.Phoneno;
    //const details = req.body.Details;
    res.status(201).render("index");
})

app.listen(port, (req, res) => {
    console.log(`Server running at ${port}`);
})
