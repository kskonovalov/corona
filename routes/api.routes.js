const { Router } = require('express');
const router = Router();
const config = require('config');
const axios = require('axios');
const csv = require('csvtojson');

const {
  CSSEGISandDataUrl,
  filterCSSEGISandData,
  prepareCSSEGISandData
} = require('../helpers');

router.get('/', async (req, res) => {
  await res.json({ data: "Hello :)" });
});

// /api/countries
router.post('/countries', async (req, res) => {
  const { type } = req.body;
  const apiUrl = CSSEGISandDataUrl(type);
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

// /api/provinces
router.post('/provinces', async (req, res) => {
  const { type, country } = req.body;
  const apiUrl = CSSEGISandDataUrl(type);
  try {
    const { data } = await axios.get(apiUrl);
    const jsonData = await csv({
      output: 'json'
    }).fromString(data);

    const currentProvinces = [];
    jsonData.map(item => {
      if (item['Country/Region'] === country) {
        currentProvinces.push(item['Province/State']);
      }
      return item;
    });

    // we don't need single 'province' named 'All'
    if (currentProvinces.length <= 1) {
      currentProvinces.length = 0;
    }

    return res.json({ data: currentProvinces });
  } catch (e) {
    return res
      .status(500)
      .json({ error: 'Something get wrong! Please try again' });
  }
});

// /api/graphdata
router.post('/graphdata', async (req, res) => {
  const { type, country, province, displayForDays } = req.body;
  const apiUrl = CSSEGISandDataUrl(type);
  try {
    const { data } = await axios.get(apiUrl);
    const jsonData = await csv({
      output: 'json'
    }).fromString(data);

    const filteredByCountry = filterCSSEGISandData(jsonData, country, province);
    const dataArray = prepareCSSEGISandData(filteredByCountry);

    return res.json({ data: dataArray.slice(Math.max(dataArray.length - displayForDays, 0)) });
  } catch (e) {
    return res
      .status(500)
      .json({ error: 'Something get wrong! Please try again' });
  }
});

module.exports = router;
