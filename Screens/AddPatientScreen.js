import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase with your configuration
/*const firebaseConfig = {
    apiKey: "AIzaSyAS5pTYxjgIy9i9yY4lRhph29GwxrnT0-E",
    authDomain: "csc179-trailmix",
    databaseURL: "https://csc179-trailmix.firebaseio.com",
    projectId: "csc179-trailmix", 
    storageBucket: "csc179-trailmix.appspot.com", 
    messagingSenderId: "812559398282", 
    appId: "1:812559398282:android:b7d1f1aa6afc823064c473", 
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }*/


const AddPatientScreen = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [appointment, setAppointment] = useState('');

  const handleAddPatient = () => {
    // Reference to the /patients node in your Firebase Realtime Database
    const patientsRef = firebase.database().ref('patients');
    
    // Push a new child to the patients node with the patient data
    const newPatientRef = patientsRef.push();
    newPatientRef.set({
      name,
      dob,
      appointment,
    }, (error) => {
      if (error) {
        // The write failed...
        console.error("Failed to add patient: ", error);
      } else {
        // Data saved successfully!
        console.log("Patient added successfully!");
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={styles.input}
        placeholder="Appointment Date"
        value={appointment}
        onChangeText={setAppointment}
      />
      <Button
        title="Add Patient"
        onPress={handleAddPatient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default AddPatientScreen;
