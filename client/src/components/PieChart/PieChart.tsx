import React, { useEffect, useState } from 'react';
import {
  PieChart as PieChartGraph,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer
} from 'recharts';

import Loader from '../Loader';
import { getRandomColor } from '../../helpers';

const PieChart = ({ data, selected }: { data: object[], selected: string[] }) => {
  const [filtered, setFiltered] = useState(data);
  useEffect(() => {
    setFiltered(data.filter((item: any) => {
      return selected.includes(item.code);
    }))
  }, [data, selected]);
  if (data.length === 0) {
    return <Loader />;
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChartGraph>
        <Pie
          nameKey="title"
          dataKey="sick"
          data={filtered}
          cy={250}
          outerRadius={150}
          fill="#8884d8"
          label={({ name, sick }) => {
            return `${name} (${sick})`;
          }}
        >
          {filtered.map((item: any, i: number) => (
            <Cell key={`cell-${i}`} fill={getRandomColor()} />
          ))}
        </Pie>
        <Tooltip />
      </PieChartGraph>
    </ResponsiveContainer>
  );
};

export default PieChart;
