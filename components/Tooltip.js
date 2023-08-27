import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Tooltip = ({ word }) => {
  return (
    <View style={styles.tooltip}>
      <Text style={styles.tooltipText}>{word}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 5,
    borderRadius: 5,
  },
  tooltipText: {
    color: "white",
  },
});

export default Tooltip;
