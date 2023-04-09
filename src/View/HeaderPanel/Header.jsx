import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Logo from "../Logo/logo";

const headerStyles = makeStyles(() => ({
  headerPanel: {
    background: "#0C1D36",
    minHeight: 70,
  },
  logo: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 18,
  },
  headerText: {
    color: "#F9CC0B",
    fontFamily: "monospace",
  },
}));

const Header = () => {
  const classes = headerStyles();
  return (
    <Grid container direction="row" className={classes.headerPanel}>
      <Grid item>
        <Grid container spacing={2} className={classes.logo}>
          <Grid item>
            <Logo />
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.headerText}>
              Data Processor
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
