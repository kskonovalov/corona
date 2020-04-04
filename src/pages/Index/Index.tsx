import React from 'react';

import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';

const Index = () => {
  return (
    <div>
      <h2>Total infected in Russia</h2>
      <LineChart />
      <h2>Infected in Russia by areas on today</h2>
      <PieChart />
    </div>
  );
};

export default Index;
