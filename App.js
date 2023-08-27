import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import ActivityIndicatorComponent from "./components/ActivityIndicator";
import StoryImage from "./components/StoryImage";
import PlaybackControls from "./components/PlaybackControls";
import Sidebar from "./layout/SideBar";

import { Audio } from "expo-av";
import TextDisplayRus from "./components/TextDisplayRus";
import TextDisplayHeb from "./components/TextDisplayHeb";

export default function App() {
  const [dailyStory, setDailyStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState();
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://young-gorge-91386-003fa2ea2657.herokuapp.com/datagen/oneForToday"
        );
        const data = response.data;

        if (data) {
          setDailyStory(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (dailyStory && dailyStory.audioUrl) {
      async function loadSound() {
        const { sound } = await Audio.Sound.createAsync({
          uri: dailyStory.audioUrl,
        });
        setSound(sound);

        // Get the duration of the sound and update the state
        const { durationMillis } = await sound.getStatusAsync();
        setDurationMillis(durationMillis);

        // Listen for updates to the playback status
        sound.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
      }
      loadSound();
    }
  }, [dailyStory]);

  const playAudio = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.stopAsync();
      } else {
        await sound.playAsync();
        sound.setRateAsync(playbackRate);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded && !status.isBuffering) {
      setPositionMillis(status.positionMillis);
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.menuIconContainer}>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleSidebar}>
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Sidebar isVisible={isSidebarVisible} />
      {loading ? (
        <ActivityIndicatorComponent size="large" color="#0000ff" />
      ) : (
        dailyStory && (
          <>
            <StoryImage source={{ uri: dailyStory.imageUrl }} />
            <PlaybackControls
              isPlaying={isPlaying}
              onPressPlay={playAudio}
              onPressPause={playAudio}
              onPressSpeed={() =>
                setPlaybackRate(playbackRate === 0.8 ? 1.0 : 0.8)
              }
            />
            <ScrollView>
              <TextDisplayHeb style={styles.hebrewText} isHebrew={true}>
                {dailyStory.hebrewStory}
              </TextDisplayHeb>

              {dailyStory.russianStory && (
                <TextDisplayRus isHebrew={false}>
                  {dailyStory.russianStory}
                </TextDisplayRus>
              )}
            </ScrollView>
          </>
        )
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    width: "100%",
  },
  menuIconContainer: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 999,
  },
  menuIcon: {
    backgroundColor: "red",
    opacity: 0.75,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 20,
    width: "100%",
    height: "33%",
    resizeMode: "cover",
    marginBottom: 10,
  },
  hebrewText: {
    fontSize: 18,
    textAlign: "right",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
    paddingRight: "30%",
  },
  controlButton: {
    padding: 10,
  },
  playButton: {
    backgroundColor: "#000",
    borderRadius: 3,
    padding: 3,
  },
  audioProgress: {
    alignItems: "center",
    marginTop: 10,
  },
  progressText: {
    fontSize: 14,
  },
  russianText: {
    fontSize: 16,
    margin: 10,
    padding: 20,
  },
});
