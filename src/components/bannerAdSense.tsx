import { Platform } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

import { TrainingUse } from "../contexts/training";

const adUnitId =
  Platform.OS === "ios"
    ? "ca-app-pub-7777495263618718/1764622475"
    : "ca-app-pub-7777495263618718/6062960130";

export default function BannerAdSense({ isPrime }: { isPrime?: boolean }) {
  const { nonPersonalizedAd } = TrainingUse();

  if (isPrime) return null;

  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: nonPersonalizedAd,
      }}
    />
  );
}
