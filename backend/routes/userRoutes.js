const express = require('express');
const {
  regiserUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', regiserUser);
router.post('/login', loginUser);
router.get('/me', auth, getMe);

module.exports = router;
