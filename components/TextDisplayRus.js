import React from "react";
import { Text, StyleSheet, View } from "react-native";

const TextDisplayRus = ({ children }) => (
  <View style={styles.textContainer}>
    <Text style={[styles.russianText]}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  textContainer: {
    position: "relative",
  },
  russianText: {
    // fontFamily: "NotoSansCyrillic-Regular",
    fontSize: 16, // Adjust font size for Russian
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
    textAlign: "justify", // Justify text to width
    lineHeight: 24, // Adjust line height for better readability
  },
});

export default TextDisplayRus;
