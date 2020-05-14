import React, { ChangeEvent } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

import useStyles from './styles';
import TFilters from './types';

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
  setDisplayForDays,
  dynamic,
  setDynamic
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
      days{` `}
      <FormControlLabel
        control={
          <Checkbox
            checked={dynamic}
            onChange={e => {
              setDynamic(!dynamic);
            }}
            name="dynamic"
          />
        }
        label=""
      />
      dynamics
    </Typography>
  );
};

export default Filters;
