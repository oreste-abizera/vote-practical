import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import checkAsyncStorage from "../helpers/CheckAsyncStorage";
import url from "../helpers/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [reload, setreload] = useState(false);
  const [voting, setVoting] = useState(false);
  const [candidates, setcandidates] = useState([]);
  const [user, setuser] = useState({});

  useEffect(() => {
    axios.get(url + "/candidates").then((response) => {
      setcandidates(response.data.data || []);
    });
    checkAsyncStorage().then((user) => {
      if (user.token) {
        setuser(user);
      }
    }, []);
  }, [reload]);

  const voteCandidate = async (candidate = {}) => {
    try {
      setVoting(true);
      let response = await axios.post(
        url + "/votes/candidate/" + candidate._id,
        {},
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      if (response.data.success) {
        navigation.navigate("VoteSuccess", { candidate });
        if (Platform.OS === "android") {
          ToastAndroid.show("Vote Successfully Registered", ToastAndroid.SHORT);
        } else {
          Alert.alert("Vote Successfully Registered");
        }
        setreload(!reload);
      } else {
        Alert.alert(
          "Vote Registration failed",
          "Please check your internet connection and try again"
        );
      }
    } catch (error) {
      console.log(error.message || error.response?.data);
      Alert.alert(
        "Vote Registration failed",
        error.response?.data?.error ||
          "Please check your internet connection and try again"
      );
    } finally {
      setVoting(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  };

  const { isAdmin } = user.user || {};

  const hasVoted =
    candidates.find((candidate) => {
      return candidate.votes.includes(user.user?._id);
    }) !== null;
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          marginBottom: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 16, color: "gray" }}>
            Hello,{" "}
            <Text style={{ fontWeight: "700", color: "black" }}>
              {user.user?.names || "There"}
            </Text>
          </Text>
          <Text style={{ color: "gray", marginTop: 2 }}>
            {isAdmin ? "Administrator" : "Voter"}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#2E0B5B",
            width: 80,
            height: 40,
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={logout}
        >
          <Text style={{ color: "#fff" }}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>
        {isAdmin
          ? "List of Candidates and their votes"
          : "Your Vote is Secure, Your Vote Count"}
      </Text>
      <Text style={styles.subtitle}>
        {isAdmin
          ? "You can add more candidates"
          : "You can only vote for one candidate"}
      </Text>
      {isAdmin && (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#2E0B5B",
              width: 150,
              height: 40,
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
            onPress={() => navigation.navigate("RegisterCandidate")}
          >
            <Text style={{ color: "#fff" }}>Add Candidate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#2E0B5B",
              width: 150,
              height: 40,
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              marginLeft: 20,
            }}
            onPress={() => setreload(!reload)}
          >
            <Text style={{ color: "#fff" }}>Reload Data</Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        {candidates.map((candidate, index) => {
          return (
            <View key={index} style={styles.candidateContainer}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("CandidateDetails", { candidate })
                }
              >
                <Image
                  source={{
                    uri:
                      candidate.profilePicture ||
                      "data:image/jpeg;base64,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",
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    marginRight: 40,
                  }}
                  resizeMode="cover"
                />
              </TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CandidateDetails", { candidate })
                }
              >
                <>
                  <Text style={{ fontSize: 30 }}>{candidate.names}</Text>
                  <Text style={{ fontSize: 14, color: "gray" }}>
                    {candidate.gender}
                  </Text>
                </>
              </TouchableOpacity>
              {!isAdmin && !hasVoted ? (
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: -1,
                    backgroundColor: "#2E0B5B",
                    width: 80,
                    height: 40,
                    borderBottomRightRadius: 5,
                    borderTopLeftRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => voteCandidate(candidate)}
                >
                  <Text style={{ color: "#fff" }}>
                    {voting ? "Wait..." : "Vote"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableHighlight
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: -1,
                    backgroundColor: "#2E0B5B",
                    width: 80,
                    height: 40,
                    borderBottomRightRadius: 5,
                    borderTopLeftRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff" }}>
                    {candidate.votes?.length || 0} votes
                  </Text>
                </TouchableHighlight>
              )}
            </View>
          );
        })}
      </View>
      <View style={{ height: 50, width: "100%" }}></View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "900",
    fontSize: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginVertical: 5,
  },
  candidateContainer: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2E0B5B",
    height: 120,
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
export default HomeScreen;
