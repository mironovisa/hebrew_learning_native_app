import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Sidebar = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.sidebar}>
      <Text>Hasd!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "70%", // Adjust the width as needed
    height: "100%",
    backgroundColor: "white", // Sidebar background color
    zIndex: 998,
  },
});

export default Sidebar;
