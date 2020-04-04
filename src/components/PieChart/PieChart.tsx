import React, { useEffect, useState } from 'react';
import { PieChart as PieChartGraph, Pie, Tooltip } from 'recharts';
import axios from 'axios';
import csv from 'csvtojson';

const MyComponent = () => {
  const apiUrl = 'https://kskonovalov.me/samples/corona/api/';
  const [data, setData] = useState<any>([]);
  //  get data from api
  useEffect(() => {
    axios.get(apiUrl).then(res => {
      const { data: apiData } = res;
      setData(apiData.map((item: any) => {
        return {
            ...item,
            sick: +item.sick
        };
      }));
    });
  }, []);

  if(data.length === 0) {
      return <>Loading..</>;
  }

  return (
    <PieChartGraph width={600} height={500}>
      <Pie
        nameKey="title"
        dataKey="sick"
        data={data}
        cx={250}
        cy={250}
        outerRadius={150}
        fill="#8884d8"
        label={({name, sick}) => {
          return sick > 100 ? name : '';
        }}
      />
      <Tooltip />
    </PieChartGraph>
  );
};

export default MyComponent;
