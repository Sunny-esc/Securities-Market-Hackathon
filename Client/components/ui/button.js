import React from "react";
import { Text, TouchableOpacity } from "react-native";
export function Button({ children, ...props }) {
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
}
export function ButtonText({ children }) {
  return <Text>{children}</Text>;
}
export function ButtonIcon({ as: Icon }) {
  return Icon ? <Icon /> : null;
}