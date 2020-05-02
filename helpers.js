const config = require('config');
const baseCSSEGISandDataUrl = config.get('baseCSSEGISandDataUrl');

/**
 * Function returns url to get data from api https://github.com/CSSEGISandData/COVID-19
 * see config.ts / baseCSSEGISandDataUrl
 *
 * @param type
 * @constructor
 */
const CSSEGISandDataUrl = type => {
  return baseCSSEGISandDataUrl.replace('{type}', type);
};

module.exports.CSSEGISandDataUrl = CSSEGISandDataUrl;

// const getDataFromApi = (apiUrl) => {
//   const apiCountries = [];
//   try {
//     const { data } = await axios.get(apiUrl);
//     const jsonData = await csv({
//       output: 'json'
//     }).fromString(data);
//     jsonData.map(item => {
//       if (!apiCountries.includes(item['Country/Region'])) {
//         apiCountries.push(item['Country/Region']);
//       }
//       return item;
//     });
//     res.json({ data: apiCountries });
//   } catch (e) {
//     res.status(500).json({ error: 'Something get wrong! Please try again' });
//   }
// }

/**
 *
 * @param data
 * @param country
 * @param province
 */
const filterCSSEGISandData = (data, country, province) => {
  const filteredData = data.filter(item => {
    return (
      item['Country/Region'] === country && item['Province/State'] === province
    );
  });
  return filteredData.length > 0 ? filteredData[0] : [];
};

module.exports.filterCSSEGISandData = filterCSSEGISandData;

const prepareCSSEGISandData = (data) => {
  const preparedData = Object.assign({ ...data }); // do not mutate data

  // leave only 'day => count' values in CSSEGISandData array
  const keysToDelete = [
    'Province/State',
    'Country/Region',
    'Lat',
    'Long'
  ];
  keysToDelete.forEach((item) => {
    if (item in preparedData) {
      delete preparedData[item];
    }
  });
  const formattedPreparedData = Object.keys(preparedData).map((date) => {
    return {
      date: formatDate(date),
      count: +preparedData[date]
    };
  });
  // last 30 days
  return formattedPreparedData.slice(Math.max(formattedPreparedData.length - 30, 0));
};

module.exports.prepareCSSEGISandData = prepareCSSEGISandData;


/**
 *
 * @param date
 */
const formatDate = (date) => {
  const dayDate = new Date(date);
  const options = { weekday: 'short', month: 'long', day: 'numeric' };
  return dayDate.toLocaleDateString('en-US', options);
};
