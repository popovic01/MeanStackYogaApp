const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const coursesRouter = require("./routes/courses");
const productsRouter = require("./routes/products");
const workoutsRouter = require("./routes/workouts");

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
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    //dozvola za pristup resursima na serveru od strane drugih domena
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    //dozvovavanje dodatnih headera, metoda
    next();
});

app.use("/courses", coursesRouter);
app.use("/products", productsRouter);
app.use("/workouts", workoutsRouter);

module.exports = app;