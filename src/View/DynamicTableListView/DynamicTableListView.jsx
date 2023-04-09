import React, { useState, useEffect } from "react";
import ListArray from "../../Components/List/ListArray";
import LinearIndeterminate from "../LinerLoader";
import { fetchResponse } from "../../Utils/apiUtils";
import { Paper, Tab, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import DataTable from "../../Components/DataTable/DataTable";

const listViewClasses = makeStyles(() => ({
  rootView: {
    padding: 20,
  },
}));

const DynamicTableListView = (props) => {
  const { url, title } = props;

  const [viewData, setViewData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentURL, setCurrentURL] = useState(url);
  const [tableTitle, setTableTilte] = useState("");
  const classes = listViewClasses();

  const listItemSelected = (itemSelected) => {
    let tempURL = `${currentURL}/${itemSelected}`;
    setCurrentURL(tempURL);
    setTableTilte(itemSelected);
  };

  const fetchData = async () => {
    setLoader(true);
    const result = await fetchResponse(currentURL);

    if (result?.data?.length) {
      setViewData(result.data);

      setLoader(false);
    }
  };

  useEffect(() => {
    setCurrentURL(url);
  }, [url]);
  useEffect(() => {
    console.log("urlischan", currentURL);
    fetchData();
  }, [currentURL]);

  console.log("viewData", typeof viewData[0]);
  return loader ? (
    <LinearIndeterminate />
  ) : (
    <Paper elevation={3} className={classes.rootView}>
      {typeof viewData[0] === "string" ? (
        <ListArray
          viewData={viewData}
          title={title}
          listItemSelected={listItemSelected}
        />
      ) : (
        <DataTable customRows={viewData} tableTitle={tableTitle} />
      )}
    </Paper>
  );
};

export default DynamicTableListView;
