import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ImageBackground, Alert } from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, push, get, set } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const LoginScreen = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigation = useNavigation(); 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  
  const handleLogin = () => {
    const dummyEmail = `${username}@example.com`; 
    const auth = getAuth();
    console.log("Attempting to log in with:", dummyEmail, password); 
    signInWithEmailAndPassword(auth, dummyEmail, password)
        .then((userCredential) => {
            console.log("Login successful", userCredential); 
            Alert.alert('Login successful');
            navigation.navigate('Calendar');
        })
        .catch((error) => {
            console.error("Login failed:", error); 
            Alert.alert('Login failed', 'Incorrect username or password');
        });
  };
  

  return (
    <ImageBackground
    source={require('./images/background.png')}
    style={styles.background}
    >
    <View style={styles.container}>
      <TextInput 
        placeholder="Username" 
        placeholderTextColor="#000"
        style={styles.input}
        value={username}
        onChangeText={setUsername} 
      />
      <TextInput 
        placeholder="Password" 
        placeholderTextColor="#000"
        secureTextEntry 
        style={styles.input}
        value={password}
        onChangeText={setPassword} 
      />
      <Button title="Submit" onPress={handleLogin} />
      <Text style={styles.registerText}>
        Don't have an account? {/* Added a space here */}
        <Text 
          style={styles.registerLink}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
        Register now!
        </Text>
      </Text>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
},    
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
  },
  registerLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
