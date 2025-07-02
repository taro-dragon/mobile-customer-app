import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { Slider } from "@miblanchard/react-native-slider";

interface VideoZoomModalProps {
  visible: boolean;
  onRequestClose: () => void;
  videoUrl: string;
  onDownload: () => void;
  isDownloading: boolean;
  downloadProgress: number;
  colors: any;
}

const VideoZoomModal: React.FC<VideoZoomModalProps> = ({
  visible,
  onRequestClose,
  videoUrl,
  colors,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);
  const [wasPlayingBeforeSeek, setWasPlayingBeforeSeek] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const videoRef = useRef<Video>(null);

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const handleMuteToggle = async () => {
    if (videoRef.current) {
      await videoRef.current.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setDuration(status.durationMillis || 0);
      if (!isSeeking) {
        setPosition(status.positionMillis || 0);
        setSeekPosition(status.positionMillis || 0);
      }
      setIsBuffering(status.isBuffering);
      if (status.didJustFinish) {
        setIsPlaying(false);
        videoRef.current?.setPositionAsync(0);
      }
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pauseAsync();
    }
    setIsPlaying(false);
    onRequestClose();
  };

  const handleSeekStart = () => {
    setWasPlayingBeforeSeek(isPlaying);
    setIsSeeking(true);
    if (isPlaying && videoRef.current) {
      videoRef.current.pauseAsync();
    }
  };

  const handleSeekChange = (value: number[]) => {
    setSeekPosition(value[0]);
  };

  const handleSeekComplete = async (value: number[]) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(value[0]);
      setPosition(value[0]);
      setSeekPosition(value[0]);
      setIsSeeking(false);
      if (wasPlayingBeforeSeek) {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalCloseButton} onPress={handleClose}>
          <X size={24} color={colors.white} />
        </TouchableOpacity>

        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: videoUrl }}
            style={styles.video}
            useNativeControls={false}
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            isMuted={isMuted}
            shouldPlay={isPlaying}
          />

          <View style={styles.videoControls}>
            {isBuffering && (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={styles.bufferingIndicator}
              />
            )}
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePlayPause}
              activeOpacity={0.8}
              disabled={isBuffering}
            >
              {isPlaying ? (
                <Pause size={32} color={colors.white} />
              ) : (
                <Play size={32} color={colors.white} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.muteButton}
            onPress={handleMuteToggle}
            activeOpacity={0.8}
          >
            {isMuted ? (
              <VolumeX size={20} color={colors.white} />
            ) : (
              <Volume2 size={20} color={colors.white} />
            )}
          </TouchableOpacity>

          {duration > 0 && (
            <View style={styles.controlsOverlay}>
              <View style={styles.seekBarContainer}>
                <Slider
                  value={seekPosition}
                  minimumValue={0}
                  maximumValue={duration}
                  onSlidingStart={handleSeekStart}
                  onValueChange={handleSeekChange}
                  onSlidingComplete={handleSeekComplete}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                  thumbStyle={styles.seekBarThumb}
                  trackStyle={styles.seekBarTrack}
                  thumbTouchSize={{ width: 32, height: 32 }}
                />
              </View>
              <View style={styles.timeContainer}>
                <Text style={[styles.timeText, { color: colors.white }]}>
                  {formatTime(isSeeking ? seekPosition : position)}
                </Text>
                <Text style={[styles.timeText, { color: colors.white }]}>
                  {formatTime(duration)}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
  },
  videoControls: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  bufferingIndicator: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 2,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  muteButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  timeOverlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  controlsOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  seekBarContainer: {
    marginBottom: 10,
  },
  seekBarThumb: {
    backgroundColor: "#fff",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  seekBarTrack: {
    height: 4,
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  modalDownloadButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalDownloadText: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default VideoZoomModal;
