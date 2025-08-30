import React from "react";
import { View } from "react-native";
export function VStack({ children, style, ...props }) {
  return (
    <View style={[{ flexDirection: "column", gap: 4 }, style]} {...props}>
      {children}
    </View>
  );
}
