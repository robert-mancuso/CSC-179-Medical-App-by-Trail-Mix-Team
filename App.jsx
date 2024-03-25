// App.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './DashboardScreen'; // Assume this is the path to your component
import ScheduleAppointmentScreen from './ScheduleAppointmentScreen'; // And this one too
import PatientScreen from './PatientScreen';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Doctor\'s Dashboard' }} />
                <Stack.Screen name="ScheduleAppointment" component={ScheduleAppointmentScreen} options={{ title: 'Schedule Appointment' }} />
                <Stack.Screen name="Patient List" component={PatientScreen} options={{ title: 'Patient List' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
