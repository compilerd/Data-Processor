import React from "react";

import logo from "../Icons/data-processor-high-resolution-logo-color-on-transparent-background.png";

const Logo = React.memo(() => {
  return (
    <div>
      <img src={logo} height={50} width={50} />
    </div>
  );
});

Logo.displayName = "Logo";

export default Logo;
