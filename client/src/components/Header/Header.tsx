import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Typography,
  AppBar,
  Toolbar
} from '@material-ui/core';

import useStyles from "./styles";

const Header: React.FC = () => {
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
            <Button component={NavLink} to="/" exact className={classes.button}>
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
