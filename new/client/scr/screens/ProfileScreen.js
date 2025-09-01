import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>
      {user ? (
        <>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Text>No user logged in</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 10 },
});
