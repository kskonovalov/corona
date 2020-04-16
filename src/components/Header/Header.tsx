import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  Button,
  ButtonGroup,
  Typography,
  AppBar,
  Toolbar
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBar: {
      background: deepOrange[300]
    },
    title: {
      flexGrow: 1
    },
    button: {
      color: '#fff',
      borderColor: '#fff',
      '&:hover': {
        borderColor: 'rgba(255, 255, 255, 0.5)'
      }
    },
    buttonGroup: {
      marginLeft: '20px'
    }
  })
);

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static" className={classes.topBar}>
        <Toolbar>
          <Typography variant="h6">Covid 2020 visual</Typography>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
            className={classes.buttonGroup}
          >
            <Button component={NavLink} to="/" className={classes.button}>
              World
            </Button>
            <Button component={NavLink} to="/russia" className={classes.button}>
              Russia
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
