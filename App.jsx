// App.jsx
import React from 'react';
import { GluestackUIProvider} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ScheduleScreen from './Screens/ScheduleScreen';
import PatientScreen from './PatientScreen';
import MyTabBarIcon from './Components/MyTabBarIcon';
import UpdatesScreen from './Screens/UpdatesScreen';

const Tab = createBottomTabNavigator();

function App() {
    return (
        <NavigationContainer> 
            <GluestackUIProvider config={config}>
                <Tab.Navigator>
                    <Tab.Screen 
                        name="Schedule" 
                        component={ScheduleScreen}
                    />
                    <Tab.Screen name="Updates" component={UpdatesScreen} />
                    <Tab.Screen name="Patients" component={PatientScreen} />
                </Tab.Navigator>
            </GluestackUIProvider>
        </NavigationContainer>
    );
}

export default App;
