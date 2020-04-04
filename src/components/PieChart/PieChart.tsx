import React, { useEffect, useState } from 'react';
import { PieChart as PieChartGraph, Pie, Sector } from 'recharts';
import axios from 'axios';
import csv from 'csvtojson';

const MyComponent = () => {
  const apiUrl = 'https://kskonovalov.me/samples/corona/api/';
  const [data, setData] = useState<any>([]);
  //  get data from api
  useEffect(() => {
    axios.get(apiUrl).then(res => {
      const { data: apiData } = res;
      setData(apiData);
    });
  }, []);

  if(data.length === 0) {
      return <>Loading..</>;
  }
  console.log(data);
  return (
    <PieChartGraph width={800} height={400}>
      <Pie
        nameKey="title"
        dataKey="sick"
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      />
    </PieChartGraph>
  );
};

export default MyComponent;
