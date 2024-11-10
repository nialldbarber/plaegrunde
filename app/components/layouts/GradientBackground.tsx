import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function GradientBackground() {
  const { styles } = useStyles(stylesheet);
  const { width, height } = useWindowDimensions();

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const endX = useSharedValue(width);
  const endY = useSharedValue(height);

  const start = useDerivedValue(() => vec(startX.value, startY.value));
  const end = useDerivedValue(() => vec(endX.value, endY.value));

  useEffect(() => {
    startX.value = 0;
    endX.value = width;

    const centerY = height / 2;
    const amplitude = height * 0.1;
    const duration = 3000;

    startY.value = withRepeat(
      withSequence(
        withTiming(centerY - amplitude, { duration }),
        withTiming(centerY + amplitude, { duration }),
      ),
      -1,
      true,
    );

    endY.value = withRepeat(
      withSequence(
        withTiming(centerY + amplitude, { duration }),
        withTiming(centerY - amplitude, { duration }),
      ),
      -1,
      true,
    );
  }, []);

  return (
    <>
      <Canvas style={styles.canvas}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={start}
            end={end}
            colors={["#f95108", "#90007e"]}
          />
        </Rect>
      </Canvas>
    </>
  );
}

const stylesheet = createStyleSheet(() => ({
  canvas: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
