import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import csv from 'csvtojson';

import { CSSEGISandDataUrl } from '../helpers';
import { baseCSSEGISandDataTypes } from '../config';

const StyledSelect = styled.select`
  display: inline-block;
  margin: 0 10px;
`;

const CovidGLobal = () => {
  // todo: graph view
  const [type, setType] = useState<baseCSSEGISandDataTypes | string>('confirmed');
  const [country, setCountry] = useState('Russia');

  // todo: get data from api
    const apiUrl = CSSEGISandDataUrl(type);

  // todo: provide data to Graph

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
        in {country}
      </h3>
      <p>CovidGlobal {apiUrl}</p>
    </div>
  );
};

export default CovidGLobal;
