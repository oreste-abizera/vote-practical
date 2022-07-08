import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import RadioFilter from "../components/RadioFilter";
import url from "../helpers/url";

const { height } = Dimensions.get("window");
const RegisterCandidateScreen = ({ navigation }) => {
  const [creating, setCreating] = useState(false);
  const [state, setstate] = useState({
    names: "",
    nationalId: "",
    email: "",
    missionStatement: "",
    gender: "",
    profilePicture: "",
  });

  const { names, nationalId, email, missionStatement, gender, profilePicture } =
    state;

  const changeState = (key, value) => {
    setstate({ ...state, [key]: value });
  };

  const registerAsync = async () => {
    try {
      setCreating(true);
      let response = await axios.post(url + "/candidates/register", {
        ...state,
      });
      if (response.data.success) {
        setCreating(false);
        navigation.navigate("Home");
        if (Platform.OS === "android") {
          ToastAndroid.show(
            "Candidate Successfully Registered",
            ToastAndroid.SHORT
          );
        } else {
          Alert.alert("Candidate Successfully Registered");
        }
      } else {
        Alert.alert(
          "Candidate Registration failed",
          "Please check your internet connection and try again"
        );
        setCreating(false);
      }
    } catch (error) {
      console.log(error.message || error.response?.data);
      Alert.alert(
        "Error",
        error?.response?.data?.error || "Something went wrong"
      );
      setCreating(false);
    }
  };
  return (
    <ScrollView
      style={{
        paddingTop: 0,
        backgroundColor: "#fff",
        height,
        paddingHorizontal: 20,
      }}
    >
      <Text style={styles.heading}>Register Candidate</Text>
      <Text style={styles.inputLabel}>Full Names</Text>
      <View style={[styles.inputContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Enter Candidate's names"
          value={names}
          onChangeText={(value) => changeState("names", value)}
        ></TextInput>
      </View>
      <Text style={styles.inputLabel}>National ID</Text>
      <View style={[styles.inputContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your nationalId"
          value={nationalId}
          onChangeText={(value) => changeState("nationalId", value)}
        ></TextInput>
      </View>
      <Text style={styles.inputLabel}>Email address</Text>
      <View style={[styles.inputContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email Address"
          value={email}
          onChangeText={(value) => changeState("email", value)}
        ></TextInput>
      </View>
      <Text style={styles.inputLabel}>Mission Statement</Text>
      <View style={[styles.inputContainer]}>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Enter Mission Statement"
          value={missionStatement}
          onChangeText={(value) => changeState("missionStatement", value)}
        ></TextInput>
      </View>
      <Text style={styles.inputLabel}>Picture url</Text>
      <View style={[styles.inputContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Enter Image url"
          value={profilePicture}
          onChangeText={(value) => changeState("profilePicture", value)}
        ></TextInput>
      </View>

      <Text style={styles.inputLabel}>Gender</Text>
      <RadioFilter
        options={["MALE", "FEMALE"]}
        changeSelected={(value) => changeState("gender", value)}
      ></RadioFilter>
      <TouchableOpacity
        style={styles.submit}
        onPress={() => registerAsync()}
        // disabled={!isEnabledSubmit}
      >
        <Text style={styles.submitText}>
          {creating ? "Wait..." : "Register"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "#2E0B5B",
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    borderColor: "rgba(166, 163, 163, 0.45)",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  inputLabel: {
    color: "#2E0B5B",
    fontWeight: "500",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 2,
  },
  submit: {
    backgroundColor: "#2E0B5B",
    borderRadius: 10,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  submitText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RegisterCandidateScreen;
