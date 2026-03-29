const IOS_URL = "https://apps.apple.com/us/app/conquian-333/id1069186374";
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.alexga.Conquian333";

export function getPlatformStoreUrl(): string {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return ANDROID_URL;
  return IOS_URL;
}
