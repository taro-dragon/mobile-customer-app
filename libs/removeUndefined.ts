/**
 * オブジェクトから undefined の値を再帰的に削除する
 * Firestoreは undefined の値をサポートしていないため、保存前に削除する必要がある
 *
 * @param obj 処理対象のオブジェクト
 * @returns undefined の値が削除されたオブジェクト
 */
export const removeUndefined = (
  obj: Record<string, any>
): Record<string, any> => {
  const result: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    // undefined の値はスキップ
    if (value === undefined) return;

    // ネストされたオブジェクトを処理
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      result[key] = removeUndefined(value);
    } else {
      result[key] = value;
    }
  });

  return result;
};
