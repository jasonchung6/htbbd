import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  AsyncStorage,
  Text,
} from "react-native";

function UserLogin({ navigation }) {
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://192.168.68.75:1919/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, password }),
    });

    const data = response.status;
    console.log(data);
    console.log(response.text);

    if (data == 200) {
      await AsyncStorage.setItem("UserID", user_id);
      const value = await AsyncStorage.getItem("UserID");
      console.log(value);
      Alert.alert("성공");
    } else {
      Alert.alert("로그인 실패", "아이디 비밀번호를 다시 확인해주세요.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#EDF1D6",
      }}
    >
      <Text
        style={{
          color: "#40513B",
          fontSize: 25,
          fontFamily: "Inter",
          fontWeight: "800",
          wordWrap: "break-word",
        }}
      >
        FIRE SECURITY
      </Text>

      <TextInput
        value={user_id}
        onChangeText={setUser_id}
        placeholder="ID"
        style={{ padding: 10, borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{ padding: 10, borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="로그인" onPress={handleLogin} />
      <Button title="회원 가입" onPress={() => navigation.navigate("Add")} />
    </View>
  );
}

export default UserLogin;
