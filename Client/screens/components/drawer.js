import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Menu } from "lucide-react-native";
import React from 'react';
import { Animated, Dimensions, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Drawer } from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
      <Button onPress={() => setActive(true)} style={{ margin: 16 }}>
        <Icon as={Menu} style={{ color: "#fff" }} size={25} />
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
                    label="First Item"
                    active={selected === 'first'}
                    onPress={() => setSelected('first')}
                    style={{width:270}}
                  />
                  <Drawer.Item
                    label="Second Item"
                    active={selected === 'second'}
                    onPress={() => setSelected('second')}
                    style={{width:270}}
                  />
                  <Button onPress={() => setActive(false)} style={{ marginTop: 10,marginLeft: 15, backgroundColor: "#7e8052", padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',width:"100" }}>
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
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
  },
});

export default Draw;