import { FC } from "react";
import Svg, { Polyline } from "react-native-svg";

type LogoProps = {
  width?: number;
  color?: string;
};

const Logo: FC<LogoProps> = ({ width = 606.9, color = "#000" }) => {
  const height = (width / 606.9) * 515.85;
  return (
    <Svg viewBox="0 0 606.9 515.85" width={width} height={height}>
      <Polyline
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={38}
        points="303.55 83.37 574.36 200.33 587.9 142.91 303.55 19 19 144.7 32.12 204.08 97.48 172.89 97.48 432.07 281.61 432.07 281.61 496.85 329.29 496.85 329.29 432.07 533.01 432.07 533.01 281.59"
      />
    </Svg>
  );
};

export default Logo;
