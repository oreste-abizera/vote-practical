import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        ></Image>
        <Text
          style={styles.name}
          onPress={() => {
            navigation.push("Home");
          }}
        >
          Voting Made Easy
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#2E0B5B",
            width: 200,
            height: 50,
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={{ color: "#fff" }}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    position: "relative",
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 400,
  },
  name: {
    fontWeight: "bold",
    color: "#2E0B5B",
    fontSize: 35,
    marginTop: 25,
    letterSpacing: 1.5,
  },
});
