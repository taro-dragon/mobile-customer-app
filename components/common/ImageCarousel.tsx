import { useTheme } from "@/contexts/ThemeContext";
import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { interpolate, useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import Logo from "./Logo";

type ImageCarouselProps = {
  images: string[];
  showPaginationEnabled?: boolean;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  showPaginationEnabled = true,
}) => {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;

  // 各画像のローディング状態を管理
  const [loadingStates, setLoadingStates] = useState<boolean[]>(
    new Array(images.length).fill(true)
  );

  const handleImageLoadStart = (index: number) => {
    setLoadingStates((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  const handleImageLoad = (index: number) => {
    setLoadingStates((prev) => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <>
      {images.length > 0 ? (
        <Carousel
          loop={false}
          ref={ref}
          width={width}
          height={width}
          data={images}
          onProgressChange={progress}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                position: "relative",
              }}
              pointerEvents="auto"
            >
              <Image
                source={{ uri: images[index] }}
                style={{
                  width: width,
                  height: width,
                }}
                contentFit="cover"
                pointerEvents="none"
                onLoadStart={() => handleImageLoadStart(index)}
                onLoad={() => handleImageLoad(index)}
              />
              {loadingStates[index] && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.backgroundPrimary || "#f5f5f5",
                  }}
                >
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: width,
            aspectRatio: 1,
            backgroundColor: colors.backgroundSecondary,
          }}
          pointerEvents="auto"
        >
          <Logo width={width * 0.4} color={colors.textSecondary} />
        </View>
      )}
      {showPaginationEnabled && (
        <Pagination.Custom
          progress={progress}
          data={images}
          dotStyle={{
            backgroundColor: colors.borderPrimary,
            borderRadius: 50,
            width: 8,
            height: 8,
          }}
          activeDotStyle={{
            backgroundColor: colors.primary,
            width: 8,
            height: 8,
          }}
          containerStyle={{ gap: 6, marginTop: 10 }}
          customReanimatedStyle={(progress, index) => {
            "worklet";
            return {
              transform: [
                {
                  scale: interpolate(
                    progress,
                    [index - 1, index, index + 1],
                    [0.8, 1, 0.8]
                  ),
                },
              ],
            };
          }}
        />
      )}
    </>
  );
};

export default ImageCarousel;
