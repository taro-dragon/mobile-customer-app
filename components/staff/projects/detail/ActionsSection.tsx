import { ExtendedProject } from "@/hooks/staff/projects/useFetchProject";
import React from "react";
import { View } from "react-native";

type ActionsSectionProps = {
  project: ExtendedProject;
};

const ActionsSection: React.FC<ActionsSectionProps> = ({ project }) => {
  return <View></View>;
};

export default ActionsSection;
