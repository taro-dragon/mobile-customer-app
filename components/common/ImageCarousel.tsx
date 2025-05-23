import { useTheme } from "@/contexts/ThemeContext";
import { Image } from "expo-image";
import React, { useRef } from "react";
import { Dimensions, View } from "react-native";
import { interpolate, useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

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
  return (
    <>
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
              borderWidth: 1,
              justifyContent: "center",
            }}
            pointerEvents="auto"
          >
            <Image
              source={{ uri: images[index] }}
              style={{ width: width, height: width }}
              contentFit="cover"
              pointerEvents="none"
            />
          </View>
        )}
      />
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
