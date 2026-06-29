const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/leadController');

// Public lead capture from contact form
router.post('/', c.create);

// Remaining lead routes require authentication
router.use(auth);
router.get('/', c.list);
router.get('/:id', c.getOne);
router.put('/:id', c.update);
router.delete('/:id', c.remove);
router.patch('/:id/status', c.updateStatus);
router.post('/:id/notes', c.addNote);

module.exports = router;
