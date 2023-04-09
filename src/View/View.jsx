import React, { useCallback, useState } from "react";

import Header from "./HeaderPanel/Header";
import { Grid } from "@material-ui/core";
import DataTable from "../Components/DataTable/DataTable";
import ChipsView from "./ChipsView/ChipsView";
import DynamicTableListView from "./DynamicTableListView/DynamicTableListView";

const DEFAULT_URL = "https://engineering-task.elancoapps.com/api/raw";
const DEFAULT_CHIPSELECTED = "cloudCosting";

const View = () => {
  const [currentURL, setCurrentURL] = useState(DEFAULT_URL);
  const [currentChip, setCurrenChip] = useState(DEFAULT_CHIPSELECTED);

  const checkToViewList = ["getAllApplication", "getAllResources"].some(
    (item) => currentChip === item
  );

  const handleChipsSelection = (selectedChip) => {
    console.log("selectedChipView", selectedChip.key);
    switch (selectedChip.key) {
      case "cloudCosting":
        setCurrentURL("https://engineering-task.elancoapps.com/api/raw");
        setCurrenChip(selectedChip.key);
        break;

      case "getAllApplication":
        setCurrentURL(
          "https://engineering-task.elancoapps.com/api/applications"
        );
        setCurrenChip(selectedChip.key);
        break;

      case "getAllResources":
        setCurrentURL("https://engineering-task.elancoapps.com/api/resources");
        setCurrenChip(selectedChip.key);
        break;

      default:
        setCurrentURL("https://engineering-task.elancoapps.com/api/raw");
        setCurrenChip(selectedChip.key);
    }
  };

  return (
    <Grid>
      <Grid item>
        <Header />;
      </Grid>
      <Grid item>
        <ChipsView handleChipsSelection={handleChipsSelection} />
      </Grid>
      <Grid item>
        {checkToViewList ? (
          <DynamicTableListView url={currentURL} title={currentChip} />
        ) : (
          <DataTable url={currentURL} />
        )}
      </Grid>
    </Grid>
  );
};

export default View;
