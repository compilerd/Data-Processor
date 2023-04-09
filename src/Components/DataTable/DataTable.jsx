import React, { useEffect, useState } from "react";

import EnhancedTable from "../TableComponent/TableComponent";
import { fetchResponse } from "../../Utils/apiUtils";
import { stableSort, getComparator } from "../../Utils/commonUtils";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const dataTableClasses = makeStyles(() => ({
  rootPaper: {
    padding: 20,
  },
}));

const DataTable = (props) => {
  const { url = "", customRows = [], tableTitle = "" } = props;
  const [localRows, setLocalRows] = useState(
    customRows.length ? customRows : []
  );
  const [headCells, setHeadCells] = useState([]);
  const [loader, setLoader] = useState(false);
  const [visibleRows, setVisibleRows] = useState([]);
  const classes = dataTableClasses();

  useEffect(() => {
    const headCells = [];
    let rowsOnMount = stableSort(localRows, getComparator("asc", "Cost"));

    rowsOnMount = rowsOnMount.slice(0, 5);
    let columns = rowsOnMount.slice(0, 1);

    columns.forEach((item) => {
      Object.keys(item).forEach((itemSecond) => {
        let temp = {
          id: itemSecond,
          label: itemSecond,
        };
        headCells.push(temp);
      });
    });

    setVisibleRows(rowsOnMount);
    setHeadCells(headCells);
  }, [localRows]);

  const fetchData = async () => {
    setLoader(true);
    const result = await fetchResponse(url);

    if (result?.data?.length) {
      setLocalRows(result.data);

      setLoader(false);
    }
  };
  useEffect(() => {
    if (!customRows.length) {
      fetchData();
    }
  }, [url]);
  return (
    <Paper elevation={1} className={classes.rootPaper}>
      <EnhancedTable
        propRows={localRows}
        headCells={headCells}
        loader={loader}
        propVisibleRows={visibleRows}
        tableTitle={tableTitle.length ? tableTitle : "Cost Center"}
      />
    </Paper>
  );
};

export default DataTable;
