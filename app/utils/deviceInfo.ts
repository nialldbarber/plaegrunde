import { getVersion } from "react-native-device-info";

export const appVersion = __DEV__ ? "8.31.1" : getVersion();

function compareVersions(
  v1: string,
  v2: string,
  comparisonType: "greater" | "equal" | "lower",
): boolean {
  const parts1 = v1.split(".").map(Number);
  const parts2 = v2.split(".").map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;

    if (part1 !== part2) {
      if (comparisonType === "greater") return part1 > part2;
      if (comparisonType === "lower") return part1 < part2;
      return false;
    }
  }

  return comparisonType === "equal";
}

export type VersionResponse = "preferred" | "supported" | "unsupported";
export function isAppVersionCompatible(
  stableAppVersion: string,
  preferredAppVersion: string,
): VersionResponse {
  if (
    compareVersions(appVersion, preferredAppVersion, "greater") ||
    compareVersions(appVersion, preferredAppVersion, "equal")
  ) {
    return "preferred";
  }
  if (
    (compareVersions(appVersion, stableAppVersion, "greater") ||
      compareVersions(appVersion, stableAppVersion, "equal")) &&
    compareVersions(appVersion, preferredAppVersion, "lower")
  ) {
    return "supported";
  }
  return "unsupported";
}
