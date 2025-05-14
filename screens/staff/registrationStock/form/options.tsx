import { ScrollView, Text, View } from "react-native";
import OptionItem from "@/components/form/optionItem";
import { useTheme } from "@/contexts/ThemeContext";
import ModalPicker from "@/components/registrationCar/form/ModalPicker";
import {
  carNaviOptions,
  cruiseControlOptions,
  slideDoorOptions,
  tvMonitorOptions,
} from "@/constants/registrationStockOptions";

const RegistrationStockOptionsFormScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <OptionItem name="airConditioner" label="エアコン" />
      <OptionItem name="powerSteering" label="パワーステアリング" />
      <OptionItem name="powerWindow" label="パワーウィンドウ" />
      <OptionItem name="driverAirbag" label="運転席エアバッグ" />
      <OptionItem name="passengerAirbag" label="助手席エアバッグ" />
      <OptionItem name="sideAirbag" label="サイドエアバッグ" />
      <OptionItem name="abs" label="ABS" />
      <OptionItem name="esc" label="ESC" />
      <View style={{ height: 12 }} />
      <OptionItem name="etc" label="ETC" />
      <OptionItem name="theftPreventionSystem" label="盗難防止システム" />
      <OptionItem name="collisionSafetyBody" label="衝突安全ボディ" />
      <OptionItem
        name="collisionDamageReductionSystem"
        label="衝突被害軽減システム"
      />
      <OptionItem name="keylessEntry" label="キーレスエントリー" />
      <OptionItem name="smartKey" label="スマートキー" />
      <OptionItem name="fourWheelDrive" label="4WD" />
      <OptionItem name="idlingStop" label="アイドリングストップ" />
      <View style={{ height: 12 }} />
      <OptionItem name="recordBook" label="記録簿" />
      <OptionItem name="nonSmokingCar" label="禁煙車" />
      <OptionItem name="registeredUsedCar" label="登録済み未使用車" />
      <OptionItem name="rentalCar" label="レンタカーアップ" />
      <OptionItem name="exhibitionTestDriveCar" label="展示・試乗車" />
      <OptionItem name="ecoCarTaxCar" label="エコカー減税対象車" />
      <OptionItem name="oneOwnerCar" label="ワンオーナー" />
      <OptionItem name="campingCar" label="キャンピングカー" />
      <OptionItem name="welfareCar" label="福祉車両" />
      <ModalPicker
        name="cruiseControl"
        label="クルーズコントロール"
        options={cruiseControlOptions}
        required={true}
      />
      <ModalPicker
        name="slideDoor"
        label="スライドドア"
        options={slideDoorOptions}
        required={true}
      />
      <OptionItem name="electricRearGate" label="電動リアゲート" />
      <OptionItem name="electricMirror" label="電動格納ミラー" />
      <OptionItem name="laneAssist" label="レーンアシスト" />
      <OptionItem name="parkingAssist" label="パークアシスト" />
      <OptionItem name="autoParking" label="自動駐車システム" />
      <OptionItem name="clearanceSonar" label="クリアランスソナー" />
      <OptionItem
        name="neckImpactReductionHeadrest"
        label="頸部衝撃緩和ヘッドレスト"
      />
      <OptionItem
        name="downhillAssistControl"
        label="ダウンヒルアシストコントロール"
      />
      <OptionItem name="ledHeadlamp" label="LEDヘッドランプ" />
      <OptionItem name="hid" label="HID" />
      <OptionItem name="autoLight" label="オートライト" />
      <OptionItem name="autoHighBeam" label="オートマチックハイビーム" />
      <OptionItem name="headlightWasher" label="ヘッドライトウォッシャー" />
      <OptionItem name="sunroof" label="サンルーフ" />
      <OptionItem name="aero" label="エアロ" />
      <OptionItem name="roofRails" label="ルーフレール" />
      <OptionItem name="coldAreaSpecification" label="寒冷地仕様" />
      <OptionItem name="runFlatTire" label="ランフラットタイヤ" />
      <OptionItem name="airSuspension" label="エアサスペンション" />
      <OptionItem name="centerDifferentialLock" label="センターデフロック" />
      <OptionItem name="turbo" label="ターボ" />
      <OptionItem name="superCharger" label="スーパーチャージャー" />
      <OptionItem name="lowDown" label="ローダウン" />
      <OptionItem name="liftUp" label="リフトアップ" />
      <OptionItem name="100v" label="100V電源" />
      <View style={{ height: 12 }} />
      <OptionItem name="leatherSeat" label="革シート" />
      <OptionItem name="halfLeatherSeat" label="ハーフレザーシート" />
      <OptionItem name="powerSeat" label="パワーシート" />
      <OptionItem name="ottoman" label="オットマン" />
      <OptionItem name="chipSeat" label="チップアップシート" />
      <OptionItem name="electricThirdSeat" label="電動格納サードシート" />
      <OptionItem name="benchSeat" label="ベンチシート" />
      <OptionItem name="threeRowSeat" label="3列シート" />
      <OptionItem name="fullFlatSeat" label="フルフラットシート" />
      <OptionItem name="walkThrough" label="ウォークスルー" />
      <OptionItem name="seatHeater" label="シートヒーター" />
      <OptionItem name="seatAirConditioner" label="シートエアコン" />
      <ModalPicker
        name="carNavi"
        label="カーナビ"
        options={carNaviOptions}
        required={true}
      />
      <ModalPicker
        name="tvMonitor"
        label="TVモニタ"
        options={tvMonitorOptions}
        required={true}
      />
      <OptionItem name="cd" label="CD" />
      <OptionItem name="dvd" label="DVD再生" />
      <OptionItem name="blueRay" label="ブルーレイ再生" />
      <OptionItem name="md" label="MD" />
      <OptionItem name="cassette" label="カセット" />
      <OptionItem name="musicServer" label="ミュージックサーバ" />
      <OptionItem name="musicPlayer" label="ミュージックプレイヤー接続可" />
      <OptionItem name="usb" label="USB入力端子" />
      <OptionItem name="bluetooth" label="Bluetooth接続" />
      <OptionItem name="driveRecorder" label="ドライブレコーダー" />
      <OptionItem name="frontCamera" label="フロントカメラ" />
      <OptionItem name="sideCamera" label="サイドカメラ" />
      <OptionItem name="backCamera" label="バックカメラ" />
      <OptionItem name="allAroundCamera" label="全周囲カメラ" />
      <OptionItem name="backSeatMonitor" label="後席モニタ" />
    </ScrollView>
  );
};

export default RegistrationStockOptionsFormScreen;
