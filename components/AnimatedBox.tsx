import React from "react";
import { StyleSheet, Button } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export default function AnimatedBox() {
  const width = useSharedValue(100);
  const offset = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => ({
    width: width.value,
    transform: [{ translateX: offset.value.x }, { translateY: offset.value.y }],
  }));

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX,
        y: e.translationY,
      };
    })
    .onEnd(() => {
      offset.value = withSpring({ x: 0, y: 0 });
    });

  const toggleWidth = () => {
    width.value = withTiming(Math.random() * 300 + 50, {
      duration: 500,
      easing: Easing.bezier(0.5, 0.01, 0, 1),
    });
  };

  return (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </GestureDetector>
      <Button title="Toggle Width" onPress={toggleWidth} />
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 100,
    backgroundColor: "blue",
    borderRadius: 20,
    marginBottom: 20,
  },
});
