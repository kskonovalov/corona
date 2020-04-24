import React, { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import csv from 'csvtojson';
import {
  Select,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Box
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import {
  CSSEGISandDataUrl,
  filterCSSEGISandData,
  ICSSEGISandData,
  TPreparedData,
  prepareCSSEGISandData
} from '../../helpers';
import { baseCSSEGISandDataTypes } from '../../config';
import LineChart from '../../components/LineChart';
import Loader from "../../components/Loader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: '7px 5px'
    },
    outlined: {
      borderColor: deepOrange[300]
    },
    selectWrap: {
      margin: '0 10px',
      position: 'relative',
      top: '3px'
    },
    inputWrap: {
      margin: '0 10px',
      position: 'relative',
      width: '50px',
      "& .MuiInput-underline:after": {
        borderColor: deepOrange[300]
      }
    },
    input: {
      fontSize: '2.125rem',
      textAlign: 'center',
      marginTop: '-11px',
    }
  })
);

const CovidGLobal = () => {
  const classes = useStyles();
  const [type, setType] = useState<baseCSSEGISandDataTypes | string>(
    'confirmed'
  );
  const [countries, setCountries] = useState<string[]>(['Russia']);
  const [country, setCountry] = useState<string>('Russia');
  const [provinces, setProvinces] = useState<string[]>([]);
  const [province, setProvince] = useState<string>('');
  const [apiData, setApiData] = useState([]);
  const [preparedData, setPreparedData] = useState<TPreparedData[]>([]);
  const [displayForDays, setDisplayForDays] = useState<number>(30);

  // get data from api
  useEffect(() => {
    const apiUrl = CSSEGISandDataUrl(type);
    axios.get(apiUrl).then(res => {
      const { data } = res;
      csv({
        output: 'json'
      })
        .fromString(data)
        .then((jsonData: any) => {
          const apiCountries: string[] = [];
          jsonData.map((item: any) => {
            if (!apiCountries.includes(item['Country/Region'])) {
              apiCountries.push(item['Country/Region']);
            }
            setCountries(apiCountries);
            return item;
          });
          setApiData(jsonData);
        });
    });
  }, [type]);

  // fill provinces for selected country
  useEffect(() => {
    const currentProvinces: string[] = [];
    apiData.map((item: any) => {
      if (item['Country/Region'] === country) {
        currentProvinces.push(item['Province/State']);
      }
      if (currentProvinces.length > 1) {
        setProvinces(currentProvinces);
      } else {
        setProvinces([]);
      }
      return item;
    });
  }, [apiData, country]);

  // prepare data to the format for graphics
  useEffect(() => {
    if (apiData.length === 0) {
      return;
    }
    const filteredByCountry: ICSSEGISandData = filterCSSEGISandData(
      apiData,
      country,
      province
    );
    const dataArray = prepareCSSEGISandData(filteredByCountry);
    setPreparedData(dataArray.slice(Math.max(dataArray.length - displayForDays, 0)));
  }, [apiData, country, province, displayForDays]);

  if(preparedData.length === 0) {
    return <Loader />;
  }
  
  return (
    <Box component="section" mt={3}>
      <Typography variant="h4" component="h2">
        Total
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-label">type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={type}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setType(event.target.value as string);
            }}
            classes={{
              root: classes.padded,
              outlined: classes.outlined
            }}
            className={classes.selectWrap}
          >
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="recovered">Recovered</MenuItem>
            <MenuItem value="deaths">Deaths</MenuItem>
          </Select>
        </FormControl>
        {provinces.length > 0 && (
          <>
            in{' '}
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-label">Province</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={province}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setProvince(event.target.value as string);
                }}
                classes={{
                  root: classes.padded
                }}
                className={classes.selectWrap}
              >
                {provinces.map(item => {
                  return (
                    <MenuItem value={item} key={item}>
                      {item.length > 0 ? item : 'All'}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </>
        )}
        in
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={country}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setCountry(event.target.value as string);
            }}
            classes={{
              root: classes.padded
            }}
            className={classes.selectWrap}
          >
            {countries.map(item => {
              return (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        for last
        <FormControl variant="outlined">
          <TextField
            value={displayForDays}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setDisplayForDays(parseInt(event.currentTarget.value) || 0);
            }}
            classes={{
              root: classes.padded
            }}
            InputProps={{
              classes: {
                input: classes.input
              },
            }}
            className={classes.inputWrap}
          />
        </FormControl>
        days
      </Typography>
      {preparedData.length > 0 ? (
        <h2>
          {type} count in {province} {country}
        </h2>
      ) : (
        <h2>no data</h2>
      )}
      {preparedData.length > 0 && <LineChart data={preparedData} />}
    </Box>
  );
};

export default CovidGLobal;
