import React from "react";
import Svg, { Path } from "react-native-svg";
import { siToyota } from "simple-icons";
type LogoProps = {
  size: number;
  color?: string;
};

const ToyotaLogo: React.FC<LogoProps> = ({ size, color = "#000" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={siToyota.path} fill={color} />
    </Svg>
  );
};

export default ToyotaLogo;
