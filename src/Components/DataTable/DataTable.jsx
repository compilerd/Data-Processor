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
//     Cost: "21.5424",
//     Date: "30/11/2020",
//     InstanceId: "LA-f9c2ab0f-e037-4b5a-9fb9-3452e9c325b9",
//     MeterCategory: "Logic Apps",
//     ResourceGroup: "Macao",
//     ResourceLocation: "EastUS",
//     Tags: {
//       "app-name": "Macao",
//       environment: "Test",
//       "business-unit": "SolutionOps",
//     },
//     UnitOfMeasure: "1 Hour",
//     Location: "US East",
//     ServiceName: "Logic Apps",
//   },
// ];

//   const rows = [
//     createData("Cupcake", 305, 3.7, 67, 4.3),
//     createData("Donut", 452, 25.0, 51, 4.9),
//     createData("Eclair", 262, 16.0, 24, 6.0),
//     createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//     createData("Gingerbread", 356, 16.0, 49, 3.9),
//     createData("Honeycomb", 408, 3.2, 87, 6.5),
//     createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//     createData("Jelly Bean", 375, 0.0, 94, 0.0),
//     createData("KitKat", 518, 26.0, 65, 7.0),
//     createData("Lollipop", 392, 0.2, 98, 0.0),
//     createData("Marshmallow", 318, 0, 81, 2.0),
//     createData("Nougat", 360, 19.0, 9, 37.0),
//     createData("Oreo", 437, 18.0, 63, 4.0),
//   ];

// const headCells = [
//     {
//       id: "name",
//       numeric: false,
//       disablePadding: true,
//       label: "Dessert (100g serving)",
//     },
//     {
//       id: "calories",
//       numeric: true,
//       disablePadding: false,
//       label: "Calories",
//     },
//     {
//       id: "fat",
//       numeric: true,
//       disablePadding: false,
//       label: "Fat (g)",
//     },
//     {
//       id: "carbs",
//       numeric: true,
//       disablePadding: false,
//       label: "Carbs (g)",
//     },
//     {
//       id: "protein",
//       numeric: true,
//       disablePadding: false,
//       label: "Protein (g)",
//     },
//   ];

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
