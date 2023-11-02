import React, { useRef, useEffect, useState } from "react";
import { Button, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { auth } from "../utils/firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { getAuth, reload, sendEmailVerification } from "firebase/auth";
import Toast from "react-native-toast-message";

const SpashScreen = () => {
  const [emailVerified, setEmailVerified] = useState(false);

  const navigation = useNavigation();

  const animation = useRef(null);

  return (
    <View style={styles.animationContainer}>
      <View style={{ zIndex: 999, position: "absolute", top: 60 }}>
        <Toast topOffset={0} />
      </View>
      <LottieView
        loop={false}
        autoPlay
        ref={animation}
        onAnimationFinish={() => {
          const usub = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
              if (authUser.emailVerified) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Dashboard" }],
                });
              } else {
                setEmailVerified(true);
              }
            } else {
              navigation.replace("Login");
            }
          });
        }}
        speed={1}
        style={{
          width: 300,
          height: 300,
          backgroundColor: "#eee",
        }}
        source={require("../utils/animation/animation.json")}
      />
      {emailVerified ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: 500 }}>
            Verification Email Sent
          </Text>
          <Text style={{ fontSize: 14, color: "#666666", marginTop: 12 }}>
            Please check your inbox including span folder
          </Text>
          <Text style={{ fontSize: 14, color: "#666666", marginTop: 4 }}>
            Please comeback after verification
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (auth) {
                  sendEmailVerification(auth.currentUser)
                    .then((res) => {
                      Toast.show({
                        type: "success",
                        text1: "Mail sent",
                      });
                    })
                    .catch((err) => {
                      Toast.show({
                        type: "error",
                        text1: "Somthing went wrong",
                      });
                    });
                }
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 400,
                    color: "#2c6BED",
                  }}
                >
                  Resend verification mail
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <Text
                  style={{
                    marginRight: 8,

                    fontSize: 18,
                    fontWeight: 400,
                    color: "#2c6BED",
                  }}
                >
                  Back to login
                </Text>
                <Icon name="arrow-forward" size={24} color={"#2c6BED"} />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              reload(getAuth().currentUser).then((res) => {
                const usub = auth.onAuthStateChanged((authUser) => {
                  if (authUser) {
                    if (authUser.emailVerified) {
                      Toast.show({
                        type: "success",
                        text1: "User verified",
                      });
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Dashboard" }],
                      });
                    } else {
                      Toast.show({
                        type: "error",
                        text1: "User not verified",
                      });
                    }
                  }
                });
              });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  color: "#2c6BED",
                }}
              >
                Refresh
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}

      {/* <View style={styles.buttonContainer}>
        <Button
          title="Restart Animation"
          onPress={() => {
            animation.current?.reset();
            animation.current?.play();
          }}
        />
      </View> */}
    </View>
  );
};

export default SpashScreen;

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    // paddingTop: 20,
  },
});
