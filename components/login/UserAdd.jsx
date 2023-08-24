import React, { useState } from "react";
import { View, TextInput, Button, Alert, AsyncStorage } from "react-native";

function UserAdd({ navigation }) {
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://192.168.68.75:1919/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, password }),
    });

    const data = response.status;
    console.log(data);

    if (data == 200) {
      Alert.alert("회원가입 성공!", "회원가입이 완료되었습니다!", [
        {
          text: "로그인",
          onPress: () => navigation.navigate("Log"),
        },
      ]);
    } else if (data == 409) {
      Alert.alert(
        "아이디 중복",
        "아이디가 중복되었습니다.\n다른 아이디를 사용해주세요."
      );
    } else if (data == 400) {
      Alert.alert(
        "입력된 내용이 없습니다.",
        "아이디, 비밀번호를 입력해주세요."
      );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <TextInput
        value={user_id}
        onChangeText={setUser_id}
        placeholder="새 ID"
        style={{ padding: 10, borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{ padding: 10, borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="회원가입" onPress={handleLogin} />
    </View>
  );
}

export default UserAdd;
