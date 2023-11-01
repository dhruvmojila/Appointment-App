import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
const Dashboard = () => {
  const [selected, setSelected] = useState("");
  return (
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
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
