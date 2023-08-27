import React, { useState } from "react";
import { Text, StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import ModalVocab from "./ModalVocab";

const TextDisplayHeb = ({ children, isHebrew }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalWord, setModalWord] = useState("");

  const handlePress = (word) => {
    setModalWord(word);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.adjustedStyle}>
        {children.split(" ").map((child, index) => (
          <Text
            key={index}
            style={styles.word}
            onPress={() => handlePress(child)}
          >
            {child}{" "}
          </Text>
        ))}
      </Text>
      <ModalVocab
        visible={modalVisible}
        word={modalWord}
        onClose={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  adjustedStyle: {
    writingDirection: "rtl",
    textAlign: "center",
    flexDirection: "row",
    fontSize: 18,
    textAlign: "justify",
  },
  word: {
    backgroundColor: "transparent",
  },
});

export default TextDisplayHeb;
