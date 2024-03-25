import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

const PatientEntry = ({ name, dob, appointment }) => (
  <View style={styles.patientEntry}>
    <Text style={styles.patientName}>{name}</Text>
    <Text style={styles.patientDob}>{dob}</Text>
    {appointment && <Text style={styles.appointmentText}>Appointment: {appointment}</Text>}
  </View>
);

const PatientScreen = () => {
  const patients = [
    { name: 'John Smith', dob: 'Jan 18, 1988', appointment: 'August 13, 2024' },
    { name: 'Jane Doe', dob: 'May 2, 1997', appointment: 'March 30, 2024' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Patients</Text>
      <FlatList
        data={patients}
        renderItem={({ item }) => <PatientEntry {...item} />}
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
});

export default PatientScreen;
