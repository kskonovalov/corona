import React from 'react';
import styled from 'styled-components';

import LineChart from './components/LineChart';
import PieChart from './components/PieChart';

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
      <StyledTitle>Russia infected covid-19 count</StyledTitle>
      <StyledIndex>
        <div>
          <h2>Total infected in Russia</h2>
          <LineChart />
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
