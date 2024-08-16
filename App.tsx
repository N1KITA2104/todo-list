import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TaskList from './TaskList';

export default function App() {
  const openLinkedIn = () => {
    Linking.openURL('https://www.linkedin.com/in/nikita-apatiev-037846245/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header_text}>Todo List</Text>
      <TaskList />
      <View style={styles.footer}>
        <Text style={styles.footer_text}>Created by Nikita Apatiev</Text>
        <TouchableOpacity onPress={openLinkedIn}>
          <Text style={styles.link_text}>LinkedIn Profile</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff5555',
    alignItems: 'center',
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  header_text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 12,
    backgroundColor: '#222222',
    width: '100%',
    textAlign: 'center',
  },
  footer: {
    padding: 10,
    backgroundColor: '#222222',
    width: '100%',
    alignItems: 'center',
  },
  footer_text: {
    color: '#fff',
    fontSize: 14,
  },
  link_text: {
    color: '#1E90FF',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});
