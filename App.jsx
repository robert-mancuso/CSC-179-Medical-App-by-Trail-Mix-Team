// App.jsx
import React from 'react';
import { GluestackUIProvider} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Navigation/tabs';


function App() {
    return (
        <NavigationContainer> 
            <GluestackUIProvider config={config}>
                <Tabs/>
            </GluestackUIProvider>
        </NavigationContainer>
    );
}

export default App;
