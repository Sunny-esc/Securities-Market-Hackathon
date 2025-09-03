import { SearchBar } from "@rneui/base";
import React from "react";

export default function Search() {
  const [value, setValue] = React.useState("");
  return (
    <SearchBar
      platform="default"
      lightTheme
      onChangeText={setValue}
      onClear={() => setValue("")}
      placeholder="Type query here..."
      placeholderTextColor="#888"
      round
      cancelButtonTitle="Cancel"
      onCancel={() => setValue("")}
      value={value}
    />
  );
}
