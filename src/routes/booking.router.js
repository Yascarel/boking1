const { getAll, create, remove, update } = require('../controllers/booking.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const routerBooking = express.Router();

routerBooking.route('/bookings')
    .get( verifyJWT, getAll)
    .post( verifyJWT, create);

routerBooking.route('/bookings/:id')
    .delete( verifyJWT, remove)
    .put( verifyJWT, update);

module.exports = routerBooking;