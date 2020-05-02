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

  // get countries from api
  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/countries';
    axios.post(apiUrl, {
      type
    }).then(res => {
      const { data } = res;
      data.data && setCountries(data.data);
    });
  }, [type]);

  // fill provinces for selected country
  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/provinces';
    axios.post(apiUrl, {
      type,
      country
    }).then(res => {
      const { data } = res;
      if(data.data) {
        setProvinces(data.data);
      } else {
        setProvinces([]);
      }
    });
  }, [type, country]);

  // prepare data to the format for graphics
  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/graphdata';
    axios.post(apiUrl, {
      type,
      country,
      province,
      displayForDays
    }).then(res => {
      const { data } = res;
      if(data.data) {
        setPreparedData(data.data);
      } else {
        setPreparedData([]);
      }
    });
  }, [type, country, province, displayForDays]);

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
