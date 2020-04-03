import React, { useEffect, useState } from 'react';
import axios from 'axios';
import csv from 'csvtojson';

const apiUrl =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

const Index = () => {
  const [data, setData] = useState<object[]>([]);
  const [filteredData, setFilteredData] = useState<object[]>([]);

  //  get data from api
  useEffect(() => {
    axios.get(apiUrl).then(res => {
      const { data: apiData } = res;
      csv({
        output: 'json'
      })
        .fromString(apiData)
        .then((jsonData: object[]) => {
          setData(jsonData);
        });
    });
  }, []);

  useEffect(() => {
    if(data.length === 0) {
      return;
    }
    setFilteredData(data.filter((item: any) => {
      return item["Country/Region"] === "Russia";
    }))
  }, [data]);

  console.log(filteredData);

  return (
    <div>
      <h1>Hello there!</h1>
      <pre>{}</pre>
    </div>
  );
};

export default Index;
