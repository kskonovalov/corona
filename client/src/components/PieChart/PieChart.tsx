import React, { useEffect, useState } from 'react';
import {
  PieChart as PieChartGraph,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer
} from 'recharts';

import Loader from '../Loader';
import { getRandomColor } from '../../helpers';

const PieChart = ({ data }: { data: object[] }) => {
  if (data.length === 0) {
    return <Loader />;
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChartGraph>
        <Pie
          nameKey="title"
          dataKey="sick"
          data={data}
          cx={240}
          cy={250}
          outerRadius={130}
          fill="#8884d8"
          label={({ name, sick }) => {
            return `${name} (${sick})`;
          }}
        >
          {data.map((item: any, i: number) => (
            <Cell key={`cell-${i}`} fill={getRandomColor()} />
          ))}
        </Pie>
        <Tooltip />
      </PieChartGraph>
    </ResponsiveContainer>
  );
};

export default PieChart;
