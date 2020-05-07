import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  TextField,
  Typography,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
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

interface IAreaObject {
  title: string;
  code: string;
}

interface IData {
  code: string;
  coord_x: string;
  coord_y: string;
  died: number;
  died_incr: number;
  healed: number;
  healed_incr: number;
  is_city: boolean;
  sick: number;
  sick_incr: number;
  title: string;
}

const CovidRussianAreas: React.FC = () => {
  const classes = useStyles();

  const [data, setData] = useState<IData[]>([]);
  const [areas, setAreas] = useState<IAreaObject[]>([]);
  const savedSelected: string = localStorage.getItem('selected') || '[]';
  const [selected, setSelected] = useState<string[]>(JSON.parse(savedSelected));
  const savedMinCount: string = localStorage.getItem('minCount') || "1500";
  const [minCount, setMinCount] = useState<number>(parseInt(savedMinCount));

  // get areas data from api
  useEffect(() => {
    axios
      .post('http://localhost:5000/api/russian-areas', {
        minCount
      })
      .then(res => {
        const { data: apiData } = res.data;
        if (apiData.length > 0) {
          setData(apiData);
          setAreas(
            apiData.map((item: IData) => {
              return {
                title: item.title,
                code: item.code
              };
            })
          );
        }
      });
  }, [minCount]);

  useEffect(() => {
    localStorage.setItem('selected', JSON.stringify(selected));
  }, [selected]);

  useEffect(() => {
    localStorage.setItem('minCount', minCount.toString());
  }, [minCount]);

  const checkHandler = (item: IAreaObject) => {
    if (selected.includes(item.code)) {
      setSelected(selected.filter(itm => itm !== item.code));
    } else {
      setSelected([...selected, item.code]);
    }
  };

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

      <FormControl component="fieldset">
        <FormLabel component="legend">Russian areas</FormLabel>
        <FormGroup row={true}>
          {areas.map(item => {
            return (
              <FormControlLabel
                key={item.code}
                id={item.code}
                control={
                  <Checkbox
                    checked={selected.includes(item.code)}
                    onChange={e => {
                      checkHandler(item);
                    }}
                    name={item.code}
                  />
                }
                label={item.title}
              />
            );
          })}
        </FormGroup>
      </FormControl>
      <PieChart data={data} selected={selected} />
    </>
  );
};

export default CovidRussianAreas;
