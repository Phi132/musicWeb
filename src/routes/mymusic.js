const express = require('express');
const router = express.Router();
const musicController = require('../app/controller/MusicController')

router.get('/libary/song', musicController.libsong);
router.get('/', musicController.mymusic);


module.exports = router;