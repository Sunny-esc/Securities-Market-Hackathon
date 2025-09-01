import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import api from "../services/api";

export default function QuizScreen() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get("/quiz/random");
        setQuestion(res.data);
      } catch (err) {
        console.error("Error fetching quiz:", err.message);
      }
    };
    fetchQuiz();
  }, []);

  if (!question) return <Text style={styles.loading}>Loading quiz...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.question}</Text>
      {question.options.map((opt, idx) => (
        <Button
          key={idx}
          title={opt}
          onPress={() =>
            setAnswer(idx === question.correct ? "✅ Correct!" : "❌ Wrong!")
          }
        />
      ))}
      {answer && <Text style={styles.answer}>{answer}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  loading: { flex: 1, textAlign: "center", marginTop: 50 },
  answer: { fontSize: 18, marginTop: 20, fontWeight: "bold" },
});
