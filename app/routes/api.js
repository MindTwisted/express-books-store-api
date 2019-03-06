const express = require('express');
const router = express.Router();
const authController = require('@controllers/authController');
const errorHandleMiddleware = require('@middlewares/errorHandleMiddleware');
const authenticationMiddleware = require('@middlewares/authenticationMiddleware');
const isLoggedInMiddleware = require('@middlewares/isLoggedInMiddleware');

router.use(authenticationMiddleware);

router.get('/auth', [isLoggedInMiddleware], authController.current);
router.post('/auth', authController.register);
router.put('/auth', authController.login);

router.use(errorHandleMiddleware);

module.exports = router;