import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database';

const PatientScreen = () => {
  const [patients, setPatients] = useState([]);
  const navigation = useNavigation();
  const { navigate } = useNavigation();

  useEffect(() => {
    const database = getDatabase();
    const patientsRef = ref(database, 'patients');

    // Listen for changes in the 'patients' node of the database
    const unsubscribe = onValue(patientsRef, (snapshot) => {
      const data = snapshot.val();
      const patientList = data ? Object.keys(data).map(key => ({
        ...data[key],
        id: key, // Ensure each patient has an 'id' property
        familyNames: data[key].family ? data[key].family.map(id => data[id].name) : [], // Replace family IDs with names
      })) : [];
      setPatients(patientList);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const renderPatient = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        // Pass the patient's ID and other details to the PatientDetailScreen
        navigation.navigate('Patient Details', { ...item });
      }}
      style={styles.patientEntry}
    >
      <Text style={styles.patientName}>{item.name}</Text>
      <Text style={styles.patientDob}>{item.dob}</Text>
      {item.appointment && <Text style={styles.appointmentText}>Appointment: {item.appointment}</Text>}
      {item.allergies && <Text style={styles.allergiesText}>Allergies: {item.allergies.join(', ')}</Text>}
      {item.familyNames && <Text style={styles.familyText}>Family: {item.familyNames.join(', ')}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Patients</Text>
      <Button
        title="Add Patient"
        onPress={() => navigate('AddPatient')}
      />
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={renderPatient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  patientEntry: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  patientName: {
    fontSize: 16,
  },
  patientDob: {
    fontSize: 12,
    color: '#888',
  },
  appointmentText: {
    color: '#008000',
  },
  allergiesText: {
    color: '#ff0000',
  },
  familyText: {
    color: '#0000ff',
  },
});

export default PatientScreen;
