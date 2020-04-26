const { Router } = require('express');
const router = Router();
const config = require('config');
const axios = require('axios');
const csv = require('csvtojson');

const CSSEGISandDataUrl = require('../helpers');

router.get('/', async (req, res) => {

  await res.json({ apiCountries: apiCountries });
});

// /api/countries
router.get('/countries', async (req, res) => {
  const apiUrl = CSSEGISandDataUrl('confirmed');
  const apiCountries = [];
  try {
    const { data } = await axios.get(apiUrl);
    const jsonData = await csv({
      output: 'json'
    }).fromString(data);
    jsonData.map(item => {
      if (!apiCountries.includes(item['Country/Region'])) {
        apiCountries.push(item['Country/Region']);
      }
      return item;
    });
    res.json({ data: apiCountries });
  } catch (e) {
    res.status(500).json({ error: 'Something get wrong! Please try again' });
  }
});

// /api/auth/register
// router.post('/', async (req, res) => {
//   console.log(req);
//   try {
//     res.status(201).json({ message: 'User Created!' });
//   } catch (e) {
//     res.status(500).json({ message: 'Something get wrong! Please try again' });
//   }
// });

module.exports = router;
