import React from 'react';
import LottieView from 'lottie-react-native';

const MyLoader = () => {
  return (
    <LottieView
      source={require('../src/loader.json')} 
      autoPlay
      loop
      style={{ width: 200, height: 200 }}
    />
  );
};

export default MyLoader;