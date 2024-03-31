const express = require('express');
const router = express.Router();
const userRouter = require('./user.router')
const cityRouter = require('./city.router')
const hotelRouter = require('./hotel.router')

// colocar las rutas aquí
router.use(userRouter);
router.use(cityRouter);
router.use(hotelRouter);

module.exports = router;