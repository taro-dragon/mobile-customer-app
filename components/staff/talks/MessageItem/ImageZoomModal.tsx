import React, { useRef } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { X, Download } from "lucide-react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

interface ImageZoomModalProps {
  visible: boolean;
  onRequestClose: () => void;
  imageUrl: string;
  onDownload: () => void;
  isDownloading: boolean;
  downloadProgress: number;
  colors: any;
}

const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  visible,
  onRequestClose,
  imageUrl,
  onDownload,
  isDownloading,
  downloadProgress,
  colors,
}) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const lastTap = useRef(0);
  const lastTapPosition = useRef({ x: 0, y: 0 });

  const resetZoom = () => {
    scale.value = withSpring(1);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  const zoomToPosition = (x: number, y: number) => {
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    // ズーム倍率を設定（2倍にズーム）
    const zoomScale = 2.0;

    // タップ位置を中心にズームするための計算
    // タップ位置から画面中心までの距離を計算し、ズーム時にその位置が中心になるように調整
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;

    // タップ位置から中心までの距離
    const deltaX = x - centerX;
    const deltaY = y - centerY;

    // ズーム時にタップした位置が中心になるように移動量を計算
    const newTranslateX = -deltaX * (zoomScale - 1);
    const newTranslateY = -deltaY * (zoomScale - 1);

    scale.value = withSpring(zoomScale);
    translateX.value = withSpring(newTranslateX);
    translateY.value = withSpring(newTranslateY);
  };

  const pinchGestureHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onStart: (_, context: any) => {
        context.startScale = scale.value;
      },
      onActive: (event, context: any) => {
        const newScale = context.startScale * event.scale;
        scale.value = Math.max(0.5, Math.min(3.0, newScale));
      },
      onEnd: () => {
        if (scale.value < 1) {
          scale.value = withSpring(1);
        }
      },
    });

  const panGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, context: any) => {
        context.startX = translateX.value;
        context.startY = translateY.value;
      },
      onActive: (event, context: any) => {
        if (scale.value > 1) {
          translateX.value = context.startX + event.translationX;
          translateY.value = context.startY + event.translationY;
        }
      },
      onEnd: () => {
        // ズームが1以下になった場合は中央に戻す
        if (scale.value <= 1) {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }
      },
    });

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const handleModalImagePress = (event: any) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    // タップ位置を取得
    const { locationX, locationY } = event.nativeEvent;
    lastTapPosition.current = { x: locationX, y: locationY };

    if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
      // ダブルタップの場合
      if (scale.value > 1) {
        // 既にズームしている場合はリセット
        resetZoom();
      } else {
        // ズームしていない場合はタップした位置にズーム
        zoomToPosition(locationX, locationY);
      }
      lastTap.current = 0;
    } else {
      // シングルタップの場合
      lastTap.current = now;
      setTimeout(() => {
        if (lastTap.current === now) {
          // シングルタップの場合はモーダルを閉じる
          resetZoom();
          onRequestClose();
          lastTap.current = 0;
        }
      }, DOUBLE_TAP_DELAY);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={handleModalImagePress}
        >
          <X size={24} color={colors.white} />
        </TouchableOpacity>
        <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
          <Animated.View>
            <PanGestureHandler onGestureEvent={panGestureHandler}>
              <Animated.View>
                <TouchableOpacity
                  style={styles.modalImageContainer}
                  onPress={handleModalImagePress}
                  activeOpacity={1}
                >
                  <Animated.View style={animatedImageStyle}>
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.modalImage}
                      contentFit="contain"
                    />
                  </Animated.View>
                </TouchableOpacity>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </PinchGestureHandler>
        <TouchableOpacity
          style={[
            styles.modalDownloadButton,
            { backgroundColor: colors.primary },
            isDownloading && { opacity: 0.7 },
          ]}
          onPress={onDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <Text style={[styles.modalDownloadText, { color: colors.white }]}>
              {Math.round(downloadProgress)}%
            </Text>
          ) : (
            <Download size={20} color={colors.white} />
          )}
        </TouchableOpacity>
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
  modalImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  modalImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
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

export default ImageZoomModal;
