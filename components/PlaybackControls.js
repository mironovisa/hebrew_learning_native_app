// PlaybackControls.js
import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PlaybackControls = ({
  isPlaying,
  onPressPlay,
  onPressPause,
  onPressSpeed,
}) => (
  <View style={styles.controlsContainer}>
    <Text style={styles.headerText}>Воспроизвести текст на иврите</Text>
    <View style={styles.controls}>
      <TouchableOpacity style={styles.controlButton} onPress={onPressSpeed}>
        <Text style={styles.controlText}>Медленнее</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={isPlaying ? onPressPause : onPressPlay}
        style={styles.playButton}
      >
        <Ionicons
          name={isPlaying ? "ios-pause" : "ios-play"}
          size={36}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={onPressSpeed}>
        <Text style={styles.controlText}>Обычная скорость</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  controlsContainer: {
    alignItems: "center", // Center horizontally
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    paddingRight: "10%",
    paddingLeft: "10%",
  },
  controlButton: {
    padding: 10,
  },
  playButton: {
    backgroundColor: "#000",
    borderRadius: 1,
    padding: 3,
  },
  controlText: {
    fontSize: 14,
  },
});

export default PlaybackControls;
