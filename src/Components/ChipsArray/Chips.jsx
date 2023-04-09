import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(1),
}));

const chipClasses = makeStyles(() => ({
  customChip: {
    color: "#F9CC0B !important",
    borderColor: "#F9CC0B !important",
  },
}));

export default function ChipsArray(props) {
  const { chips, handleChipSelection } = props;
  const [selectedKey, setSelectedKey] = useState(chips[0].key);
  const classes = chipClasses();

  const handleClick = (selectedChip) => () => {
    handleChipSelection(selectedChip);
    setSelectedKey(selectedChip.key);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        backgroundColor: "#0C1D36",
      }}
      component="ul"
    >
      {chips.map((data) => {
        return (
          <ListItem key={data.key}>
            <Chip
              icon={
                data.key === selectedKey ? (
                  <DoneIcon className={classes.customChip} />
                ) : null
              }
              variant="outlined"
              className={classes.customChip}
              label={data.label}
              clickable={true}
              onClick={handleClick(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
