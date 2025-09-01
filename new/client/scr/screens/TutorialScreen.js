import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import api from "../services/api";

export default function TutorialScreen() {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const res = await api.get("/tutorials");
        setTutorials(res.data);
      } catch (err) {
        console.error("Error fetching tutorials:", err.message);
      }
    };
    fetchTutorials();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Tutorials</Text>
      <FlatList
        data={tutorials}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 15, backgroundColor: "#f5f5f5", borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
});
