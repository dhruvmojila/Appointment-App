import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const Loader = () => {
  const animation = useRef(null);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        loop={true}
        autoPlay
        ref={animation}
        speed={1}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#eee",
        }}
        source={require("../utils/animation/loader.json")}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
