import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const WaveLoader = () => {
  // Create an animated value for each wave
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;

  // Start the animation for each wave
  useEffect(() => {
    const animateWave = (wave) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(wave, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateWave(wave1);
    animateWave(wave2);
    animateWave(wave3);
  }, [wave1, wave2, wave3]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.wave, { transform: [{ translateY: wave1.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
        }) }] }]}
      />
      <Animated.View
        style={[styles.wave, { transform: [{ translateY: wave2.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -40],
        }) }] }]}
      />
      <Animated.View
        style={[styles.wave, { transform: [{ translateY: wave3.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -50],
        }) }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  wave: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(227, 171, 17, 0.815)',
    margin: 5,
  },
});

export default WaveLoader;
