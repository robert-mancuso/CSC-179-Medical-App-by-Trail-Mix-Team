import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

const UpdatesScreen = () => {
      const [updates, setUpdates] = useState([]);

        const sampleUpdates = [
          { id: 1, message: 'Appointment Updated', date: '2024-08-13 10:00:00' },
          { id: 2, message: 'Appointment Canceled', date: '2024-04-08 10:30:00' },
          { id: 3, message: 'Patient Profile Created', date: '2024-04-07 09:45:00' },
          { id: 4, message: 'Appointment Updated', date: '2024-03-30 08:00:00' },
        ];

        useEffect(() => {
          const fetchData = () => {
            setTimeout(() => {
              setUpdates(sampleUpdates);
            }, 1000);
          };

          fetchData();
        }, []);

        const renderUpdateItem = ({ item }) => (
          <View style={styles.updateItem}>
            <Text style={styles.appointmentUpdate}>{item.message}</Text>
            <Text style={styles.updateDate}>{item.date}</Text>
          </View>
        );

        return (
          <View style={styles.container}>
            <Text style={styles.header}>Updates</Text>
            <FlatList
              data={updates}
              renderItem={renderUpdateItem}
              ItemSeparatorComponent = { this.FlatListItemSeparator }
              keyExtractor={item => item.id.toString()}
            />
          </View>
        );
      };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    scrollView: {
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    updateItem: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 10,
    },
    appointmentUpdate: {
        fontSize: 16,
        color: '#000',
    },
});

  export default UpdatesScreen;