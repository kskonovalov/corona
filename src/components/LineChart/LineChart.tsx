import React from 'react';
import {
  Legend,
  Line,
  LineChart as LineChartGraph,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const LineChart: React.FC<any> = ({ graphData, maxInfected }) => {
  return (
    <LineChartGraph
      width={800}
      height={400}
      data={graphData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <XAxis dataKey="name" />
      <YAxis dataKey="infected" domain={[0, maxInfected]} />
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
