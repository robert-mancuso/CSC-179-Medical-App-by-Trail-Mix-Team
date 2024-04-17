import React from 'react';
import { GluestackUIProvider} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Navigation/tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './DashboardScreen';
import ScheduleAppointmentScreen from './ScheduleAppointmentScreen';
import PatientScreen from './PatientScreen';
import LoginScreen from './Home/loginscreen'; 
import RegisterScreen from './Home/registerscreen'; 
import LoginRegisterScreen from './Home/login-register';
const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginRegisterScreen">
                <Stack.Screen name="LoginRegisteScreen" component={LoginRegisterScreen} options={{ title: 'LoginRegisterScreen' }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'LoginScreen' }} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'RegisterScreen' }} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Doctor\'s Dashboard' }} />
                <Stack.Screen name="ScheduleAppointment" component={ScheduleAppointmentScreen} options={{ title: 'Schedule Appointment' }} />
                <Stack.Screen name="Patient List" component={PatientScreen} options={{ title: 'Patient List' }} />
            </Stack.Navigator>
            <GluestackUIProvider config={config}>
                <Tabs/>
            </GluestackUIProvider>
        </NavigationContainer>
    );
}
export default App;
