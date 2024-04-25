import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
// Import the database functions from Firebase
import { getDatabase, ref, push, set } from 'firebase/database';

const AddPatientScreen = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [appointment, setAppointment] = useState('');

  const handleAddPatient = () => {
    // Get a reference to the database
    const database = getDatabase();
    // Create a reference to the 'patients' node
    const patientsRef = ref(database, 'patients');
    
    // Push a new child to the 'patients' node with the patient data
    const newPatientRef = push(patientsRef);
    set(newPatientRef, {
      name,
      dob,
      appointment,
    }).then(() => {
      // Data saved successfully!
      console.log("Patient added successfully!");
    }).catch((error) => {
      // The write failed...
      console.error("Failed to add patient: ", error);
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
