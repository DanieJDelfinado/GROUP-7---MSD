import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { green } from 'react-native-reanimated/lib/typescript/Colors'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function index() {
  
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
    
    const validateInputs = () => {

      let errors = {};

       if (!username) errors.username = "Please fill out this form!";
        if (!password) errors.password = "Please fill out this form!";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    } 

    const handleLogin = async () => {
      if (validateInputs()) {
        
        try {
          const response = await axios.post('http://192.168.1.5:5001/userlogin', {
            username,
            password,
          });

           if (response.data.status === "ok") {
            console.log('Login Successful: ', response.data.data)
            navigation.navigate('Home');
           } else{
            console.error('Login Failed:', response.data.data);
            alert(response.data.data);
           }

        } catch (error) {
          console.error('Error during login', error.message);
          alert("Something went wrong. Please try again.");
        }
           
       
      }
    };

  return (

    <View style = {styles.container}>
      <Text style={styles.header1}>Task Manager App</Text>
     
      <Text style={styles.space}></Text>
      <Text style={styles.space}></Text>

      <Text style = {styles.label}>Username:</Text>
      <TextInput style = {styles.input}  value={username} onChangeText={setUsername}>

      </TextInput>

        {errors.username && <Text style = {styles.error}> {errors.username} </Text>}

      <Text style = {styles.label}>Password:</Text>
      <TextInput style = {styles.input}  secureTextEntry={true}  value={password} onChangeText={setPassword}>

      </TextInput>
      {errors.password && <Text style = {styles.error}> {errors.password} </Text>}
     
      <Text style={styles.space}></Text>
      <Text style={styles.space}></Text>

      <TouchableOpacity onPress={handleLogin} style = {styles.button}>
     <Text style = {{color: "white", textAlign: "center"}}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.hyperlink}>
          Don't have an account? <Text style={styles.hyperlinkText}>Sign up here</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}


  const styles = StyleSheet.create({

      header1: {
         fontSize: 24,
         color: "green",
         marginTop: 60
      },
      
      container: {
       
        flex: 1,
    
      
        backgroundColor: "white"
       
      },

        space:{
          height: 20
        },

        label: {
             
          marginLeft: 10,
          fontSize: 18
        },

        input:{

          borderRadius: 50,
          width: "75%",
          borderWidth: 1,
          padding: 9,
          marginLeft: 10,
        },

        button: {
            backgroundColor: "green",
            borderRadius: 50,
            padding: 9,
            marginLeft: 10,
            width: "75%",
        },

        hyperlink: {
          textAlign: "center",
          color: "black",
        },
        hyperlinkText: {
          color: "blue",
          textDecorationLine: "underline",
        },

        error: {
          color: 'red',
          marginLeft: 10,
          fontSize: 14,
        },
  })