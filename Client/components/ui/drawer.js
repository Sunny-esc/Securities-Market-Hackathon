import React from "react";
import { Modal, View } from "react-native";
export function Drawer({ open, onClose, children }) {
  return (
    <Modal visible={open} animationType="slide" onRequestClose={onClose} transparent>
      <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>{children}</View>
    </Modal>
  );
}
export function DrawerBackdrop() { return null; }
export function DrawerContent({ children, style }) { return <View style={style}>{children}</View>; }
export function DrawerHeader({ children }) { return <View>{children}</View>; }
export function DrawerBody({ children }) { return <View>{children}</View>; }
export function DrawerFooter({ children }) { return <View>{children}</View>; }