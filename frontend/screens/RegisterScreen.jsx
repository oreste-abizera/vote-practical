import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import validateEmail from "../helpers/validateEmail";

const { width, height } = Dimensions.get("window");

function RegisterScreen({ navigation }) {
  const [loggingIn, setLoggingIn] = React.useState(false);
  const bootstrapAsync = async () => {
    // const userStorage = await checkAsyncStorage();
    // if (userStorage.token) {
    //   navigation.navigate(userStorage.token ? "Home" : "Register", {});
    // }
  };

  React.useEffect(() => {
    bootstrapAsync();
  }, []);

  const [firstPage, setfirstPage] = React.useState(true);
  const [state, setstate] = React.useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
  });
  const [touched, settouched] = React.useState({
    fullname: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone_number: false,
  });

  const { fullname, username, email, phone_number, password, confirmPassword } =
    state;

  const changeState = (key, value) => {
    setstate({ ...state, [key]: value });
    settouched({ ...touched, [key]: true });
  };

  const touchInput = (key) => {
    settouched({ ...touched, [key]: true });
  };

  const errors = {
    fullname: touched.fullname
      ? !fullname
        ? "Full Names are required"
        : fullname.length < 2
        ? "Full Names must be at least 2 characters"
        : ""
      : "",
    username: touched.username
      ? !username
        ? "username is required"
        : username.length < 2
        ? "Username must be at least 2 characters"
        : ""
      : "",
    email: touched.email
      ? !email
        ? "Email is required"
        : !validateEmail(email)
        ? "Email is invalid"
        : ""
      : "",
    phone_number: touched.phone_number
      ? !phone_number
        ? "Phone Number is required"
        : phone_number.length !== 12
        ? "Phone Number must be 12 characters"
        : phone_number.match(/\d/g)?.length !== 12
        ? "Phone Number is Invalid"
        : ""
      : "",
    password: touched.password
      ? !password
        ? "password is required"
        : password.length < 5
        ? "password must be at least 5 characters"
        : ""
      : "",
    confirmPassword: touched.confirmPassword
      ? !confirmPassword
        ? "confirm password is required"
        : password !== confirmPassword
        ? "Your Passwords do not match"
        : confirmPassword.length < 5
        ? "confirm password must be at least 5 characters"
        : ""
      : "",
  };

  const isFirstPageComplete =
    fullname.length >= 2 &&
    username.length >= 2 &&
    validateEmail(email) &&
    phone_number.length === 12 &&
    phone_number.match(/\d/g)?.length === 12;

  const isSecondPageComplete =
    password.length >= 5 &&
    confirmPassword.length >= 5 &&
    password === confirmPassword;

  const isEnabledSubmit =
    !loggingIn &&
    (firstPage
      ? isFirstPageComplete
      : isFirstPageComplete && isSecondPageComplete);

  const fullnameErrorStyles =
    touched.fullname && errors.fullname ? styles.inputContainerError : {};
  const usernameErrorStyles =
    touched.username && errors.username ? styles.inputContainerError : {};
  const emailErrorStyles =
    touched.email && errors.email ? styles.inputContainerError : {};
  const phone_numberErrorStyles =
    touched.phone_number && errors.phone_number
      ? styles.inputContainerError
      : {};
  const passwordErrorStyles =
    touched.password && errors.password ? styles.inputContainerError : {};
  const confirmPasswordErrorStyles =
    touched.confirmPassword && errors.confirmPassword
      ? styles.inputContainerError
      : {};

  const readAllInputs = () => {
    let newTouched = {};
    Object.keys(touched).forEach((key) => {
      newTouched[key] = firstPage
        ? !["password", "confirmPassword"].includes(key)
        : true;
    });
    settouched(newTouched);
  };

  const registerAsync = async () => {
    if (isEnabledSubmit) {
      if (firstPage) {
        setfirstPage(false);
      } else {
        const { confirmPassword, ...rest } = state;
        console.log(rest);
        await register(rest);
      }
    } else {
      readAllInputs();
    }
  };

  return (
    <ScrollView style={styles.registerForm}>
      <View style={styles.form}>
        {firstPage ? (
          <>
            <Text style={styles.heading}>Sign Up</Text>

            <Text style={styles.inputLabel}>Full Names</Text>
            <View style={[styles.inputContainer, fullnameErrorStyles]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Full Names"
                value={fullname}
                onChangeText={(value) => changeState("fullname", value)}
                onBlur={() => touchInput("fullname")}
              ></TextInput>
            </View>
            {errors.fullname ? (
              <Text style={styles.error}>{errors.fullname}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Username</Text>
            <View style={[styles.inputContainer, usernameErrorStyles]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Username"
                value={username}
                onChangeText={(value) => changeState("username", value)}
                onBlur={() => touchInput("username")}
              ></TextInput>
            </View>
            {errors.username ? (
              <Text style={styles.error}>{errors.username}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Email address</Text>
            <View style={[styles.inputContainer, emailErrorStyles]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Email Address"
                value={email}
                onChangeText={(value) => changeState("email", value)}
                onBlur={() => touchInput("email")}
              ></TextInput>
            </View>
            {errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Telephone</Text>
            <View style={[styles.inputContainer, phone_numberErrorStyles]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Telephone Number"
                value={phone_number}
                onChangeText={(value) => changeState("phone_number", value)}
                onBlur={() => touchInput("phone_number")}
              ></TextInput>
            </View>
            {errors.phone_number ? (
              <Text style={styles.error}>{errors.phone_number}</Text>
            ) : null}
          </>
        ) : (
          <>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={[styles.inputContainer, passwordErrorStyles]}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={true}
                value={password}
                onChangeText={(value) => changeState("password", value)}
                onBlur={() => touchInput("password")}
              ></TextInput>
            </View>
            {errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={[styles.inputContainer, confirmPasswordErrorStyles]}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(value) => changeState("confirmPassword", value)}
                onBlur={() => touchInput("confirmPassword")}
              ></TextInput>
            </View>
            {errors.confirmPassword ? (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            ) : null}
            <View style={{ marginBottom: "50%" }}></View>
          </>
        )}

        <TouchableOpacity
          style={styles.submit}
          onPress={() => registerAsync()}
          // disabled={!isEnabledSubmit}
        >
          <Text style={styles.submitText}>
            {loggingIn ? "Wait..." : firstPage ? "Next" : "Sign Up"}
          </Text>
        </TouchableOpacity>

        <View style={styles.registerLink}>
          <Text style={styles.registerText}>Already Have An Account?</Text>
          <Text
            style={styles.registerTextLink}
            onPress={() => navigation.push("Login")}
          >
            Sign In
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  registerForm: {
    height: height,
    width: "100%",
    backgroundColor: "#ffffff",
    paddingVertical: 0,
    paddingHorizontal: 50,
    paddingTop: 40,
  },
  heading: {
    color: "#2E0B5B",
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    marginVertical: 5,
    minHeight: height * 0.5,
  },
  inputContainer: {
    borderColor: "rgba(166, 163, 163, 0.45)",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  inputContainerError: {
    borderColor: "#c51244",
  },
  error: {
    color: "#c51244",
    marginBottom: 20,
  },
  inputLabel: {
    color: "#2E0B5B",
    fontWeight: "500",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 2,
  },
  input: {
    // fontWeight: "bold",
  },
  submit: {
    backgroundColor: "#2E0B5B",
    borderRadius: 10,
    paddingVertical: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  submitText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerLink: {
    marginVertical: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: "#4E4E4E",
    marginRight: 4,
  },
  registerTextLink: {
    color: "#2E0B5B",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
