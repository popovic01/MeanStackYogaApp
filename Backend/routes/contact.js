const express = require('express');

const router = express.Router();

const ContactController = require('../controllers/contact');

router.post("", ContactController.sendMail);

module.exports = router;