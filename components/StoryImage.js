// StoryImage.js
import React from "react";
import { Image, StyleSheet } from "react-native";

const StoryImage = ({ source, style }) => (
  <Image source={source} style={[styles.image, style]} />
);

const styles = StyleSheet.create({
  image: {
    marginTop: "0%",
    width: "100%",
    height: "33%",
    resizeMode: "cover",
    marginBottom: 10,
  },
});

export default StoryImage;
