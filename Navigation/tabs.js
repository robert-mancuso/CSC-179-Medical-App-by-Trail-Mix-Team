import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Calendar, Group, StatsReport } from 'iconoir-react-native';
import { Button, ButtonText, ButtonIcon, AddIcon } from "@gluestack-ui/themed"
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import ScheduleScreen from '../Screens/ScheduleScreen';
import PatientScreen from '../Screens/PatientScreen';
import UpdatesScreen from '../Screens/UpdatesScreen';
import ScheduleAppointmentScreen from '../Screens/ScheduleAppointmentScreen';
import PatientDetailScreen from '../Screens/PatientDetailScreen';
import AddPatientScreen from '../Screens/AddPatientScreen';

const ScheduleStack = createNativeStackNavigator();
const PatientStack = createNativeStackNavigator();

function ScheduleStackGroup({navigation}){
    return(
        <ScheduleStack.Navigator>
             <ScheduleStack.Screen name="Schedule" component={ScheduleScreen}
                initialParams={{ onSaveAppointment: (newAppointment) => {
                }}}
                 options={{
                    headerRight: () => (
                        <Button
                            size="sm"
                            variant="solid"
                            action="primary"
                            isDisabled={false}
                            isFocusVisible={false}
                            onPress={() => {
                                navigation.navigate("Schedule Appointment", {
                                    onSaveAppointment: (newAppointment) => navigation.navigate('Schedule', {
                                        newAppointment: newAppointment
                                })
                            });
                        }}
                        >
                            <ButtonText>Add Appointment </ButtonText>
                            <ButtonIcon as={AddIcon} />
                        </Button>
                    ),
                    headerRightContainerStyle: {
                        padding: 12
                    }
                }}
             />
             <ScheduleStack.Screen name="Schedule Appointment" component={ScheduleAppointmentScreen}/>
        </ScheduleStack.Navigator>
    )
}

function PatientStackGroup({ navigation }) {
    return (
      <PatientStack.Navigator>
        <PatientStack.Screen name="Patients" component={PatientScreen} />
        <PatientStack.Screen name="Patient Details" component={PatientDetailScreen} />
        {/* Add this line for the AddPatientScreen */}
        <PatientStack.Screen name="AddPatient" component={AddPatientScreen} />
      </PatientStack.Navigator>
    );
  }

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        if (route.name === "ScheduleStack") {
                            return <Calendar height={size} width={size} color={color} />
                        } else if (route.name === "Updates") {
                            return <StatsReport height={size} width={size} color={color} />
                        } else if (route.name === "PatientStack") {
                            return <Group height={size} width={size} color={color} />
                        } else {
                            return <View></View>
                        }
                    },
                })}
            >
                <Tab.Screen name="ScheduleStack" component={ScheduleStackGroup}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Schedule"
                    }}
                />
                <Tab.Screen name="Updates" component={UpdatesScreen} />
                <Tab.Screen name="PatientStack" component={PatientStackGroup}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Patients"
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

export default Tabs;
