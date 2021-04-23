require('dotenv').config();

const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const ejs = require("ejs");

var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD
  }
});

const mongoose = require("mongoose");

var emailOFSender = "";

const md5 = require('md5');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://admin-rv:Satyam@123@cluster0-drcku.mongodb.net/userDB", {useNewUrlParser:true, useUnifiedTopology:true});



const contractorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});



const listSchema = new mongoose.Schema({
  work : String,
});

const proposolSchema = new mongoose.Schema({
  pl:String,
  price:String,
  mobNo: String
});

const proposol = mongoose.model("proposol", proposolSchema);

const list = mongoose.model("list", listSchema);

const list1 = new list({
  work:"  An electrical contractor is a business person or firm that performs specialized construction work related to the design, installation, and maintenance of electrical systems.An electrical contractor is different from an electrician; an electrician is an individual tradesman and an electrical contractor is a business person or company that employs electricians. Both usually hold licenses and insurances to properly and safely operate a business, protecting the employees and home owners/business owners from insurance liabilities. These requirements vary from state to state. Electricians may work for an electrical contractor, or directly for individuals or companies.",
  price : 11500
});
const list2 = new list({
  work:"  An electrical contractor is a business person or firm that performs specialized construction work related to the design, installation, and maintenance of electrical systems.An electrical contractor is different from an electrician; an electrician is an individual tradesman and an electrical contractor is a business person or company that employs electricians. Both usually hold licenses and insurances to properly and safely operate a business, protecting the employees and home owners/business owners from insurance liabilities. These requirements vary from state to state. Electricians may work for an electrical contractor, or directly for individuals or companies.",
  price : 11500
});
const list3 = new list({
  work:"  An electrical contractor is a business person or firm that performs specialized construction work related to the design, installation, and maintenance of electrical systems.An electrical contractor is different from an electrician; an electrician is an individual tradesman and an electrical contractor is a business person or company that employs electricians. Both usually hold licenses and insurances to properly and safely operate a business, protecting the employees and home owners/business owners from insurance liabilities. These requirements vary from state to state. Electricians may work for an electrical contractor, or directly for individuals or companies.",
  price : 11500
});

const defaultDB = [list1, list2, list3]


const contractor = mongoose.model("contractor", contractorSchema);

app.get("/", function(req, res){
  res.render("home");
});

app.get("/signUp", function(req, res){
  res.render("signUp");
});

app.get("/Login", function(req, res){
  res.render("Login");
});

app.get("/AdminLogin", function(req, res){
  res.render("AdminLogin");
});

app.get("/estimate", function(req, res){
  res.render("estimate");
});

app.post("/AdminLogin", function(req, res){
  if(req.body.name === "Satyam Vasant Mane" && req.body.email === "rvsatyam2000@gmail.com" && md5(req.body.password) === md5("123")){
    res.render("addWork");
  }
  else{
    res.redirect("/");
  }
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/addWork", function(req, res){
  list.find({}, function(err, found){
    if(!err){
      if(found){
        res.render("work", {items: found});
      }
      else{
        res.redirect("/");
      }
    }
  });
});

app.post("/addWork", function(req, res){
  const list4 = new list({
    work: req.body.work,
    price:req.body.price
  });
  list4.save();
  res.redirect("/addwork");
});

app.post("/Login", function(req, res){
  contractor.findOne({name:req.body.name, email: req.body.email, password: md5(req.body.password)}, function(err, found){
    if(found){
      res.redirect("/addWork");
    }
    else if(!found){
      res.redirect("/Login");
    }
    else{
      res.render(err);
    }

  });
});



app.post("/signUp", function(req, res){
  const name = req.body.name;
  const email =req.body.email;
  const pass = req.body.password;
  if(name === "" || email === "" || pass === ""|| name === null || email === null || pass === null){
    res.render("signUp");
  }
  const password = md5(pass);
  const ctr = new contractor({
    name:name,
    email : email,
    password : password
  });
  ctr.save(function(err){
    if(!err){
      res.redirect("/addWork");
    }
    else{
      res.send(err);
    }
  });

});



app.post("/proposol", function(req, res){
  const p = new proposol({
    pl: req.body.pl,
    price: req.body.price,
    mobNo: req.body.mobNo
  });

  var rates = req.body.pl;
  var price = req.body.price;
  var mobNo= req.body.mobNo;


var mailOptions = {
  from: 'satyammane6@gmail.com',
  to: 'rvsatyam2000@gmail.com',
  subject: 'Sending Email using Node.js',
  text: "rates = " + rates + "\nprice = "+ price + "\nMobile No= " + mobNo
};

transport.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

  p.save(function(err){
    if(!err){
      res.render("sentPro");
  }
    else{
      res.send(err);
    }
  });
});


app.get("/logout", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is started at port 3000");
});
