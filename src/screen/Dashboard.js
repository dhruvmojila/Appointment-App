import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { getAuth, reload, sendEmailVerification } from "firebase/auth";
import Loader from "./Loader";
import Toast from "react-native-toast-message";

const Dashboard = () => {
  const [selected, setSelected] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  return (
    <>
      <View style={{ zIndex: 999 }}>
        <Toast topOffset={20} />
      </View>
      {isLoading ? (
        <>
          {auth.currentUser.emailVerified ? (
            <Loader />
          ) : (
            <View
              style={{
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: 500 }}>
                Verification Email Sent
              </Text>
              <Text style={{ fontSize: 14, color: "#666666", marginTop: 12 }}>
                Please check your inbox including span folder
              </Text>
              <Text style={{ fontSize: 14, color: "#666666", marginTop: 4 }}>
                comeback after verification
              </Text>
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
                          navigation.replace("Dashboard");
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
                      marginRight: 8,

                      fontSize: 18,
                      fontWeight: 400,
                      color: "#2c6BED",
                    }}
                  >
                    Refresh
                  </Text>
                </View>
              </TouchableOpacity>
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
                      marginRight: 8,

                      fontSize: 18,
                      fontWeight: 400,
                      color: "#2c6BED",
                    }}
                  >
                    Resend verification mail
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={{ flex: 1 }}>
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange",
              },
            }}
          />
        </View>
      )}
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
