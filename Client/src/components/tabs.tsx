// import React from "react";
// import { Tab } from "@rneui/themed";

// export default function Tabs() {
//   const [index, setIndex] = React.useState(0);
//   return (
//     <>
//       <Tab value={index} onChange={setIndex} dense>
//         <Tab.Item>Tab</Tab.Item>
//         <Tab.Item>Tab</Tab.Item>
//       </Tab>
//     </>
//   );
// }

import * as React from "react";
import { Tab } from "@rneui/base";

export default function Tabs() {
  return (
    <Tab
      onChange={() => console.log("onChange()")}
      indicatorStyle={{}}
      variant="default"
      iconPosition="bottom"
    >
      <Tab.Item title="Recent" />
      <Tab.Item title="favourite" />
      <Tab.Item title="cart" />
    </Tab>
  );
}
