import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export default function SignUp() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
        const response = await axios.post('http://192.168.1.5:5001/register', { username, password });
        if (response.data.status === "ok") {
            alert("User Registered Successfully");
            console.log("User Registered Successfully");
            navigation.navigate('index');
        } else {
            alert("Registration Failed");
        }
    } catch (error) {
        console.error(error);
        alert("Error occurred during registration");
    }
};

     
     
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Username"  value={username}
        onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry   value={password}
        onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('index')}>
        <Text style={styles.hyperlink}>
          Already have an account? <Text style={styles.hyperlinkText}>Login here</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  hyperlink: {
    textAlign: "center",
    color: "black",
  },
  hyperlinkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
