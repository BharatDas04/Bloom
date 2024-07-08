import { Dimensions, PixelRatio } from "react-native";

function FontSizeADJ(size: number) {
  const { width, height } = Dimensions.get("window");
  const screenRatio = width / height;
  const baseFontSize = 16;

  const responsiveFactor =
    (PixelRatio.getFontScale() * Math.min(Math.sqrt(width * height), 1200)) / // Adjust the upper limit as needed
    (baseFontSize * (screenRatio >= 1.6 ? 1.5 : 1)); // Adjust for wider screens

  return Math.round(size * responsiveFactor);
}

export default FontSizeADJ;
