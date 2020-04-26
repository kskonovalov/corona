const config = require("config");
const baseCSSEGISandDataUrl = config.get("baseCSSEGISandDataUrl");

/**
 * Function returns url to get data from api https://github.com/CSSEGISandData/COVID-19
 * see config.ts / baseCSSEGISandDataUrl
 *
 * @param type
 * @constructor
 */
const CSSEGISandDataUrl = (type) => {
  return baseCSSEGISandDataUrl.replace('{type}', type);
};

module.exports = CSSEGISandDataUrl;
