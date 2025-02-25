import React from "react";
import { Dimensions } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { useTheme } from "@/contexts/ThemeContext";

const ShopDetailSkeleton = (props: any) => {
  const { width } = Dimensions.get("window");
  const { colors } = useTheme();
  // スケルトン全体の高さは目安として算出（後ほど調整可）
  const height = width + 300;

  // ヘッダー領域（安全領域は仮値として20px）

  // 画像カルーセルのプレースホルダー（画像は正方形）
  const carouselHeight = width;

  // カルーセル下のコンテンツ開始位置
  const contentStartY = carouselHeight + 16;

  // 店舗名プレースホルダー
  const shopNameY = contentStartY;
  const shopNameX = 16;
  const shopNameWidth = width * 0.6;
  const shopNameHeight = 24;

  // 住所プレースホルダー
  const addressY = shopNameY + shopNameHeight + 8;
  const addressX = 16;
  const addressWidth = width * 0.8;
  const addressHeight = 20;

  // セクションタイトル「店舗情報」のプレースホルダー
  const sectionTitleY = addressY + addressHeight + 24;
  const sectionTitleX = 16;
  const sectionTitleWidth = 80;
  const sectionTitleHeight = 20;

  // 詳細情報（電話番号、メールアドレス）のプレースホルダー（各行にラベル＋値）
  const rowGap = 8;
  const rowHeight = 20;
  const row1Y = sectionTitleY + sectionTitleHeight + 8;
  const detailLabelWidth = 60;
  // 値部分の X 座標はラベルの右側に16pxのマージンを空ける
  const detailValueX = shopNameX + detailLabelWidth + 16;
  const detailValueWidth = width - detailValueX - 16;

  const row2Y = row1Y + rowHeight + rowGap;

  return (
    <ContentLoader
      speed={1}
      animate
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={colors.backgroundSecondary}
      foregroundColor={colors.backgroundTertiary}
    >
      <Rect x="0" y="0" rx="4" ry="4" width={width} height={carouselHeight} />

      <Rect
        x={shopNameX}
        y={shopNameY}
        rx="4"
        ry="4"
        width={shopNameWidth}
        height={shopNameHeight}
      />

      <Rect
        x={addressX}
        y={addressY}
        rx="4"
        ry="4"
        width={addressWidth}
        height={addressHeight}
      />

      <Rect
        x={sectionTitleX}
        y={sectionTitleY}
        rx="4"
        ry="4"
        width={sectionTitleWidth}
        height={sectionTitleHeight}
      />

      <Rect
        x={shopNameX}
        y={row1Y}
        rx="4"
        ry="4"
        width={detailLabelWidth}
        height={rowHeight}
      />
      <Rect
        x={detailValueX}
        y={row1Y}
        rx="4"
        ry="4"
        width={detailValueWidth}
        height={rowHeight}
      />

      <Rect
        x={shopNameX}
        y={row2Y}
        rx="4"
        ry="4"
        width={detailLabelWidth}
        height={rowHeight}
      />
      <Rect
        x={detailValueX}
        y={row2Y}
        rx="4"
        ry="4"
        width={detailValueWidth}
        height={rowHeight}
      />
    </ContentLoader>
  );
};

export default ShopDetailSkeleton;
