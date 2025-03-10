import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type StockCar = {
  id: string;
  maker: string; // メーカー
  model: string; // 車種
  grade: string; // グレード
  modelCode: string; // 型式
  year: number; // 年式
  mileage: number; // 走行距離(km)
  price: number; // 価格
  taxIncluded: boolean; // 税込価格かどうか
  totalPrice: number; // 支払総額
  monthlyPayment: number; // 月々のローン目安

  loan: {
    available: boolean; // ローン可能かどうか
    type: string; // ローン種類（通常ローン、残価・据置ローン）
    downPayment: number; // 頭金
  };

  vehicleType: string; // 車のタイプ（国産車、輸入車、軽自動車など）
  bodyType: string; // ボディタイプ (SUV、セダン、軽自動車など)
  color: {
    code: string; // 色コード
    name: string; // 色名
    type: string; // 色系統（ホワイト系、ブラック系など）
  };
  interiorColor: string; // 内装色
  fuelType: string; // 燃料タイプ (ガソリン、ディーゼル、ハイブリッド、電気など)
  fuelEfficiency: number; // 燃費(km/L)
  transmission: string; // トランスミッション (AT/CVT、MT)
  driveType: string; // 駆動方式 (2WD、4WD)
  engineSize: number; // 排気量(cc)
  hasTurbo: boolean; // 過給器設定モデル（ターボ・スーパーチャージャーなど）
  doors: number; // ドア数
  seats: number; // 乗車定員
  steering: string; // ハンドル位置（右、左）
  importType: string; // 輸入区分（正規/並行/国産）

  condition: string; // 状態 (優良、良、可など)
  conditionScore: number; // 状態スコア (1-10)
  repairHistory: boolean; // 修復歴
  accidentHistory: boolean; // 事故歴
  nonSmoking: boolean; // 禁煙車
  oneOwner: boolean; // ワンオーナー
  inspectionRemaining: number; // 車検残月数
  inspectionDate: FirebaseFirestoreTypes.Timestamp; // 車検日
  registrationType: string; // 登録区分（未登録車、登録済未使用車など）
  hasMaintenance: boolean; // 定期点検記録簿
  isDemo: boolean; // 展示・試乗車
  isRentalCar: boolean; // レンタカーアップ
  isColdWeather: boolean; // 寒冷地仕様車

  warranty: {
    available: boolean; // 保証有無
    type: string; // 保証種類（ディーラー保証、販売店保証、カーセンサーアフター保証など）
    period: number; // 保証期間（月）
    distance: number; // 保証距離（km）
    details: string; // 保証詳細
  };

  features: {
    keylessEntry: boolean; // キーレスエントリー
    smartKey: boolean; // スマートキー
    powerWindow: boolean; // パワーウィンドウ
    powerSteering: boolean; // パワステ
    airConditioner: boolean; // エアコン・クーラー
    doubleAirConditioner: boolean; // Wエアコン
    dischargeHeadlamp: boolean; // ディスチャージドヘッドランプ
    fogLamp: boolean; // フロントフォグランプ
    autoHighBeam: boolean; // オートマチックハイビーム
    ledHeadlight: boolean; // LEDヘッドライト
    adaptiveHeadlight: boolean; // アダプティブヘッドライト
    etc: boolean; // ETC
    securityAlarm: boolean; // 盗難防止装置
    sunroof: boolean; // サンルーフ・ガラスルーフ
    roofRail: boolean; // ルーフレール
    rearMonitor: boolean; // 後席モニター
    airSuspension: boolean; // エアサスペンション
    powerSupply1500w: boolean; // 1500W給電
    driveRecorder: boolean; // ドライブレコーダー
    powerBackDoor: boolean; // 電動開閉バックドア
    displayAudio: boolean; // ディスプレイオーディオ（Apple CarPlay、Android Autoなど）

    // 安全性能・サポート
    abs: boolean; // ABS
    supportCar: boolean; // サポカー
    collisionMitigation: boolean; // 衝突被害軽減ブレーキ
    cruiseControl: boolean; // クルーズコントロール
    adaptiveCruiseControl: boolean; // アダプティブクルーズコントロール
    laneKeepAssist: boolean; // レーンキープアシスト
    parkingAssist: boolean; // パーキングアシスト
    falseStartPrevention: boolean; // アクセル踏み間違い（誤発進）防止装置
    stabilityControl: boolean; // 横滑り防止装置
    obstacleSensor: boolean; // 障害物センサー
    driverAirbag: boolean; // 運転席エアバッグ
    passengerAirbag: boolean; // 助手席エアバッグ
    sideAirbag: boolean; // サイドエアバッグ
    curtainAirbag: boolean; // カーテンエアバッグ
    neckProtection: boolean; // 頸部衝撃緩和ヘッドレスト
    frontCamera: boolean; // フロントカメラ
    sideCamera: boolean; // サイドカメラ
    backCamera: boolean; // バックカメラ
    surroundCamera: boolean; // 全周囲カメラ
    blindSpotMonitor: boolean; // ブラインドスポットモニター
    rearTrafficMonitor: boolean; // リアトラフィックモニタ
    hillDescentControl: boolean; // ヒルディセントコントロール

    // 環境装備
    idleStop: boolean; // アイドリングストップ
    ecoTaxReduction: boolean; // エコカー減税対象車

    // ドレスアップ
    fullAero: boolean; // フルエアロ
    lowDown: boolean; // ローダウン
    aluminumWheel: boolean; // アルミホイール
    allPainted: boolean; // 全塗装済
    liftUp: boolean; // リフトアップ

    // シート関連
    fullFlatSeat: boolean; // フルフラットシート
    thirdRowSeat: boolean; // 3列シート
    walkThrough: boolean; // ウォークスルー
    seatHeater: boolean; // シートヒーター
    seatAirConditioner: boolean; // シートエアコン
    leatherSeat: boolean; // 本革シート
    benchSeat: boolean; // ベンチシート
    electricSeat: boolean; // 電動シート
    ottoman: boolean; // オットマン

    slideDoor: {
      type: string; // スライドドアタイプ（両側電動、両側手動、片側電動、片側手動、両側(片側のみ電動)）
    };

    audio: {
      type: string; // オーディオタイプ（CD、MD、CD&MD、ミュージックサーバー、ミュージックプレイヤー接続可）
    };

    navigation: {
      available: boolean; // カーナビ付き
      type: string; // ナビタイプ（CDナビ、DVDナビ、HDDナビ、メモリーナビ他）
      tv: {
        available: boolean; // TV付き
        type: string; // TVタイプ（ワンセグTV、フルセグTV）
      };
      dvd: boolean; // DVD再生
      bluray: boolean; // ブルーレイ再生
    };

    commercial: {
      refrigeration: {
        mediumTemp: boolean; // 冷凍(中温−5℃)
        lowTemp: boolean; // 冷凍(低温−20℃)
        ultraLowTemp: boolean; // 冷凍(超低温−30℃以下)
        refrigerated: boolean; // 冷蔵
        insulated: boolean; // 保冷
      };
      sideDoor: boolean; // サイドドア
      threeWayOpen: boolean; // 三方開
      threeWayDump: boolean; // 三転ダンプ
      coveredBed: boolean; // 荷台幌付き
      lashingRail: boolean; // ラッシングレール
      rearDoubleWheel: boolean; // 後輪ダブル
      hasBed: boolean; // ベッド付き
      hillStartAssist: boolean; // 坂道発進補助装置
      clutchless: boolean; // クラッチレス
      bodyType: string; // ボディタイプ（Wキャブ、ワイドキャブ、平床ボディなど）
      loadCapacity: string; // 積載可能量（2t未満、2t以上5t未満など）
      totalWeight: string; // 車両総重量（3.5t未満、3.5t以上7.5t未満など）
      classNumber: string; // 分類番号（1ナンバー、3ナンバーなど）
      floorHeight: string; // 床面地上高（低床、全低床、高床）
      crane: string; // クレーン（ラジコン付き、フックイン付き）
      powerGate: string; // パワーゲート（垂直式、アーム式）
    };

    welfare: {
      electricSeat: boolean; // シート電動
      rotatePassengerSeat: boolean; // 助手席回転シート
      rotateRearSeat: boolean; // 後席回転スライドシート
      liftupRearSeat: boolean; // 後席リフトアップシート
      liftupPassengerSeat: boolean; // 助手席リフトアップシート
      detachableRearSeat: boolean; // 後席脱着リフトアップシート
      slope: boolean; // スロープ
      electricSlope: boolean; // 電動スロープ
      rearLift: boolean; // リアリフト
      rearCrane: boolean; // リアクレーン
      winch: boolean; // ウインチ
      chairLock: boolean; // 電動固定装置
      sideStep: boolean; // サイドステップ
      handrail: boolean; // 手すり
      leftAccelerator: boolean; // 左アクセル
      steeringGrip: boolean; // 旋回グリップ
      manualDriving: boolean; // 手動運転装置
      bathingCar: boolean; // 移動入浴車
      hillStartAssist: boolean; // 坂道発進補助装置
      clutchless: boolean; // クラッチレス
      classNumber: string; // 分類番号（1ナンバー、3ナンバーなど）
      wheelchairCapacity: string; // 車椅子積載台数（1台、2台など）
      stretcherCapacity: string; // ストレッチャー積載台数（1台、2台など）
    };

    camping: {
      bunkBed: boolean; // バンクベッド
      doubleDeckBed: boolean; // 二段ベッド
      dinetteBed: boolean; // 座席兼用ベッド
      pulldownBed: boolean; // プルダウンベッド(昇降式ベッド)
      electricPulldownBed: boolean; // 電動プルダウンベッド(昇降式ベッド)
      permanentBed: boolean; // 常設ベッド
      assemblyBed: boolean; // 組み立てベッド
      electricAssemblyBed: boolean; // 電動組み立てベッド
      solarPanel: boolean; // ソーラーパネル
      driveCharging: boolean; // 走行充電
      inverter: boolean; // インバーター
      externalPower: boolean; // 外部電源取り込み
      generator: boolean; // 発電機
      sink: boolean; // キッチン(シンク)
      stove: boolean; // キッチン(コンロ)
      microwave: boolean; // 電子レンジ
      fridge3Way: boolean; // 冷蔵庫(3way式)
      fridgeCompressor: boolean; // 冷蔵庫(コンプレッサー式)
      shower: boolean; // シャワー
      toilet: boolean; // トイレ
      waterHeater: boolean; // 温水設備
      waterTank: boolean; // 給水タンク
      drainageTank: boolean; // 排水タンク
      roofAirConditioner: boolean; // ルーフエアコン
      windowAirConditioner: boolean; // ウィンドウエアコン
      ffHeater: boolean; // FFヒーター
      ventilator: boolean; // 換気扇
      roofVent: boolean; // ルーフベント
      tentConnection: boolean; // テント接続可
      sideAwning: boolean; // サイドオーニング
      popupRoof: boolean; // ポップアップルーフ
      slideOut: boolean; // 可動式室内
      screenDoor: boolean; // 網戸
      tv: boolean; // テレビ
      table: boolean; // テーブル
      hitchMember: boolean; // ヒッチメンバー
      hillStartAssist: boolean; // 坂道発進補助装置
      clutchless: boolean; // クラッチレス
      baseVehicle: string; // ベース車両（商用車、乗用車）
      bodyType: string; // ボディタイプ（バンコン、キャブコンなど）
      classNumber: string; // 分類番号（1ナンバー、3ナンバーなど）
      sleepingCapacity: string; // 就寝人数（1人、2人など）
      acOutletCount: string; // ACコンセント数（1個、2個など）
      dcSocketCount: string; // DCソケット数（1個、2個など）
      subBatteryCount: string; // サブバッテリー数（1個、2個など）
    };
  };

  photoUrls: string[]; // 写真URL
  exteriorPhotoUrls: string[]; // 外装写真URL
  interiorPhotoUrls: string[]; // 内装写真URL
  has360View: boolean; // 360°画像付き
  hasMultiplePhotos: boolean; // 複数写真付き

  location: {
    address1: string; // 都道府県
    address2: string; // 市区町村
    address3: string; // 住所
    shopName: string; // 販売店名
    shopId: string; // 販売店ID
    shopPhoneNumber: string; // 販売店電話番号
    isDealerShop: boolean; // メーカー系販売店かどうか
    hasOnlineConsultation: boolean; // オンライン相談可能かどうか
  };

  searchTags: string[]; // 検索用タグ

  stockId: string; // 在庫ID
  vin: string; // 車台番号
  registrationDate: FirebaseFirestoreTypes.Timestamp; // 登録日

  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  isPublished: boolean; // 公開状態
  isSold: boolean; // 売却済みフラグ
  viewCount: number; // 閲覧数
  favoriteCount: number; // お気に入り登録数
  isNew: boolean; // 新着物件かどうか
  hasCoupon: boolean; // クーポン付きかどうか
  hasPurchasePlan: boolean; // 購入プラン付きかどうか
  hasQualityEvaluation: boolean; // 車両品質評価書付きかどうか
};
