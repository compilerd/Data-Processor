import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import VisibilityIcon from "@material-ui/icons/Visibility";
import { Grid, Paper, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core";

const listViewClasses = makeStyles(() => ({
  rootPaper: {
    padding: 20,
  },
  listItemText: {
    color: "#F9CC0B",
  },
  listButton: {
    backgroundColor: "#0C1D36 !important",
  },

  visibilityIcon: {
    color: "#ffffff",
  },
  title: {
    color: "#F9CC0B",
    textTransform: "uppercase",
    fontFamily: "monospace",
  },
}));

export default function ListArray(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const { viewData, title, listItemSelected } = props;
  const classes = listViewClasses();

  const handleListItemClick = (event, index, singleViewData) => {
    setSelectedIndex(index);
    listItemSelected(singleViewData);
  };

  return (
    <Paper elevation={3} className={classes.rootPaper}>
      <Typography className={classes.title} variant="h6">
        {title}
      </Typography>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          "& ul": { padding: 0 },
        }}
        component="nav"
        aria-label="main data box"
      >
        <Grid container direction="row" spacing={2}>
          {viewData.map((singleViewData, index) => {
            return (
              <Grid item xs={3}>
                <ListItemButton
                  selected={index === selectedIndex ? true : false}
                  onClick={(event) =>
                    handleListItemClick(event, index, singleViewData)
                  }
                  key={index}
                  className={classes.listButton}
                >
                  <ListItemIcon>
                    <VisibilityIcon className={classes.visibilityIcon} />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.listItemText}
                    primary={singleViewData}
                  />
                </ListItemButton>
              </Grid>
            );
          })}
        </Grid>
      </List>
    </Paper>
  );
}
