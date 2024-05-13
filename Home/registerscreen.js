import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, View, TextInput, Button, StyleSheet, Text, ImageBackground, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { getDatabase, ref, push, get, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [country, setCountry] = useState('');
    const [stateProvince, setStateProvince] = useState('');
    const [classification, setClassification] = useState('Doctors');
    const [isPickerVisible, setPickerVisible] = useState(false);

    const handleRegister = () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        if (!username || !password) {
            Alert.alert('Error', 'Username and password are required.');
            return;
        }

        const dummyEmail = `${username}@example.com`;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, dummyEmail, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const db = getDatabase();
                const usersRef = ref(db, 'users/' + user.uid);
                set(usersRef, {
                    username: username,
                    country: country,
                    stateProvince: stateProvince,
                    classification: classification
                }).then(() => {
                    Alert.alert('Success', 'User registered successfully.');
                    navigation.navigate('LoginScreen');
                }).catch((error) => {
                    Alert.alert('Error', 'Failed to save user details.');
                    console.error('Database write failed:', error.message);
                });
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
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
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#000"
                    secureTextEntry
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TextInput
                    placeholder="Country"
                    placeholderTextColor="#000"
                    style={styles.input}
                    value={country}
                    onChangeText={setCountry}
                />
                <TextInput
                    placeholder="State/Province"
                    placeholderTextColor="#000"
                    style={styles.input}
                    value={stateProvince}
                    onChangeText={setStateProvince}
                />
                <Text style={styles.classificationText}>Choose classification below:</Text>
                <TouchableWithoutFeedback onPress={() => setPickerVisible(true)}>
                    <View style={styles.pickerPlaceholder}>
                        <Text style={styles.pickerText}>{classification}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <Modal
                    transparent={true}
                    visible={isPickerVisible}
                    onRequestClose={() => setPickerVisible(false)}
                  >
                    <TouchableWithoutFeedback onPress={() => setPickerVisible(false)}>
                      <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={classification}
                        onValueChange={(itemValue, itemIndex) => {
                          setClassification(itemValue);
                          setPickerVisible(false);
                        }}
                        style={styles.picker}
                      >
                        <Picker.Item label="Doctors" value="Doctors" />
                        <Picker.Item label="Physician Assistants" value="Physician Assistants" />
                        <Picker.Item label="Nurses" value="Nurses" />
                        <Picker.Item label="Nurse Practitioners" value="Nurse Practitioners" />
                      </Picker>
                      </View>
                    </Modal>
                      <Button title="Register" onPress={handleRegister} />
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
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        width: '100%',
      },
    input: {
        borderBottomWidth: 1,
        marginBottom: 20,
        padding: 10,
        width: 300,
        color: '#000',
    },
    pickerPlaceholder: {
        borderBottomWidth: 1,
        marginBottom: 20,
        padding: 10,
        height: 50,
        justifyContent: 'center',
      },
    pickerText: {
        fontSize: 16,
      },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    pickerContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width: '100%',
      },
    picker: {
        backgroundColor: 'white',
      },
    classificationText: {
        fontSize: 16,
        color: '#000', 
        marginBottom: 8, 
        alignSelf: 'flex-start', 
        marginLeft: 65
      },
});

export default RegisterScreen; 
