import React from "react";
import Svg, { Path } from "react-native-svg";
import { siAudi } from "simple-icons";
type LogoProps = {
  size: number;
  color?: string;
};

const AudiLogo: React.FC<LogoProps> = ({ size, color = "#000" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={siAudi.path} fill={color} />
    </Svg>
  );
};

export default AudiLogo;
