import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import CalendarView from '../Components/CalendarView';
import { getDatabase, ref, onValue } from 'firebase/database';

const ScheduleScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const appointmentsRef = ref(db, 'appointments');

    const unsubscribe = onValue(appointmentsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Appointments data:", data);

      const loadedAppointments = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })) : [];
      setAppointments(loadedAppointments);
    });

    return () => unsubscribe(); 
  }, []);

  const updateAppointments = () => {
    const db = getDatabase();
    const appointmentsRef = ref(db, 'appointments');
  
    onValue(appointmentsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Updated Appointments data:", data);
  
      const updatedAppointments = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })) : [];
      setAppointments(updatedAppointments);
    });
  };
  
  return (
    <View style={styles.container}>
      <CalendarView appointments={appointments} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  addButton: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default ScheduleScreen;

