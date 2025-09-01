import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Welcome to InvestorEduApp</Text>
      <Text style={styles.subtitle}>Learn investing with tutorials, quizzes & trading simulations.</Text>
      <Button title="Go to Tutorials" onPress={() => navigation.navigate("Tutorials")} />
      <Button title="Take a Quiz" onPress={() => navigation.navigate("Quiz")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: "center" },
});
