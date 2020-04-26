import React, { ChangeEvent } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { baseCSSEGISandDataTypes } from '../../config';

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

type TFilters = {
  type: baseCSSEGISandDataTypes | string;
  setType: (value: baseCSSEGISandDataTypes | string) => void;
  provinces: string[];
  province: string;
  setProvince: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  countries: string[];
  displayForDays: number;
  setDisplayForDays: (value: number) => void;
};

const Filters: React.FC<TFilters> = ({
  type,
  setType,
  provinces,
  province,
  setProvince,
  country,
  setCountry,
  countries,
  displayForDays,
  setDisplayForDays
}) => {
  const classes = useStyles();
  return (
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
            }
          }}
          className={classes.inputWrap}
        />
      </FormControl>
      days
    </Typography>
  );
};

export default Filters;
