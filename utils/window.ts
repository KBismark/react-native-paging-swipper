import type { ScaledSize } from "react-native";
import { Dimensions } from "react-native";
import { Platform } from "react-native";

export const isIos = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isWeb = Platform.OS === "web";
export const window: ScaledSize =  Dimensions.get("window");
export const {width:ScreenWidth,height: ScreenHeight} = window;

export function HundredPercentMinus(pixelNumber: number){
    return ScreenWidth - pixelNumber
}
export function HundredPercentPlus(pixelNumber: number){
    return ScreenWidth + pixelNumber
}
