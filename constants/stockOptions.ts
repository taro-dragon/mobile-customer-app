import {
  carNaviOptions,
  cruiseControlOptions,
  slideDoorOptions,
  tvMonitorOptions,
} from "./registrationStockOptions";

export const categoryLabels = {
  basic: "基本装備",
  safety: "安全装備",
  carInfo: "車両情報",
  features: "機能",
  exterior: "外装",
  performance: "性能",
  interior: "内装",
  entertainment: "エンターテイメント",
  cameras: "カメラ",
};

export const options = {
  basic: [
    { name: "airConditioner", label: "エアコン" },
    { name: "powerSteering", label: "パワーステアリング" },
    { name: "powerWindow", label: "パワーウィンドウ" },
    { name: "driverAirbag", label: "運転席エアバッグ" },
    { name: "passengerAirbag", label: "助手席エアバッグ" },
    { name: "sideAirbag", label: "サイドエアバッグ" },
    { name: "abs", label: "ABS" },
    { name: "esc", label: "ESC" },
  ],
  safety: [
    { name: "etc", label: "ETC" },
    { name: "theftPreventionSystem", label: "盗難防止システム" },
    { name: "collisionSafetyBody", label: "衝突安全ボディ" },
    { name: "collisionDamageReductionSystem", label: "衝突被害軽減システム" },
    { name: "keylessEntry", label: "キーレスエントリー" },
    { name: "smartKey", label: "スマートキー" },
    { name: "fourWheelDrive", label: "4WD" },
    { name: "idlingStop", label: "アイドリングストップ" },
  ],
  carInfo: [
    { name: "recordBook", label: "記録簿" },
    { name: "nonSmokingCar", label: "禁煙車" },
    { name: "registeredUsedCar", label: "登録済み未使用車" },
    { name: "rentalCar", label: "レンタカーアップ" },
    { name: "exhibitionTestDriveCar", label: "展示・試乗車" },
    { name: "ecoCarTaxCar", label: "エコカー減税対象車" },
    { name: "oneOwnerCar", label: "ワンオーナー" },
    { name: "campingCar", label: "キャンピングカー" },
    { name: "welfareCar", label: "福祉車両" },
  ],
  features: [
    { name: "electricRearGate", label: "電動リアゲート" },
    { name: "electricMirror", label: "電動格納ミラー" },
    { name: "laneAssist", label: "レーンアシスト" },
    { name: "parkingAssist", label: "パークアシスト" },
    { name: "autoParking", label: "自動駐車システム" },
    { name: "clearanceSonar", label: "クリアランスソナー" },
    { name: "neckImpactReductionHeadrest", label: "頸部衝撃緩和ヘッドレスト" },
    { name: "downhillAssistControl", label: "ダウンヒルアシストコントロール" },
  ],
  exterior: [
    { name: "ledHeadlamp", label: "LEDヘッドランプ" },
    { name: "hid", label: "HID" },
    { name: "autoLight", label: "オートライト" },
    { name: "autoHighBeam", label: "オートマチックハイビーム" },
    { name: "headlightWasher", label: "ヘッドライトウォッシャー" },
    { name: "sunroof", label: "サンルーフ" },
    { name: "aero", label: "エアロ" },
    { name: "roofRails", label: "ルーフレール" },
  ],
  performance: [
    { name: "coldAreaSpecification", label: "寒冷地仕様" },
    { name: "runFlatTire", label: "ランフラットタイヤ" },
    { name: "airSuspension", label: "エアサスペンション" },
    { name: "centerDifferentialLock", label: "センターデフロック" },
    { name: "turbo", label: "ターボ" },
    { name: "superCharger", label: "スーパーチャージャー" },
    { name: "lowDown", label: "ローダウン" },
    { name: "liftUp", label: "リフトアップ" },
    { name: "100v", label: "100V電源" },
  ],
  interior: [
    { name: "leatherSeat", label: "革シート" },
    { name: "halfLeatherSeat", label: "ハーフレザーシート" },
    { name: "powerSeat", label: "パワーシート" },
    { name: "ottoman", label: "オットマン" },
    { name: "chipSeat", label: "チップアップシート" },
    { name: "electricThirdSeat", label: "電動格納サードシート" },
    { name: "benchSeat", label: "ベンチシート" },
    { name: "threeRowSeat", label: "3列シート" },
    { name: "fullFlatSeat", label: "フルフラットシート" },
    { name: "walkThrough", label: "ウォークスルー" },
    { name: "seatHeater", label: "シートヒーター" },
    { name: "seatAirConditioner", label: "シートエアコン" },
  ],
  entertainment: [
    { name: "cd", label: "CD" },
    { name: "dvd", label: "DVD再生" },
    { name: "blueRay", label: "ブルーレイ再生" },
    { name: "md", label: "MD" },
    { name: "cassette", label: "カセット" },
    { name: "musicServer", label: "ミュージックサーバ" },
    { name: "musicPlayer", label: "ミュージックプレイヤー接続可" },
    { name: "usb", label: "USB入力端子" },
    { name: "bluetooth", label: "Bluetooth接続" },
  ],
  cameras: [
    { name: "driveRecorder", label: "ドライブレコーダー" },
    { name: "frontCamera", label: "フロントカメラ" },
    { name: "sideCamera", label: "サイドカメラ" },
    { name: "backCamera", label: "バックカメラ" },
    { name: "allAroundCamera", label: "全周囲カメラ" },
    { name: "backSeatMonitor", label: "後席モニタ" },
  ],
};

export const modalPickers = [
  {
    name: "cruiseControl",
    label: "クルーズコントロール",
    options: cruiseControlOptions,
    required: true,
  },
  {
    name: "slideDoor",
    label: "スライドドア",
    options: slideDoorOptions,
    required: true,
  },
  {
    name: "carNavi",
    label: "カーナビ",
    options: carNaviOptions,
    required: true,
  },
  {
    name: "tvMonitor",
    label: "TVモニタ",
    options: tvMonitorOptions,
    required: true,
  },
];
