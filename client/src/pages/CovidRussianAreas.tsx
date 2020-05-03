import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import PieChart from '../components/PieChart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: '7px 5px'
    },
    outlined: {
      borderColor: deepOrange[300]
    },
    inputWrap: {
      margin: '0 10px',
      position: 'relative',
      width: '150px',
      '& .MuiInput-underline:after': {
        borderColor: deepOrange[300]
      }
    },
    input: {
      fontSize: '2.125rem',
      textAlign: 'center',
      marginTop: '-11px'
    }
  })
);

const CovidRussianAreas = () => {
  const classes = useStyles();

  const [data, setData] = useState<object[]>([]);
  const [minCount, setMinCount] = useState<number>(1000);

  const apiUrl = 'http://localhost:5000/api/russia-areas';
  useEffect(() => {
    axios
      .post(apiUrl, {
        minCount
      })
      .then(res => {
        const { data: apiData } = res.data;
        console.log(apiData);
        if (apiData.length > 0) {
          setData(apiData);
        }
      });
  }, [minCount]);

  return (
    <>
      <h2>Infected in Russia by areas on today</h2>
      <Typography variant="h4" component="h2">
        Minimum count of infected to display:
        <FormControl variant="outlined">
          <TextField
            value={minCount}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setMinCount(parseInt(event.currentTarget.value) || 0);
            }}
            classes={{
              root: classes.padded
            }}
            InputProps={{
              classes: {
                input: classes.input
              }
            }}
            className={classes.inputWrap}
          />
        </FormControl>
      </Typography>
      <PieChart data={data} />
    </>
  );
};

export default CovidRussianAreas;
