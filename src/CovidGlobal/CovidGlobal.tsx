import React, { ChangeEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import csv from 'csvtojson';

import {
  CSSEGISandDataUrl,
  filterCSSEGISandDataByCountry,
  ICSSEGISandData,
  prepareCSSEGISandData
} from '../helpers';
import { baseCSSEGISandDataTypes } from '../config';
import LineChart from "../components/LineChart";

const StyledSelect = styled.select`
  display: inline-block;
  margin: 0 10px;
`;

const CovidGLobal = () => {
  // todo: graph view
  const [type, setType] = useState<baseCSSEGISandDataTypes | string>(
    'confirmed'
  );
  const [countries, setCountries] = useState<string[]>(['Russia']);
  const [country, setCountry] = useState('Russia');
  const [apiData, setApiData] = useState([]);
  const [preparedData, setPreparedData] = useState<any>([]);

  useEffect(() => {
      const apiUrl = CSSEGISandDataUrl(type);
      axios.get(apiUrl).then(res => {
          const { data } = res;
          csv({
              output: 'json'
          })
              .fromString(data)
              .then((jsonData: any) => {
                  const apiCountries: string[] = [];
                  jsonData.map((item: any) => {
                      if(!apiCountries.includes(item['Country/Region'])) {
                          apiCountries.push(item['Country/Region']);
                      }
                      setCountries(apiCountries);
                  });
                  setApiData(jsonData);
              });
      });
  }, [type]);

  useEffect(() => {
      if(apiData.length === 0) {
          return;
      }
      const filteredByCountry: ICSSEGISandData = filterCSSEGISandDataByCountry(
          apiData,
          country
      );
      setPreparedData(prepareCSSEGISandData(filteredByCountry));
  }, [apiData, country]);

  return (
    <div>
      <h3>
        Total
        <StyledSelect
          value={type}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setType(e.target.value);
          }}
        >
          <option value="confirmed">Confirmed</option>
          <option value="recovered">Recovered</option>
          <option value="deaths">Deaths</option>
        </StyledSelect>
        in
          <StyledSelect
              value={country}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setCountry(e.target.value);
              }}
          >
              {countries.map((item) => {
                  return <option value={item} key={item}>{item}</option>;
              })}
          </StyledSelect>
      </h3>
      <LineChart data={preparedData} />
    </div>
  );
};

export default CovidGLobal;
