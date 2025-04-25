export function queryParamToString(param: string | string[] | undefined): string {
  if (!param) return "";
  if (Array.isArray(param)) return param[0] || "";
  return param;
}

export function queryParamToNumber(param: string | string[] | undefined, defaultValue = 1): number {
  if (!param) return defaultValue;
  const value = Array.isArray(param) ? param[0] : param;
  if (!value) return defaultValue;
  const num = parseInt(value, 10);
  return isNaN(num) ? defaultValue : num;
}
