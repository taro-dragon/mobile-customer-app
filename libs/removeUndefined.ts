export const removeUndefined = (
  obj: Record<string, any>
): Record<string, any> => {
  const result: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    // Skip undefined values
    if (value === undefined) return;

    // Handle nested objects
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      result[key] = removeUndefined(value);
    } else {
      result[key] = value;
    }
  });

  return result;
};
