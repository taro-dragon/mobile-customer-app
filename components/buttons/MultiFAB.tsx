import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
  Text,
} from "react-native";
import * as LucideIcons from "lucide-react-native";

import { useTheme } from "@/contexts/ThemeContext";

type MenuItem = {
  icon: keyof typeof LucideIcons;
  onPress: () => void;
  label?: string;
};

type MultiFABProps = {
  items: MenuItem[];
  opacity?: number;
  color?: string;
  mainIcon?: keyof typeof LucideIcons;
};

const MultiFAB: React.FC<MultiFABProps> = ({
  items,
  opacity = 1,
  color,
  mainIcon = "Plus",
}) => {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  // 単一メニューの場合は既存のFABと同じ動作
  if (items.length === 1) {
    const item = items[0];
    const IconComponent = LucideIcons[
      item.icon as keyof typeof LucideIcons
    ] as React.ComponentType<any>;

    return (
      <TouchableOpacity
        style={[
          styles.fab,
          {
            opacity,
            backgroundColor: color || colors.primary,
            shadowColor: colors.shadow,
          },
        ]}
        onPress={item.onPress}
      >
        <IconComponent size={28} color={colors.white} />
      </TouchableOpacity>
    );
  }

  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);

    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    const IconComponent = LucideIcons[
      item.icon as keyof typeof LucideIcons
    ] as React.ComponentType<any>;

    return (
      <Animated.View
        key={index}
        style={[
          styles.menuItem,
          {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -(index + 1) * 60],
                }),
              },
            ],
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.menuButton,
            {
              backgroundColor: color || colors.primary,
              shadowColor: colors.shadow,
            },
          ]}
          onPress={() => {
            item.onPress();
            toggleMenu();
          }}
        >
          <IconComponent size={24} color={colors.white} />
        </TouchableOpacity>
        {item.label && (
          <View style={styles.labelContainer}>
            <View
              style={[
                styles.label,
                { backgroundColor: colors.backgroundPrimary },
              ]}
            >
              <Text style={[styles.labelText, { color: colors.textPrimary }]}>
                {item.label}
              </Text>
            </View>
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* メニューアイテム */}
      {items.map((item, index) => renderMenuItem(item, index))}

      {/* メインボタン */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            opacity,
            backgroundColor: color || colors.primary,
          },
        ]}
        onPress={toggleMenu}
      >
        <Animated.View
          style={{
            transform: [
              {
                rotate: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "0deg"],
                }),
              },
            ],
          }}
        >
          {isExpanded ? (
            <LucideIcons.X size={28} color={colors.white} />
          ) : (
            React.createElement(
              LucideIcons[mainIcon] as React.ComponentType<any>,
              {
                size: 28,
                color: colors.white,
              }
            )
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 12,
    right: 12,
    zIndex: 1000,
  },
  fab: {
    borderRadius: 100,
    padding: 12,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  menuButton: {
    borderRadius: 100,
    padding: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  labelContainer: {
    position: "absolute",
    right: 60,
    top: 12,
    justifyContent: "center",
    alignItems: "flex-end",
    minWidth: 100,
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  labelText: {
    fontSize: 12,
    fontWeight: "500",

    textAlign: "center",
  },
});

export default MultiFAB;
