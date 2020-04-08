import { baseCSSEGISandDataUrl, baseCSSEGISandDataTypes } from './config';

/**
 * Function generates random color
 */
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export { getRandomColor };

/**
 *
 * @param date
 */
const formatDate = (date: string | Date) => {
  const dayDate = new Date(date);
  const options = { weekday: 'short', month: 'long', day: 'numeric' };
  return dayDate.toLocaleDateString('en-US', options);
};


/**
 * Function returns url to get data from api https://github.com/CSSEGISandData/COVID-19
 * see config.ts / baseCSSEGISandDataUrl
 *
 * @param type
 * @constructor
 */
const CSSEGISandDataUrl = (type: baseCSSEGISandDataTypes | string): string => {
  return baseCSSEGISandDataUrl.replace('{type}', type);
};

export { CSSEGISandDataUrl };

export interface ICSSEGISandData {
  [key: string]: string | number;
}

/**
 *
 * @param data
 * @param country
 * @param province
 */
const filterCSSEGISandData = (
  data: object[][],
  country: string,
  province: string
): ICSSEGISandData => {
  const filteredData: any = data.filter((item: any) => {
    if(province.length > 0) {
      return item['Country/Region'] === country && item['Province/State'] === province;
    }
    return item['Country/Region'] === country;
  });
  console.log(filteredData);
  return filteredData.length > 0 ? filteredData[0] : [];
};

export { filterCSSEGISandData };

/**
 * Function to prepare CSSEGISandData data
 * @param data
 */
const prepareCSSEGISandData = (data: ICSSEGISandData) => {
  const preparedData = data; // do not mutate data
  // leave only 'day => count' values in CSSEGISandData array
  const keysToDelete: string[] = [
    'Province/State',
    'Country/Region',
    'Lat',
    'Long'
  ];
  keysToDelete.forEach((item: string) => {
    if (item in preparedData) {
      delete preparedData[item];
    }
  });
  return Object.keys(preparedData).map((date: string): {
    date: string;
    count: string | number;
  } => {
    return {
      date: formatDate(date),
      count: +preparedData[date]
    };
  });
};

export { prepareCSSEGISandData };
