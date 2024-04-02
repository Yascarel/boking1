const { getAll, create, remove, update } = require('../controllers/review.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const routerReview = express.Router();

routerReview.route('/reviews')
    .get(getAll)
    .post(verifyJWT, create)

routerReview.route('/reviews/:id')
    .delete(verifyJWT, remove)
    .put(verifyJWT, update)

module.exports = routerReview;