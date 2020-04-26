import React, { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import csv from 'csvtojson';
import { Box } from '@material-ui/core';

import {
  CSSEGISandDataUrl,
  filterCSSEGISandData,
  TCSSEGISandData,
  TPreparedData,
  prepareCSSEGISandData
} from '../helpers';
import { baseCSSEGISandDataTypes } from '../config';
import LineChart from '../components/LineChart';
import Loader from '../components/Loader';
import Filters from '../components/Filters';

const CovidGLobal = () => {
  const [type, setType] = useState<baseCSSEGISandDataTypes | string>(
    'confirmed'
  );
  const [countries, setCountries] = useState<string[]>(['Russia']);
  const [country, setCountry] = useState<string>('Russia');
  const [provinces, setProvinces] = useState<string[]>([]);
  const [province, setProvince] = useState<string>('');
  const [apiData, setApiData] = useState<TCSSEGISandData[]>([]);
  const [preparedData, setPreparedData] = useState<TPreparedData[]>([]);
  const [displayForDays, setDisplayForDays] = useState<number>(30);

  // get data from api
  useEffect(() => {
    const apiUrl = CSSEGISandDataUrl(type);
    axios.get(apiUrl).then(res => {
      const { data } = res;
      csv({
        output: 'json'
      })
        .fromString(data)
        .then((jsonData: TCSSEGISandData[]) => {
          const apiCountries: string[] = [];
          jsonData.map((item: TCSSEGISandData) => {
            if (!apiCountries.includes(item['Country/Region'] as string)) {
              apiCountries.push(item['Country/Region'] as string);
            }
            setCountries(apiCountries);
            return item;
          });
          setApiData(jsonData);
        });
    });
  }, [type]);

  // fill provinces for selected country
  useEffect(() => {
    const currentProvinces: string[] = [];
    apiData.map((item: TCSSEGISandData) => {
      if (item['Country/Region'] === country) {
        currentProvinces.push(item['Province/State'] as string);
      }
      if (currentProvinces.length > 1) {
        setProvinces(currentProvinces);
      } else {
        setProvinces([]);
      }
      return item;
    });
  }, [apiData, country]);

  // prepare data to the format for graphics
  useEffect(() => {
    if (apiData.length === 0) {
      return;
    }
    const filteredByCountry: TCSSEGISandData = filterCSSEGISandData(
      apiData,
      country,
      province
    );
    const dataArray = prepareCSSEGISandData(filteredByCountry);
    setPreparedData(
      dataArray.slice(Math.max(dataArray.length - displayForDays, 0))
    );
  }, [apiData, country, province, displayForDays]);

  if (preparedData.length === 0) {
    return <Loader />;
  }

  return (
    <Box component="section" mt={3}>
      <Filters
        type={type}
        setType={setType}
        provinces={provinces}
        province={province}
        setProvince={setProvince}
        country={country}
        setCountry={setCountry}
        countries={countries}
        displayForDays={displayForDays}
        setDisplayForDays={setDisplayForDays}
      />
      {preparedData.length > 0 ? (
        <h2>
          {type} count in {province} {country}
        </h2>
      ) : (
        <h2>no data</h2>
      )}
      {preparedData.length > 0 && <LineChart data={preparedData} />}
    </Box>
  );
};

export default CovidGLobal;
