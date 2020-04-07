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
 * Function return
 * @param type
 * @constructor
 */
const CSSEGISandDataUrl = (type: baseCSSEGISandDataTypes | string): string => {
  return baseCSSEGISandDataUrl.replace('{type}', type);
};

export { CSSEGISandDataUrl };



const filterByRegion = (data: object[][], region: string): object[] => {
  console.log(data);
  const filteredData: object[][] = data.filter((item: any) => {
    return item['Country/Region'] === region;
  });
  console.log(filteredData);
  return filteredData.length > 0 ? filteredData[0] : [];
};

export { filterByRegion };
