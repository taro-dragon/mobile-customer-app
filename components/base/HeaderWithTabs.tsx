import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ViewStyle,
  StyleProp,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

interface Route {
  key: string;
  title: string;
}

interface HeaderWithTabsProps {
  // ヘッダーコンポーネント
  headerComponent: React.ReactNode;
  // タブのルート設定
  routes: Route[];
  // タブのシーンマップ
  renderScene: (props: any) => React.ReactNode;
  // 初期タブインデックス
  initialIndex?: number;
  // タブ変更時のコールバック
  onTabChange?: (index: number) => void;
  // ヘッダーの高さ
  headerHeight?: number;
  // タブの高さ
  tabHeight?: number;
  // スクロール時のコールバック
  onScroll?: (event: any) => void;
  // コンテナのスタイル
  containerStyle?: StyleProp<ViewStyle>;
  // ヘッダーのスタイル
  headerStyle?: StyleProp<ViewStyle>;
  // タブのスタイル
  tabStyle?: StyleProp<ViewStyle>;
  // スクロールビューのスタイル
  scrollViewStyle?: StyleProp<ViewStyle>;
  // タブバーのスタイル
  tabBarStyle?: StyleProp<ViewStyle>;
  // タブのラベルスタイル
  labelStyle?: StyleProp<ViewStyle>;
  // インジケーターのスタイル
  indicatorStyle?: StyleProp<ViewStyle>;
}

const DEFAULT_HEADER_HEIGHT = 300;
const DEFAULT_TAB_HEIGHT = 50;

const HeaderWithTabs: React.FC<HeaderWithTabsProps> = ({
  headerComponent,
  routes,
  renderScene,
  initialIndex = 0,
  onTabChange,
  headerHeight = DEFAULT_HEADER_HEIGHT,
  tabHeight = DEFAULT_TAB_HEIGHT,
  onScroll,
  containerStyle,
  headerStyle,
  tabStyle,
  scrollViewStyle,
  tabBarStyle,
  labelStyle,
  indicatorStyle,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(initialIndex);

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: "clamp",
  });

  const handleTabChange = (newIndex: number) => {
    setIndex(newIndex);
    onTabChange?.(newIndex);
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={[styles.tabBar, tabBarStyle]}
      labelStyle={[styles.label, labelStyle]}
      indicatorStyle={[styles.indicator, indicatorStyle]}
      activeColor="#000"
      inactiveColor="#666"
      scrollEnabled={true}
    />
  );

  const renderSceneWithScroll = (props: any) => {
    const scene = renderScene(props);
    return (
      <Animated.ScrollView
        style={[styles.sceneScrollView, scrollViewStyle]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener: onScroll,
          }
        )}
        scrollEventThrottle={16}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: headerHeight }} />
        {scene}
      </Animated.ScrollView>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[
          styles.headerContainer,
          { height: headerHeight },
          headerStyle,
          {
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        {headerComponent}
      </Animated.View>

      <View style={[styles.tabContainer, { top: headerHeight }, tabStyle]}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderSceneWithScroll}
          onIndexChange={handleTabChange}
          initialLayout={{ width: Dimensions.get("window").width }}
          renderTabBar={renderTabBar}
          style={styles.tabView}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  tabContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    zIndex: 2,
  },
  tabView: {
    flex: 1,
  },
  sceneScrollView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#fff",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  label: {
    fontWeight: "600",
    textTransform: "none",
  },
  indicator: {
    backgroundColor: "#000",
    height: 1,
  },
});

export default HeaderWithTabs;
