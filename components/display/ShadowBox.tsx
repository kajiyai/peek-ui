import { StyleSheet } from "react-native";
import { View } from "../base/View";
import { ShadowBoxProps } from "../types/display";

/**
 * A basic box component that wraps its children in a `View` component
 * with a drop shadow. The shadow is styled for both iOS and Android.
 *
 * @prop {React.ReactNode} children - The child elements to wrap.
 * @prop {React.CSSProperties} [style] - Additional styles for the box.
 *
 * @example
 * <ShadowBox>Shadowed content</ShadowBox>
 */
export const ShadowBox: React.FC<ShadowBoxProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <View style={[styles.shadow, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    // iOSの影
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Androidの影
    elevation: 4,
    // 影を表示するために必要
    backgroundColor: "white",
    // 角丸にする場合
    borderRadius: 8,
  },
});
