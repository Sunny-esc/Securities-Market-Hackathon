import React from "react";
import { Text as RNText } from "react-native";
export function Text({ children, size }) {
  let fontSize = 14;
  if (size === "lg") fontSize = 18;
  if (size === "sm") fontSize = 12;
  return <RNText style={{ fontSize }}>{children}</RNText>;
}