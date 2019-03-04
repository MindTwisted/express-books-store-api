const express = require('express');
const router = express.Router();
const authController = require('@controllers/authController');
const errorHandleMiddleware = require('@middlewares/errorHandleMiddleware');

router.post('/auth/register', authController.register);

router.use(errorHandleMiddleware);

module.exports = router;