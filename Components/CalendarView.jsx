import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda, CalendarProvider } from 'react-native-calendars';
import { getDatabase, ref, remove } from 'firebase/database';


const today = new Date();
const INITIAL_DATE = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

const CalendarView = ({ appointments }) => {
  const [items, setItems] = useState({});

  useEffect(() => {
    loadItems({ timestamp: new Date().getTime() }); 
  }, []);

  useEffect(() => {
    const appointmentItems = {};
    appointments.forEach(appointment => {
        const utcDate = new Date(appointment.date); 

        const dateKey = utcDate.toISOString().split('T')[0];

        if (!appointmentItems[dateKey]) {
            appointmentItems[dateKey] = [];
        }
        appointmentItems[dateKey].push({
            id: appointment.id,
            name: `${appointment.title} at ${utcDate.toLocaleTimeString('en-US', {timeZone: 'UTC'})}`,
            date: utcDate.toLocaleDateString('en-US', {timeZone: 'UTC'}),
            time: utcDate.toLocaleTimeString('en-US', {timeZone: 'UTC'}),
            notes: appointment.notes || "No notes",
            height: 50,
            day: dateKey
        });
    });
    setItems(prevItems => ({...prevItems, ...appointmentItems}));
}, [appointments]);



const loadItems = (day) => {
  setTimeout(() => { 
    setItems(prevItems => {
      const newItems = {...prevItems};  // Copy the current items state
      const time = new Date(day.timestamp);

      for (let i = -15; i < 85; i++) {
        const date = new Date(time);
        date.setDate(date.getDate() + i);
        const strTime = date.toISOString().split('T')[0];
        if (!newItems[strTime]) {
            newItems[strTime] = [];  // Initialize with empty array if not already set
        }
      }
      return newItems;
    });
  }, 1000);
};



  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const renderItem = (appointment, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    const handleDelete = (id) => {
      console.log("Attempting to delete ID:", id); 
  
      const db = getDatabase();
      const appointmentRef = ref(db, `appointments/${id}`);
      
      remove(appointmentRef)
          .then(() => {
              console.log("Firebase: Appointment deleted successfully");
  
              setItems(prevItems => {
                  const updatedItems = {...prevItems};
                  Object.keys(updatedItems).forEach(date => {
                      const originalLength = updatedItems[date].length; 
                      updatedItems[date] = updatedItems[date].filter(item => {
                          return item.id !== id; 
                      });
                      console.log(`Date: ${date}, Original Length: ${originalLength}, New Length: ${updatedItems[date].length}`);
                  });
                  return updatedItems;
              });
          })
          .catch((error) => {
              console.error("Error deleting appointment:", error.message);
          });
  };

    return (
        <TouchableOpacity
            style={[styles.item, { height: appointment.height }]}
            onPress={() => {
                Alert.alert(
                    "Appointment Details",
                    `Name: ${appointment.name}\nDate: ${appointment.date}\nTime: ${appointment.time}\nNotes: ${appointment.notes}`,
                    [
                        { text: 'Close', style: 'cancel' },
                        { text: 'Delete', onPress: () => handleDelete(appointment.id) },
                    ],
                    { cancelable: false }
                );
            }}
        >
            <Text style={{ fontSize, color }}>{appointment.name}</Text>
        </TouchableOpacity>
    );
};

  

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is an empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  return (
    <CalendarProvider>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={INITIAL_DATE}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
      />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green'
  },
  dayItem: {
    marginLeft: 34
  }
});

export default CalendarView;
