const dayjs = require("dayjs");
const ja = require("dayjs/locale/ja");
dayjs.locale(ja);

const commonConfig = {
  expo: {
    name: "mobile-customer-app",
    slug: "mobile-customer-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      package: "com.mobile_car_app.ai_car_price",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-firebase/app",
      "expo-router",
      "expo-dev-client",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "b7dfbe57-77ef-43e8-ba19-630899ff12c8",
      },
    },
  },
};

const config = () => {
  if (process.env.APP_ENV === "production") {
    commonConfig.expo.name = "Mobile AI 査定";
    commonConfig.expo.version = "1.0.0";
    commonConfig.expo.ios.bundleIdenifier = "com.mobile-car-app.ai-car-price";
    commonConfig.expo.ios.googleServicesFile =
      process.env.GOOGLE_SERVICES_PLIST || "./GoogleService-Info.plist";
  } else if (process.env.APP_ENV === "preview") {
    commonConfig.expo.name = "Mobile AI 査定";
    commonConfig.expo.ios.bundleIdentifier =
      "com.mobile-car-app.ai-car-price.stg";
    commonConfig.expo.ios.googleServicesFile = "./GoogleService-Info-dev.plist";
    commonConfig.expo.android.package = "com.mobile_car_app.ai_car_price.stg";
    commonConfig.expo.android.googleServicesFile = "./google-services-dev.json";
  } else {
    commonConfig.expo.name = "Mobile AI 査定 開発";
    commonConfig.expo.ios.bundleIdentifier =
      "com.mobile-car-app.ai-car-price.dev";
    commonConfig.expo.ios.googleServicesFile =
      process.env.GOOGLE_SERVICES_PLIST || "./GoogleService-Info.plist";
    commonConfig.expo.android.package = "com.mobile_car_app.ai_car_price.dev";
    commonConfig.expo.android.googleServicesFile = "./google-services.json";
  }
  return commonConfig;
};

module.exports = {
  ...config(),
};
