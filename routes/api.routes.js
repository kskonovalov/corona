const { Router } = require('express');
const router = Router();
const config = require('config');

router.get('/', async (req, res) => {
  console.log('works');
  res.json({ message: 'It works!' });
});

// /api/auth/register
router.post('/register', async (req, res) => {
  try {
    res.status(201).json({ message: 'User Created!' });
  } catch (e) {
    res.status(500).json({ message: 'Something get wrong! Please try again' });
  }
});

module.exports = router;
