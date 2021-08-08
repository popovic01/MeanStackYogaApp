const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const stripe = require('stripe')('sk_test_51JI9R1AUVPYGsQW32tXdzdSrehmQy7qBKLVPMOIys0rVQpJ6qjUkMkFC6j3Eq5GI1pTgDZ4N5ZxAW1E2kj4R0z2t00REzEoOf1');

const coursesRouter = require("./routes/courses");
const productsRouter = require("./routes/products");
const workoutsRouter = require("./routes/workouts");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/categories");
const cartRouter = require("./routes/cart");

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

app.post('/payment', (req,res) => {
  var charge = stripe.charges.create({
    amount: req.body.price * 100,
    currency: 'RSD',
    source: req.body.token
  }, (err, charge)=> {
    if (err) {
      throw err;
    }
    res.json({
      success: true,
      message: "Payment done!"
    })
  });
})

app.use("/categories", categoryRouter);
app.use("/courses", coursesRouter);
app.use("/products", productsRouter);
app.use("/workouts", workoutsRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);

module.exports = app;