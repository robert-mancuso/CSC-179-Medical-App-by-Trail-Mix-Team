import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, update } from 'firebase/database';

const PatientDetailScreen = () => {
  const route = useRoute();
  const { id, name: initialName, dob: initialDob, appointment: initialAppointment, allergies: initialAllergies, family: initialFamily } = route.params;
  const [editedName, setEditedName] = useState(initialName);
  const [editedDob, setEditedDob] = useState(initialDob);
  const [editedAppointment, setEditedAppointment] = useState(initialAppointment);
  const [editedAllergies, setEditedAllergies] = useState(initialAllergies.join(', '));
  const [editedFamily, setEditedFamily] = useState(initialFamily);
  const { navigate } = useNavigation();

  const updatePatient = () => {
    const updatedPatient = {
      name: editedName,
      dob: editedDob,
      appointment: editedAppointment,
      allergies: editedAllergies.split(',').map(item => item.trim()),
      family: editedFamily,
    };
  
    const database = getDatabase();
    const patientRef = ref(database, `patients/${id}`); // Ensure 'id' is the correct patient ID
  
    update(patientRef, updatedPatient)
      .then(() => {
        console.log('Patient data updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating patient data:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Patient Details</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Name:</Text>
        <TextInput
          style={styles.detailInput}
          value={editedName}
          onChangeText={setEditedName}
        />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Date of Birth:</Text>
        <TextInput
          style={styles.detailInput}
          value={editedDob}
          onChangeText={setEditedDob}
        />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Appointment:</Text>
        <TextInput
          style={styles.detailInput}
          value={editedAppointment}
          onChangeText={setEditedAppointment}
        />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Allergies:</Text>
        <TextInput
          style={styles.detailInput}
          value={editedAllergies}
          onChangeText={setEditedAllergies}
        />
      </View>
      <Button title="Save" onPress={updatePatient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  detailInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default PatientDetailScreen;
