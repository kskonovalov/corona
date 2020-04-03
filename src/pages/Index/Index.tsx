import React, { useEffect, useState } from 'react';
import axios from 'axios';
import csv from 'csvtojson';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const apiUrl =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

const Index = () => {
  const [data, setData] = useState<any>([]);
  const [graphData, setGraphData] = useState<any>([]);

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

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    const filteredData = data.filter((item: any) => {
      return item['Country/Region'] === 'Russia';
    });
    const countryData = filteredData[0];
    delete countryData["Province/State"];
    delete countryData["Country/Region"];
    delete countryData["Lat"];
    delete countryData["Long"];
    setGraphData(Object.keys(countryData).map((date: string) => {
      return {
        date,
        infected: countryData[date]
      };
    }));

  }, [data]);

  console.log();

  return (
    <div>
      <h1>Hello there!</h1>
      <LineChart
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
        <YAxis dataKey="infected" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="infected"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default Index;
