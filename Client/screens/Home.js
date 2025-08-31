import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BasicsCard from "./components/basicsCard";
import ItemsCard from "./components/itemCard";
import TProgress from "./components/tprogress";

export default function Home() {
  return (
    <SafeAreaProvider
      style={{
        paddingTop: 0,
        backgroundColor: "#ffdd",
      }}
    >
      <BasicsCard />
      <ItemsCard />
      <TProgress />
    </SafeAreaProvider>
  );
}
