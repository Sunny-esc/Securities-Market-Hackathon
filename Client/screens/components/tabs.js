import { Icon } from "@/components/ui/icon";
import { Tab, TabView, Text } from "@rneui/base";
import {
  Book,
  FileQuestionIcon,
  GitGraphIcon,
  Home,
  User,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "../Home";
import Tutorial from "../Tutorials";
export default function Tabs() {
  const [index, setIndex] = React.useState(0);
  return (
    <SafeAreaProvider
      style={{ flex: 1, backgroundColor: "#000", width: "100%" }}
    >
      <Tab
        style={styles.tabContainer}
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{ backgroundColor: "#000", height: 4, top: 0 }}
        variant="primary"
        iconPosition="bottom"
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
        <Tab.Item title="Home">
          <Icon as={Home} />
          <Text>Home</Text>
        </Tab.Item>
        <Tab.Item title="Tutorials">
          <Icon as={Book} />
          <Text>Tutorials</Text>
        </Tab.Item>
        <Tab.Item title="T Sim">
          <Icon as={GitGraphIcon} />
          <Text>T sim</Text>
        </Tab.Item>
        <Tab.Item title="Quiz">
          <Icon as={FileQuestionIcon} />
          <Text>Quiz</Text>
        </Tab.Item>
        <Tab.Item title="Profile">
          <Icon as={User} />
          <Text>Profile</Text>
        </Tab.Item>
      </Tab>
      <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        style={{ flex: 1, width: "100%" }}
      >
        <TabView.Item style={styles.fullScreen}>
          <HomeScreen />
        </TabView.Item>
        <TabView.Item style={styles.fullScreen}>
          <Tutorial />
        </TabView.Item>
        <TabView.Item style={styles.fullScreen}>
          <View style={styles.fullScreen}>
            <Text h1>T sim</Text>
          </View>
        </TabView.Item>
        <TabView.Item style={styles.fullScreen}>
          <View style={styles.fullScreen}>
            <Text h1>Quiz</Text>
          </View>
        </TabView.Item>
        <TabView.Item style={styles.fullScreen}>
          <View style={styles.fullScreen}>
            <Text h1>Profile</Text>
          </View>
        </TabView.Item>
      </TabView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 11,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  fullScreen: {
    flex: 1,
    width: "100%",
  },
});
