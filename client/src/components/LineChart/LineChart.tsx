import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  Line,
  LineChart as LineChartGraph,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import Loader from '../Loader';

const LineChart: React.FC<{ data: object[] }> = ({ data }) => {
  const [maxCount, setMaxCount] = useState<number>(0);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    setMaxCount(
      +Math.max.apply(
        Math,
        Object.keys(data).map(function(item: any) {
          return +data[item];
        })
      )
    );
  }, [data]);

  if (maxCount === 0) {
    return <Loader />;
  }

  return (
    <ResponsiveContainer width="100%" aspect={2.0}>
      <LineChartGraph
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 25,
          bottom: 70
        }}
      >
        <XAxis dataKey="date" angle={-45} textAnchor="end" interval={5} />
        <YAxis
          dataKey="count"
          domain={[0, maxCount]}
          interval="preserveStartEnd"
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          // label={({x, y}) => {
          //     return `date: ${x}, infected: ${y}`;
          // }}
        />
      </LineChartGraph>
    </ResponsiveContainer>
  );
};

export default LineChart;
