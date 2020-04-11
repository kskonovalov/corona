import React, { useEffect, useState } from 'react';
import {
  Legend,
  Line,
  LineChart as LineChartGraph,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import Loader from '../Loader';

interface IData {
  data: any;
}

const LineChart: React.FC<any> = ({ data, countLabel, country, province }) => {
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
    <LineChartGraph
      width={600}
      height={500}
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
      <Legend
        verticalAlign="top"
        payload={[
          {
            value: `${countLabel} count in ${province} ${country}`,
            type: 'line',
            id: 'ID01'
          }
        ]}
      />
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
  );
};

export default LineChart;
