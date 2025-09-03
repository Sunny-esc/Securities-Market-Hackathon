import React from "react";
import { View } from "react-native";
export function Divider(props) {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: "#e0e0e0",
        marginVertical: 8,
        ...props.style,
      }}
    />
  );
}