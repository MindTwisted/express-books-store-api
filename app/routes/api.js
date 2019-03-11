'use strict';

const express = require('express');
const router = express.Router();
const authController = require('@controllers/authController');
const authorController = require('@controllers/authorController');
const genreController = require('@controllers/genreController');
const bookController = require('@controllers/bookController');
const errorHandleMiddleware = require('@middlewares/errorHandleMiddleware');
const authenticationMiddleware = require('@middlewares/authenticationMiddleware');
const isLoggedInMiddleware = require('@middlewares/isLoggedInMiddleware');
const isAdminMiddleware = require('@middlewares/isAdminMiddleware');

router.use(authenticationMiddleware);

router.get('/auth', [isLoggedInMiddleware], authController.current);
router.post('/auth', authController.register);
router.put('/auth', authController.login);

router.get('/authors', authorController.index);
router.get('/authors/:id', authorController.show);
router.post('/authors', [isLoggedInMiddleware, isAdminMiddleware], authorController.store);
router.put('/authors/:id', [isLoggedInMiddleware, isAdminMiddleware], authorController.update);
router.delete('/authors/:id', [isLoggedInMiddleware, isAdminMiddleware], authorController.destroy);

router.get('/genres', genreController.index);
router.get('/genres/:id', genreController.show);
router.post('/genres', [isLoggedInMiddleware, isAdminMiddleware], genreController.store);
router.put('/genres/:id', [isLoggedInMiddleware, isAdminMiddleware], genreController.update);
router.delete('/genres/:id', [isLoggedInMiddleware, isAdminMiddleware], genreController.destroy);

router.get('/books', bookController.index);

router.use(errorHandleMiddleware);

module.exports = router;