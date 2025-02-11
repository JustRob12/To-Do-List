import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { TodoController } from './controllers/TodoController';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TodoController />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
