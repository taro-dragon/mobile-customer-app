export const transmissionOptions = [
  { label: "AT", value: "at" },
  { label: "MT", value: "mt" },
];

export const inspectionOptions = [
  { label: "検有り", value: "inspection" },
  { label: "車検整備付き", value: "inspection_repair" },
  { label: "新車未登録", value: "new_registration" },
  { label: "検無し", value: "noinspection" },
];

export const repairStatusOptions = [
  { label: "なし", value: "none" },
  { label: "あり", value: "repaired" },
];

export const legalRepairOptions = [
  { label: "整備無", value: "none" },
  { label: "整備付", value: "repaired" },
];

export const industrySalesOptions = [
  { label: "受け付けない", value: "none" },
  { label: "受け付ける", value: "industry_sales" },
];

export const guaranteeOptions = [
  { label: "保証無し", value: "none" },
  { label: "保証付", value: "guarantee" },
];

export const guaranteeCountOptions = [
  { label: "無し", value: "unlimited" },
  { label: "有り", value: "limited" },
];

export const guaranteeExemptionOptions = [
  { label: "無し", value: "unlimited" },
  { label: "有り", value: "limited" },
];
export const guaranteeRoadServiceOptions = [
  { label: "無し", value: "unlimited" },
  { label: "有り", value: "limited" },
];

export const guaranteeLimitOptions = [
  { label: "限度額無制限", value: "unlimited" },
  { label: "有（車両本体価格)", value: "limited" },
];

export const cruiseControlOptions = [
  { label: "なし", value: "none" },
  { label: "オートクルーズコントロール", value: "auto" },
  { label: "アダプティブクルーズコントロール", value: "adaptive" },
];

export const slideDoorOptions = [
  { label: "なし", value: "none" },
  { label: "両側スライドドア", value: "both_slide_door" },
  { label: "電動スライドドア", value: "electric_slide_door" },
  { label: "両側電動スライドドア", value: "both_electric_slide_door" },
  { label: "両側スライド・片側電動", value: "one_slide_electric_door" },
];

export const carNaviOptions = [
  { label: "なし", value: "none" },
  { label: "CDナビ", value: "cd_navi" },
  { label: "DVDナビ", value: "dvd_navi" },
  { label: "HDDナビ", value: "hard_disk_navi" },
  { label: "SDナビ", value: "sd_navi" },
  { label: "メモリーナビ他", value: "memory_navi" },
];

export const tvMonitorOptions = [
  { label: "なし", value: "none" },
  { label: "TV(フルセグ)", value: "tv_full_seg" },
  { label: "TV(ワンセグ)", value: "tv_one_seg" },
];
