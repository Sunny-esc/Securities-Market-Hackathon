import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const Drawer = () => {
  const drawer = useRef<DrawerLayoutAndroid | null>(null);
  const [drawerPosition, setDrawerPosition] = useState("left");

  const navigationView = () => (
    <SafeAreaView style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        onPress={() => drawer.current?.closeDrawer()}
        title="Close drawer"
      />
    </SafeAreaView>
  );

  return (
    <SafeAreaProvider>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={"left"}
        renderNavigationView={navigationView}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.paragraph}>
            Swipe from the side or press button below to see it!
          </Text>
          <Button
            title="Open drawer"
            onPress={() => drawer.current?.openDrawer()}
          />
        </SafeAreaView>
      </DrawerLayoutAndroid>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
});

export default Drawer;
