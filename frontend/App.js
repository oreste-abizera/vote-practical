import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterCandidateScreen from "./screens/RegisterCandidateScreen";
import VoteSuccessScreen from "./screens/VoteSuccessScreen";
import CandidateDetailsScreen from "./screens/CandidateDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterCandidate"
          component={RegisterCandidateScreen}
          options={{ headerShadowVisible: false, title: "" }}
        />
        <Stack.Screen
          name="VoteSuccess"
          component={VoteSuccessScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="CandidateDetails"
          component={CandidateDetailsScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>

      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
