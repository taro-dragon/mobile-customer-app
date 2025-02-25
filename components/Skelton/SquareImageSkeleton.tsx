import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

interface SquareImageSkeletonProps {
  size?: number;
}

const SquareImageSkeleton: React.FC<SquareImageSkeletonProps> = ({
  size = 100,
}) => {
  const { colors } = useTheme();
  return (
    <ContentLoader
      animate
      speed={2}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      backgroundColor={colors.backgroundSecondary}
      foregroundColor={colors.backgroundTertiary}
    >
      <Rect x="0" y="0" width={size} height={size} />
    </ContentLoader>
  );
};

export default SquareImageSkeleton;
