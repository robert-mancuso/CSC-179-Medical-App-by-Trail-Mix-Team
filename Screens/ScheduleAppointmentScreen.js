import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Platform, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDatabase, ref, push } from 'firebase/database';

const ScheduleAppointmentScreen = ({ navigation }) => {
    const [appointmentTitle, setAppointmentTitle] = useState('');
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || appointmentDate;
        setShow(Platform.OS === 'ios');
        setAppointmentDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const handleSaveAppointment = () => {
        if (!appointmentTitle || !location) {
            Alert.alert('Missing Information', 'Title and location are required.', [
                { text: 'OK' }
            ]);
            return; 
        }
    
        const utcDate = new Date(appointmentDate.getTime() - (appointmentDate.getTimezoneOffset() * 60000));
        const dateToSave = utcDate.toISOString(); 

    saveAppointmentToFirebase({
        title: appointmentTitle,
        date: dateToSave,
        location: location,
        notes: notes
    });
};
    

    const saveAppointmentToFirebase = (appointment) => {
        const db = getDatabase();
        const appointmentsRef = ref(db, 'appointments');
        push(appointmentsRef, appointment)
            .then(() => {
                Alert.alert('Success', 'Appointment saved successfully.');
                navigation.goBack();
            })
            .catch(error => {
                Alert.alert('Error', 'Failed to save appointment.');
                console.error('Save appointment failed: ', error.message);
            });
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
            <View style={styles.innerContainer}>
                <Text style={styles.label}>Appointment Title:</Text>
                <TextInput
                    style={styles.input}
                    value={appointmentTitle}
                    onChangeText={setAppointmentTitle}
                    placeholder="Enter appointment title"
                />

                <Button title="Choose Date" onPress={() => showMode('date')} />
                <Text>Date: {appointmentDate.toLocaleDateString()}</Text>
                <Button title="Choose Time" onPress={() => showMode('time')} />
                <Text>Time: {appointmentDate.toLocaleTimeString()}</Text>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={appointmentDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onDateChange}
                    />
                )}

                <Text style={styles.label}>Location:</Text>
                <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Enter location"
                />

                <Text style={styles.label}>Notes:</Text>
                <TextInput
                    style={styles.input}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Enter any notes"
                    multiline
                />

                <Button title="Save Appointment" onPress={handleSaveAppointment} color="#007AFF" />
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    label: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
    },
});

export default ScheduleAppointmentScreen;
