import React from 'react';
import styled from 'styled-components';

import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';

const StyledIndex = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  & > div {
    width: 45%;
    min-width: 500px;
  }
`;

const Index = () => {
  return (
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
  );
};

export default Index;
