import React, { useEffect, useState } from 'react';
import {
  Legend,
  Line,
  LineChart as LineChartGraph,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import axios from 'axios';
import csv from 'csvtojson';

import Loader from '../Loader';
import { totalInfectedApiUrl as apiUrl } from '../../config';

const LineChart: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [graphData, setGraphData] = useState<any>([]);
  const [maxInfected, setMaxInfected] = useState<number>(0);

  //  get data from api
  useEffect(() => {
    axios.get(apiUrl).then(res => {
      const { data: apiData } = res;
      csv({
        output: 'json'
      })
        .fromString(apiData)
        .then((jsonData: any) => {
          setData(jsonData);
        });
    });
  }, []);

  // prepare data for view
  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    const filteredData = data.filter((item: any) => {
      return item['Country/Region'] === 'Russia';
    });
    const countryData = filteredData[0];
    delete countryData['Province/State'];
    delete countryData['Country/Region'];
    delete countryData['Lat'];
    delete countryData['Long'];
    setGraphData(
      Object.keys(countryData)
        .map((date: string) => {
          return {
            date,
            infected: countryData[date]
          };
        })
        .filter((item: any) => {
          return item.infected > 20;
        })
    );
  }, [data]);

  useEffect(() => {
    if (graphData.length === 0) {
      return;
    }
    setMaxInfected(
      +graphData[Object.keys(graphData)[Object.keys(graphData).length - 1]]
        .infected
    );
  }, [graphData]);

  if (maxInfected === 0) {
    return <Loader />;
  }

  return (
    <LineChartGraph
      width={600}
      height={500}
      data={graphData}
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
