import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  LogOut,
  MenuIcon,
  NetworkIcon,
  SaveIcon,
  SettingsIcon,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

export default function Menu() {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <Button onPress={() => setShowDrawer(true)} style={{ margin: 16 }}>
        <Icon as={MenuIcon} style={{color:"#fff"}} size={25} />
      </Button>
      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        placement="right"
      >
        <DrawerBackdrop />
        <DrawerContent
          style={{
            backgroundColor: "#fdf7ef",
            flex: 1,
            margin: 0,
            padding: 0,
          }}
        >
          <DrawerHeader>
            <Avatar>
              <AvatarFallbackText>User Image</AvatarFallbackText>
              <AvatarImage
                source={{
                  URL: "./assets/images/icon.png",
                }}
              />
            </Avatar>
            <VStack>
              <Text size="lg">Mr jisko trading ni aati</Text>
              <Text size="sm">abc@gmail.com</Text>
            </VStack>
          </DrawerHeader>
          <Divider />
          <DrawerBody>
            <Pressable style={{ marginBottom: 16 }}>
              <Icon as={User} />
              <Text>My Profile</Text>
            </Pressable>
            <Pressable style={{ marginBottom: 16 }}>
              <Icon as={SettingsIcon} />
              <Text>Settings</Text>
            </Pressable>
            <Pressable style={{ marginBottom: 16 }}>
              <Icon as={SaveIcon} />
              <Text>Saved</Text>
            </Pressable>
            <Pressable style={{ marginBottom: 16 }}>
              <Icon as={NetworkIcon} />
              <Text>About Us</Text>
            </Pressable>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              action="secondary"
              style={styles.tabContainer}
            >
              <ButtonIcon as={LogOut} />
              <Text size={"lg"}>Logout</Text>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    bottom: -470,
  },
});
