import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';
import PatientScreen from './PatientScreen';

const DashboardScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Doctor's Dashboard</Text>
            <ScrollView style={styles.scrollView}>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Upcoming Appointments</Text>
                    {/* Placeholder for appointments list */}
                    <Text>Appointment 1</Text>
                    <Text>Appointment 2</Text>
                    <Text>More...</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Recent Patient Updates</Text>
                    {/* Placeholder for patient updates */}
                    <Text>Update 1</Text>
                    <Text>Update 2</Text>
                    <Text>More...</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Appointment Scheduling</Text>
                    <Button title="View Schedule" onPress={() => {}} />
                    <Button title="Schedule Appointment" onPress={() => navigation.navigate('ScheduleAppointment')} />
                    <Button title="Manage Appointments" onPress={() => {}} />
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Patient Search</Text>
                    <Button title="Patient List" onPress={() => navigation.navigate('Patient List')} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollView: {
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
});

export default DashboardScreen;