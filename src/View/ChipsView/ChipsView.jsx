import React from "react";

import ChipsArray from "../../Components/ChipsArray/Chips";

const ChipsView = (props) => {
  const { handleChipsSelection } = props;
  const handleChipSelection = (selectedData) => {
    handleChipsSelection(selectedData);
  };

  const data = [
    { key: "cloudCosting", label: "Cloud Costing" },
    { key: "getAllApplication", label: "All Application" },
    { key: "getAllResources", label: "Resources" },
  ];

  return <ChipsArray chips={data} handleChipSelection={handleChipSelection} />;
};

export default ChipsView;
