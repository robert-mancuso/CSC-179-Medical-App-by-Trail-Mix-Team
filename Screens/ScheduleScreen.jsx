import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarView from '../Components/CalendarView';

const ScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <CalendarView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});

export default ScheduleScreen;
