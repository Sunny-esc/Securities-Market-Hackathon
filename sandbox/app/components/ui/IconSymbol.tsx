import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface TabBarIconProps {
  name: string;
  color: string;
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return '🏠';
      case 'chart-bar':
        return '📊';
      case 'chat-bubble':
        return '💬';
      case 'user':
        return '👤';
      default:
        return '📱';
    }
  };

  return (
    <Text style={[styles.icon, { color }]}>
      {getIcon(name)}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
  },
});
