import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 

const LoginRegisterScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);
      return (
        <ImageBackground
            source={require('./images/background.png')}
            style={styles.background}
        >
            <View style={styles.logoContainer}>
                <Image source={require('./images/ProjectLogo.webp')} style={styles.logo} />
                <Text style={styles.title}>HealthLink</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('RegisterScreen')}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
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
    logoContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
        marginTop: 50
    },
    logo: {
        width: 220,
        height: 220,
        resizeMode: 'contain',
        borderRadius: 100,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#01475D',
    },
    buttonContainer: {
        width: '80%',
        marginBottom: 170,
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#01475D',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
});

export default LoginRegisterScreen;
