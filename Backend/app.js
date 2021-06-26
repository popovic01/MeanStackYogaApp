const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("./models/user");
const Course = require("./models/course");

const app = express();

const dbUPI = "mongodb+srv://milica:test@cluster0.beton.mongodb.net/db?retryWrites=true&w=majority";
mongoose.connect(dbUPI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log(err);
  }); 
//povezivanje sa bazom

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    //dozvola za pristup resursima na serveru od strane drugih domena
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    //dozvovavanje dodatnih headera, metoda
    next();
});

app.post("/api/courses", (req, res, next) => {
  const course = new Course({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });
  course.save();
  res.status(201).json({
    message: 'Course added successfully'
  });
});

app.get("/api/courses", (req, res, next) => {
    Course.find().then(documents => {
      res.status(200).json({
        message: 'Courses fetched successfully!',
        courses: documents
      });
    });
});

/* app.get('/', function (req, res) {
    res.send('Milica');
  });

app.get('/add-user', (req, res) => {
    const user = new User({
      email: 'naketeri@gmail.com',
      password: '1101',
      username: 'naketeri',
      fullName: 'Naketeri Popovic',
    });

    user.save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
}); */

module.exports = app;