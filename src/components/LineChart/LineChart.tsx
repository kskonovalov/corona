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

const LineChart: React.FC<any> = ({ data }) => {
  console.log(data);
  const [maxInfected, setMaxInfected] = useState<number>(0);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    setMaxInfected(
      +data[Object.keys(data)[Object.keys(data).length - 1]].infected
    );
  }, [data]);

  if (maxInfected === 0) {
    return <Loader />;
  }
  console.log(data);
  return (
    <LineChartGraph
      width={600}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <XAxis dataKey="date" />
      <YAxis
        dataKey="infected"
        domain={[0, maxInfected]}
        interval="preserveStartEnd"
      />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="infected"
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
