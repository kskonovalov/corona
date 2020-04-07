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
  [key: string]: string;
}

/**
 *
 * @param data
 * @param country
 */
const filterCSSEGISandDataByCountry = (
  data: object[][],
  country: string
): ICSSEGISandData => {
  const filteredData: any = data.filter((item: any) => {
    return item['Country/Region'] === country;
  });
  return filteredData.length > 0 ? filteredData[0] : [];
};

export { filterCSSEGISandDataByCountry };

/**
 * Function to prepare CSSEGISandData data
 * @param data
 */
const prepareCSSEGISandData = (data: ICSSEGISandData) => {
  // leave only 'day => infected' values in CSSEGISandData array
  const keysToDelete: string[] = [
    'Province/State',
    'Country/Region',
    'Lat',
    'Long',
  ];
  keysToDelete.forEach((item: string) => {
    if (item in data) {
      delete data[item];
    }
  });

  // change infected to number
  return Object.keys(data)
    .map((date: string): {date: string, infected: string | number} => {
      return {
        date,
        infected: +data[date]
      };
    });
};

export { prepareCSSEGISandData };
