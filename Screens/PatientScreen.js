import { TouchableOpacity } from 'react-native';
import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import {useNavigation } from "@react-navigation/native";
import { Button } from 'react-native';

const PatientEntry = ({ name, dob, appointment }) => {
  const {navigate} = useNavigation();
  return(
    <TouchableOpacity
      onPress={() => {
        navigate("Patient Details");
      }}
      activeOpacity={0.6}
    >
      <View style={styles.patientEntry}>
        <Text style={styles.patientName}>{name}</Text>
        <Text style={styles.patientDob}>{dob}</Text>
        {appointment && <Text style={styles.appointmentText}>Appointment: {appointment}</Text>}
      </View>
    </TouchableOpacity>
  );
  
 
};

const PatientScreen = () => {
  const { navigate } = useNavigation();
  const patients = [
    // ... your existing patients array ...
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Patients</Text>
      <Button
        title="Add Patient"
        onPress={() => navigate('AddPatient')}
      />
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
