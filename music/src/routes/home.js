const express = require('express');
const router =express.Router();
const homeController = require('../app/controller/HomeController')

router.use('/', homeController.home);

module.exports = router;