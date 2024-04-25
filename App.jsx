import React from 'react';
import { GluestackUIProvider} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import Tabs from './Navigation/tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Home/loginscreen'; 
import RegisterScreen from './Home/registerscreen'; 
import LoginRegisterScreen from './Home/login-register';
const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="LoginRegisterScreen"
        screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} options={{ title: 'LoginRegisterScreen' }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'LoginScreen' }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'RegisterScreen' }} />
            <Stack.Screen name="Calendar" component={Tabs} options={{ title: 'Calendar Schedule' }} />
        </Stack.Navigator>
    );
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (
        <NavigationContainer>
            <GluestackUIProvider config={config}>
                { isAuthenticated ? <Tabs/> : <AuthStack/> }
            </GluestackUIProvider>
        </NavigationContainer>
    );
}
export default App;
