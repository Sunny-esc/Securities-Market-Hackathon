import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, List } from "react-native-paper";

const lessons = [
  {
    title: "What is a Stock?",
    points: [
      "Represents ownership (equity) in a company.",
      "Shareholders can gain via price appreciation and dividends.",
      "Traded on exchanges like NSE/BSE.",
    ],
  },
  {
    title: "Market Orders vs Limit Orders",
    points: [
      "Market: executes immediately at best available price.",
      "Limit: executes only at or better than your set price.",
      "Beginners often prefer limit to control price.",
    ],
  },
  {
    title: "Indices (NIFTY/SENSEX)",
    points: [
      "Index = basket of representative stocks.",
      "Helps track market performance quickly.",
      "Used as benchmarks for funds.",
    ],
  },
  {
    title: "Risk Management",
    points: [
      "Never put all money into one stock.",
      "Use position sizing; set stop-losses.",
      "Invest with a long-term plan.",
    ],
  },
];

export default function TutorialScreen() {
  return (
      <ScrollView style={styles.root} contentContainerStyle={{ padding: 12 }}>
      {lessons.map((l, i) => (
        <Card key={i} style={styles.card}>
          <Card.Title title={l.title} />
          <Card.Content>
            {l.points.map((p, j) => (
              <List.Item key={j} title={p} left={(props) => <List.Icon {...props} icon="circle-small" />} />
            ))}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f6f9fb" },
  card: { marginBottom: 12, borderRadius: 20 },
});
