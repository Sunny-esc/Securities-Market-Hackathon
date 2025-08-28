import * as React from "react";
import { Tab } from "@rneui/base";

export default function Tabs() {
  return (
    <Tab
      onChange={() => console.log("onChange()")}
      indicatorStyle={{}}
      variant="default"
      iconPosition="bottom"
      disableIndicator
    >
      <Tab.Item title="Recent" />
      <Tab.Item title="favourite" />
      <Tab.Item title="cart" />
    </Tab>
  );
}
