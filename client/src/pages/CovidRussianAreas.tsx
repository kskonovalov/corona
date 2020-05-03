import React, { useEffect, useState } from 'react';

import PieChart from '../components/PieChart';
import axios from "axios";

const CovidRussianAreas = () => {
    const [data, setData] = useState<object[]>([]);
    const [minCount, setMinCount] = useState<number>(1000);

    const apiUrl = 'http://localhost:5000/api/russia-areas';
    useEffect(() => {
        axios.post(apiUrl, {
            minCount: 1000
        }).then(res => {
            const { data: apiData } = res.data;
            console.log(apiData);
            if(apiData.length > 0) {
                setData(
                    apiData
                );
            }
        });
    }, []);

    return (
        <>
            <h2>Infected in Russia by areas on today</h2>
            <PieChart data={data} />
        </>
    );
};

export default CovidRussianAreas;
