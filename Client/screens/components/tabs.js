import { Icon } from "@/components/ui/icon";
import { Tab } from "@rneui/base";
import { Book, FileQuestionIcon, GitGraphIcon, User } from "lucide-react-native";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Tabs() {
  return (
    <View style={styles.tabContainer}>
      <Tab
        onChange={() => console.log("Tab changed")}
        indicatorStyle={{}}
        variant="default"
        iconPosition="bottom"
        disableIndicator
        dense
        buttonStyle={{ backgroundColor: "#fdf7ef" }}
        titleStyle={{
          fontSize: 12,
          color: "#444",
          fontWeight: "600",
          marginTop: 4,
          marginBottom: 0,
        }}
      >
        <Tab.Item title="Tutorials"><Icon as={Book}/><Text>Tutorials</Text></Tab.Item>
        <Tab.Item title="T Sim"><Icon as={GitGraphIcon}/><Text>T sim</Text></Tab.Item>
        <Tab.Item title="Quiz"><Icon as={FileQuestionIcon}/><Text>Quiz</Text></Tab.Item>
        <Tab.Item title="Profile"><Icon as={User}/><Text>Profile</Text></Tab.Item>
      </Tab>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    backgroundColor: "#fff",
    zIndex: 10,
  },
});
