const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/authController');

router.post('/login', c.login);
router.post('/register', c.register); // useful for creating the first admin
router.get('/google', c.googleStart);
router.get('/google/callback', c.googleCallback);
router.get('/me', auth, c.me);

module.exports = router;
