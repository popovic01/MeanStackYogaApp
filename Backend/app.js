const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

const dbUPI = "mongodb+srv://milica:test@cluster0.beton.mongodb.net/db?retryWrites=true&w=majority";
mongoose.connect(dbUPI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('/', function (req, res) {
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
});

module.exports = app;