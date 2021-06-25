const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("./models/user");

const app = express();

/* const dbUPI = "mongodb+srv://milica:test@cluster0.beton.mongodb.net/db?retryWrites=true&w=majority";
mongoose.connect(dbUPI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err)); */

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
  const course = req.body;
  console.log(course);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.use("/api/courses", (req, res, next) => {
  const courses = [
      {
        id: "fadf12421l",
        name: "Course 1",
        description: "This is coming from the server",
        price: 500
      },
      {
        id: "fsgsdfgfd34",
        name: "Course 2",
        description: "This is coming from the server",
        price: 1500
      }
    ];
    res.status(200).json({
      message: 'Courses fetched successfully!',
      courses: courses
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