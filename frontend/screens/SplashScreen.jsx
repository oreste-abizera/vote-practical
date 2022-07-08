import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function SplashScreen({ navigation }) {
  const [loadingState, setloadingState] = React.useState(0);

  let numDots = 3;
  React.useEffect(() => {
    const interval = setInterval(async () => {
      if (loadingState < numDots) await setloadingState(loadingState + 1);
    }, 1000);

    if (loadingState >= numDots) {
      clearInterval(interval);
      navigation.push("Register");
    }

    return () => {
      clearInterval(interval);
    };
  }, [loadingState]);

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
          ABStore
        </Text>
      </View>
      <View style={styles.ellipses}>
        {Array.from(Array(loadingState)).map((item, index) => (
          <Text key={index} style={styles.ellipse}></Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E0B5B",
    position: "relative",
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  name: {
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 35,
    marginTop: 25,
    letterSpacing: 1.5,
  },
  ellipses: {
    position: "absolute",
    bottom: 45,
    display: "flex",
    flexDirection: "row",
  },
  ellipse: {
    height: 15,
    width: 15,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "#ffffff",
  },
});
