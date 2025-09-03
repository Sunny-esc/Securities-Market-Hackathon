import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react-native";
import React from 'react';
import { Animated, Dimensions, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Drawer } from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Notification = () => {
  const [active, setActive] = React.useState(false);
const translateX = React.useRef(new Animated.Value(SCREEN_WIDTH)).current;

React.useEffect(() => {
  if (active) {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.timing(translateX, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }
}, [active, translateX]);

  const [selected, setSelected] = React.useState("");

  return (
    <>
      <Button onPress={() => setActive(true)} style={{ margin: 15 }}>
        <Bell color="#fff" size={28} style={{ marginTop: 0 }} />
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
              <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
                <Drawer.Section style={{width:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                  <Drawer.Item
                    label="Notification 1"
                    active={selected === 'first'}
                    onPress={() => setSelected('first')}
                    style={{width:270}}
                  />
                  <Drawer.Item
                    label="Notification 2"
                    active={selected === 'second'}
                    onPress={() => setSelected('second')}
                    style={{width:270}}
                  />
                  <Button onPress={() => setActive(false)} style={{ marginTop: 10, backgroundColor: "#7e8052", padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',width:"100" }}>
                    <Text style={{ color: "#fff", marginLeft: 0 }}>Close</Text>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
  },
  drawer: {
    backgroundColor: '#fdf7ef',
    width: '80%',
    height: '100%',
    padding: 16,
    elevation: 10,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
  },
});

export default Notification;