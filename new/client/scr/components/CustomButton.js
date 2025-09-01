import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
