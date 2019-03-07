'use strict';

const express = require('express');
const router = express.Router();
const authController = require('@controllers/authController');
const authorController = require('@controllers/authorController');
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

router.use(errorHandleMiddleware);

module.exports = router;