import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import axios from "axios";

export default function SignInScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Ionicons name="md-home" size={130} color="white" />
        <Text style={styles.topTitle}>Welcome</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <View style={styles.underline}></View>

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <View style={styles.underline}></View>

        <TouchableOpacity
          style={{
            height: 44,
            width: 200,
            backgroundColor: "white",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20
          }}
          onPress={async () => {
            try {
              const response = await axios.post(
                "https://airbnb-api.now.sh/api/user/log_in",
                {
                  email: email,
                  password: password
                }
              );

              if (response.data.token) {
                // console.log(response.data.token);
                const userToken = response.data.token;
                props.setToken(userToken);
                alert("login Sucess");
              }
            } catch (error) {
              // ne pas noter error.data.message mais error.message
              alert(error.message);
            }
          }}
        >
          <Text style={styles.textButton}>Sign In</Text>
        </TouchableOpacity>

        {/* bouton création de compte (signUp) */}
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#ff5a5f",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  topContainer: {
    alignItems: "center",
    marginTop: 150,
    flex: 1
  },
  topTitle: {
    fontSize: 50,
    color: "white",
    marginTop: 50
  },
  formContainer: {
    flex: 1,
    alignItems: "center"
  },
  input: {
    height: 44,
    width: 250,
    color: "white",
    fontSize: 20,
    paddingLeft: 20
  },
  underline: {
    backgroundColor: "white",
    height: 1,
    width: 300,
    marginBottom: 40
  },
  textButton: {
    fontSize: 20,
    color: "#ff5a5f"
  }
});
