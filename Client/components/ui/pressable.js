import React from "react";
import { TouchableOpacity, View } from "react-native";
export function Pressable({ children, ...props }) {
  return (
    <TouchableOpacity {...props}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {children}
      </View>
    </TouchableOpacity>
  );
}