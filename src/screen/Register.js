import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Image, Input, Text } from "react-native-elements";
import { db } from "../utils/firebase/firebase";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  applyActionCode,
  reload,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isEmailVarified, setIsEmailVarified] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const animation = useRef(null);

  const auth = getAuth();

  const createNewUser = async () => {
    await addDoc(collection(db, "Users"), {
      email: email,
      displayName: name,
      photoURL: imageUrl
        ? imageUrl
        : "https://example.com/jane-q-user/profile.jpg",
    }).then(() => {
      console.log("User Added to firestore");
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);
  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: name,
          photoURL: imageUrl
            ? imageUrl
            : "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            createNewUser();
            sendEmailVerification(authUser.user)
              .then((res) => {
                console.log("Verification mail sent!", res);
                setIsEmailSent(true);
              })
              .catch((error) => {
                console.log("error in email verification", error);
              });
            console.log("profle updated successfully");
          })
          .catch((error) => {
            console.log("error in profle updation");
          });
      })
      .catch((e) => {
        console.log(e.message);
        if ("Firebase: Error (auth/email-already-in-use)." === e.message) {
          Alert.alert("Email already registered");
        } else {
          Alert.alert(e.message);
        }
      });
  };
  return (
    <>
      <View style={{ zIndex: 999 }}>
        <Toast topOffset={20} />
      </View>
      {isEmailSent ? (
        <>
          <StatusBar style="light" />
          <View style={styles.animationContainer}>
            <LottieView
              loop={false}
              autoPlay
              ref={animation}
              style={{
                width: 300,
                height: 300,
                backgroundColor: "#eee",
              }}
              source={require("../utils/animation/emailVerification.json")}
            />
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 24, fontWeight: 500 }}>
                Verification Email Sent
              </Text>
              <Text style={{ fontSize: 14, color: "#666666", marginTop: 12 }}>
                Please check your inbox including span folder
              </Text>
              <Button
                raised
                title="Refresh"
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
                containerStyle={styles.button}
              />
              <Button
                raised
                title="Resend verification mail"
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
                containerStyle={[styles.button, { width: 250 }]}
              />
            </View>
          </View>
        </>
      ) : (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <StatusBar style="light" />
          <Text h3 style={{ marginBottom: 50 }}>
            Register
          </Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Full Name"
              autoFocus
              textContentType="name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Input
              placeholder="Email"
              textContentType="emailAddress"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              placeholder="Password"
              textContentType="password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Input
              placeholder="Profile Picture"
              value={imageUrl}
              onChangeText={(text) => setImageUrl(text)}
              onSubmitEditing={register}
            />
          </View>
          <Button
            raised
            title="Register"
            onPress={register}
            containerStyle={styles.button}
          />
          <View style={{ height: 100 }}></View>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
  animationContainer: {
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
