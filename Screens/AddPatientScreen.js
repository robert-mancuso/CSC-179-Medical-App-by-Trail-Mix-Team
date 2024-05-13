import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
import RNPickerSelect from 'react-native-picker-select';

const AddPatientScreen = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [appointment, setAppointment] = useState('');
  const [allergies, setAllergies] = useState('');
  const [family, setFamily] = useState('No');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const patientsRef = ref(database, 'patients');

    onValue(patientsRef, (snapshot) => {
      const data = snapshot.val();
      const patientList = data ? Object.keys(data).map(key => ({
        label: data[key].name,
        value: key,
      })) : [];
      setPatients(patientList);
    });
  }, []);

  const handleAddPatient = () => {
    const database = getDatabase();
    const patientsRef = ref(database, 'patients');
    const newPatientRef = push(patientsRef);
    set(newPatientRef, {
      name,
      dob,
      appointment,
      allergies: allergies.split(',').map(item => item.trim()),
      family: family === 'Yes' ? familyMembers : [],
    }).then(() => {
      console.log("Patient added successfully!");
    }).catch((error) => {
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
      <TextInput
        style={styles.input}
        placeholder="Allergies (comma-separated)"
        value={allergies}
        onChangeText={setAllergies}
      />
      <Text>Is the patient part of a family?</Text>
      <RNPickerSelect
        onValueChange={(value) => setFamily(value)}
        items={[
            { label: 'No', value: 'No' },
            { label: 'Yes', value: 'Yes' },
        ]}
      />
      {family === 'Yes' && (
        <>
          <Text>Select Family Members:</Text>
          <RNPickerSelect
            onValueChange={(value) => setFamilyMembers([...familyMembers, value])}
            items={patients.filter(patient => !familyMembers.includes(patient.value))}
          />
          <Text>Remove Family Members:</Text>
          <RNPickerSelect
            onValueChange={(value) => setFamilyMembers(familyMembers.filter(member => member !== value))}
            items={patients.filter(patient => familyMembers.includes(patient.value))}
          />
        </>
      )}
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
