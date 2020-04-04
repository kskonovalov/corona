import React, { useEffect, useState } from 'react';
import axios from 'axios';
import csv from 'csvtojson';
import LineChart from "../../components/LineChart";

// todo view-source:https://xn--80aesfpebagmfblc0a.xn--p1ai/#

const Index = () => {
  return (
    <div>
      <LineChart />
    </div>
  );
};

export default Index;
