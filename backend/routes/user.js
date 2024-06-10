const express = require('express');
const router = express.Router();
const { register } = require('../controllers/registerController');
const { loginUser } = require('../controllers/loginController');
const { updateUser } = require('../controllers/updateController');

router.post('/register', register);
router.post('/login', loginUser);
router.put('/updateUser', updateUser);

module.exports = router;