import { Appraisal } from "@/types/models/Appraisal";
import { AppraisalBid } from "@/types/models/AppraisalBid";
import { Client } from "@/types/models/Client";
import { Shop } from "@/types/models/Shop";
import firestore from "@react-native-firebase/firestore";

// Clientのサンプルデータ
const sampleShop1: Shop = {
  id: "shop_001",
  staffInfo: {
    familyName: "山田",
    givenName: "太郎",
    familyNameKana: "ヤマダ",
    givenNameKana: "タロウ",
    phoneNumber: "090-1234-5678",
    email: "yamada@example.com",
  },

  shopName: "株式会社カーズジャパン",
  postalCode: "150-0002",
  address1: "東京都",
  address2: "渋谷区",
  address3: "渋谷1-1-1",
  lat: 35.681236,
  lng: 139.767125,
  businessHours: "9:00-18:00",
  phoneNumber: "03-1234-5678",
  email: "info@carsjapan.example.com",
  imageUrls: ["https://picsum.photos/200/300", "https://picsum.photos/200/300"],
};

const sampleShop2: Shop = {
  id: "shop_002",
  staffInfo: {
    familyName: "鈴木",
    givenName: "花子",
    familyNameKana: "スズキ",
    givenNameKana: "ハナコ",
    phoneNumber: "090-8765-4321",
    email: "suzuki@example.com",
  },
  shopName: "オートバリュー株式会社",
  postalCode: "160-0022",
  address1: "東京都",
  address2: "新宿区",
  address3: "新宿3-1-1",
  lat: 35.681236,
  lng: 139.767125,
  businessHours: "9:00-18:00",
  phoneNumber: "03-8765-4321",
  email: "info@autovalue.example.com",
  imageUrls: ["https://picsum.photos/200/300", "https://picsum.photos/200/300"],
};

// 完全なAppraisalBidのサンプルデータ
const sampleAppraisalBids: AppraisalBid[] = [
  {
    id: "bid_789",
    clientId: "client_001",
    amount: 1850000,
    comment: "走行距離が少なく、状態が良好です。即日査定可能です。",
    createdAt: firestore.Timestamp.fromDate(new Date("2024-03-01")), // 2024-03-01
    status: "pending",
    shop: sampleShop1,
  },
  {
    id: "bid_790",
    clientId: "client_002",
    amount: 1780000,
    comment:
      "内装の状態が特に良好です。お客様のご要望に応じて柔軟に対応させていただきます。",
    createdAt: firestore.Timestamp.fromDate(new Date("2024-03-01")), // 2024-03-01
    status: "pending",
    shop: sampleShop2,
  },
];

// 完全なAppraisalのサンプルデータ
export const sampleAppraisal: Appraisal = {
  id: "appraisal_123",
  status: "active",
  carId: "car_456",
  maker: "toyota",
  model: "prius",
  year: "202410",
  gread: "G",
  prefecture: "tokyo",
  city: "shibuya",
  createdAt: firestore.Timestamp.fromDate(new Date("2024-03-01")), // 2024-03-01
  updatedAt: firestore.Timestamp.fromDate(new Date("2024-03-01")), // 2024-03-01
  bids: sampleAppraisalBids,
};
