import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

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
    // login logic here
    // check the username and password against authentication service
    const correctUsername = 'test123';
    const correctPassword = 'pwtest';
    if (username === correctUsername && password === correctPassword) {
      console.log('Login successful');
      navigation.navigate('Calendar');
    } else {
      console.log('Login failed: Incorrect username or password');    
      // navigation.navigate('Dashboard');
    }
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
