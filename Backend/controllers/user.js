const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Unet email je već registrovan"
          });
        });
    });
};

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    let isAdmin = false;
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "Korisnik sa unetom email adresom nije registrovan"
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Uneta lozinka nije tačna"
          });
        }
        if (fetchedUser.admin)
        {
          isAdmin = true;
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          isAdmin: isAdmin,
          id: fetchedUser._id
        });
      })
      .catch(err => {
        return res.status(401).json({
          message: "Greška"
        });
      });
};

exports.orderDetails = (req, res, next) => {
  if (req.body.currUser !== req.body.username)
    return res.status(401).json({
      message: "Uneta mejl adresa mora biti ista kao ona sa kojom ste ulogovani!"
    });
  User.findOneAndUpdate({ email: req.body.username },
    { phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode,
      name: req.body.name },
      { new: true }, //new znaci da ce rezutat funkcije biti updatovani user, a ne stari
      (err, res) => {
      if (err) {
        console.log('Greška pri dodavanju!');
      }
    });
};
