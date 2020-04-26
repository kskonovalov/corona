// https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series
const baseCSSEGISandDataUrl =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/' +
  'master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_{type}_global.csv';
export { baseCSSEGISandDataUrl };

export type baseCSSEGISandDataTypes = 'confirmed' | 'deaths' | 'recovered';

const infectedInRussiaAreasApiUrl: string =
  'https://kskonovalov.me/samples/corona/api/';
export { infectedInRussiaAreasApiUrl };
