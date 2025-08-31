import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Menu } from "lucide-react-native";
import React from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Drawer, Text } from "react-native-paper";
import Profile from "../Profile";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Draw = () => {
  const [active, setActive] = React.useState(false);
  const translateX = React.useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  React.useEffect(() => {
    if (active) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [active, translateX]);

  const [selected, setSelected] = React.useState("");

  return (
    <>
      <Button onPress={() => setActive(true)} style={{ margin: 11 }}>
        <Icon as={Menu} style={{ color: "#fff" }} size={35} />
      </Button>
      <Modal
        visible={active}
        animationType="none"
        transparent={true}
        onRequestClose={() => setActive(false)}
      >
        <TouchableWithoutFeedback onPress={() => setActive(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[styles.drawer, { transform: [{ translateX }] }]}
              >
                <Drawer.Section
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 50,
                  }}
                >
                  <Drawer.Item
                    label="LOgin"
                    active={selected === "first"}
                    onPress={() => {
                      <Profile />;
                    }}
                    style={{
                      width: 270,
                      backgroundColor: "#e0d8c3",
                      marginBottom: 10,
                    }}
                  />
                  <Drawer.Item
                    label="Second Item"
                    active={selected === "second"}
                    onPress={() => setSelected("second")}
                    style={{
                      width: 270,
                      backgroundColor: "#e0d8c3",
                      marginBottom: 10,
                    }}
                  />
                  <Button
                    onPress={() => setActive(false)}
                    style={{
                      marginTop: 10,
                      marginLeft: 15,
                      backgroundColor: "#7e8052",
                      padding: 10,
                      borderRadius: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100",
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Close
                    </Text>
                  </Button>
                </Drawer.Section>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    flexDirection: "row",
  },
  drawer: {
    backgroundColor: "#fdf7ef",
    width: "80%",
    height: "100%",
    padding: 16,
    elevation: 10,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
  },
});

export default Draw;
