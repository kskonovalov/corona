import React, { useEffect, useState } from 'react';
import axios from 'axios';
import csv from 'csvtojson';
import LineChart from "../../components/LineChart";

// https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series
const apiUrl =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

const Index = () => {
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
    delete countryData["Province/State"];
    delete countryData["Country/Region"];
    delete countryData["Lat"];
    delete countryData["Long"];
    setGraphData(Object.keys(countryData).map((date: string) => {
      return {
        date,
        infected: countryData[date]
      };
    }).filter((item: any) => {
      return item.infected > 20;
    }));

  }, [data]);

  useEffect(() => {
    if (graphData.length === 0) {
      return;
    }
    setMaxInfected(+graphData[Object.keys(graphData)[Object.keys(graphData).length - 1]].infected);
  }, [graphData]);

  if (maxInfected === 0) {
    return <>loading..</>;
  }

  return (
    <div>
      <LineChart graphData={graphData} maxInfected={maxInfected} />
    </div>
  );
};

export default Index;
