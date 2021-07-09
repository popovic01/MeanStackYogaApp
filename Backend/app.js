const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const coursesRouter = require("./routes/courses");
const productsRouter = require("./routes/products");
const workoutsRouter = require("./routes/workouts");
const userRouter = require("./routes/user");

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
/*app.use("/images", express.static(path.join("D:\Faks\Semestar4\Veb\Projekat\Backend\images")));*/
app.use("/images", express.static(path.join("../Backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    //dozvola za pristup resursima na serveru od strane drugih domena
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
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
app.use("/user", userRouter);

module.exports = app;