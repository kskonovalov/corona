import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import csv from "csvtojson";
import axios from "axios";

import CovidGlobal from './CovidGlobal';
import PieChart from './components/PieChart';
import { filterByRegion } from "./helpers";

const StyledTitle = styled.h1`
  text-align: center;
`;

const StyledIndex = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  & > div {
    width: 45%;
    min-width: 500px;
  }
`;

function App() {
  return (
    <div className="App">
      <StyledTitle>Covid-19</StyledTitle>
      <StyledIndex>
        <div>
          <CovidGlobal />
        </div>
        <div>
          <h2>Infected in Russia by areas on today</h2>
          <PieChart />
        </div>
      </StyledIndex>
    </div>
  );
}

export default App;
