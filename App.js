import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./src/screen/Dashboard";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const Stack = createNativeStackNavigator();

  const globalScreenOptons = {
    headerStyle: { backgroundColor: "#2c6BED" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={globalScreenOptons}>
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
