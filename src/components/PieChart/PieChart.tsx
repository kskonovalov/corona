import React, { useEffect, useState } from 'react';
import { PieChart as PieChartGraph, Pie, Tooltip, Cell } from 'recharts';
import axios from 'axios';

import { getRandomColor } from '../../helpers';

const MyComponent = () => {
  const apiUrl = 'https://kskonovalov.me/samples/corona/api/';
  const [data, setData] = useState<any>([]);
  //  get data from api
  useEffect(() => {
    axios.get(apiUrl).then(res => {
      const { data: apiData } = res;
      setData(
        apiData
          .filter((item: any) => {
            return item.sick > 30;
          })
          .map((item: any) => {
            return {
              ...item,
              sick: +item.sick
            };
          })
      );
    });
  }, []);

  if (data.length === 0) {
    return <>Loading..</>;
  }

  return (
    <PieChartGraph width={600} height={500}>
      <Pie
        nameKey="title"
        dataKey="sick"
        data={data}
        cx={240}
        cy={250}
        outerRadius={130}
        fill="#8884d8"
        label={({ name, sick }) => {
          return `${name} (${sick})`;
        }}
      >
        {data.map((item: any, i: number) => (
          <Cell key={`cell-${i}`} fill={getRandomColor()} />
        ))}
      </Pie>
      <Tooltip />
    </PieChartGraph>
  );
};

export default MyComponent;
