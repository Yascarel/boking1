const { getAll, create, remove,  } = require('../controllers/image.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')
const upload = require('../utils/multer');

const routerImage = express.Router();

routerImage.route('/images')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single('image'),  create);

    routerImage.route('/images/:id')
    .delete(verifyJWT, remove)

module.exports = routerImage;