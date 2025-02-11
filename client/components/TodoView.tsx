import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoViewProps {
  todos: { id: number; text: string; completed: boolean }[];
  onAdd: (text: string) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export const TodoView: React.FC<TodoViewProps> = ({ todos, onAdd, onDelete, onToggle }) => {
  const [newTodo, setNewTodo] = React.useState('');

  const handleSubmit = () => {
    if (newTodo.trim()) {
      onAdd(newTodo.trim());
      setNewTodo('');
    }
  };

  const renderItem = ({ item: todo }: { item: Todo }) => (
    <View style={[styles.todoItem, todo.completed && styles.completedTodo]}>
      <TouchableOpacity 
        style={styles.checkbox} 
        onPress={() => onToggle(todo.id)}
      >
        {todo.completed && <Text>✓</Text>}
      </TouchableOpacity>
      <Text style={[styles.todoText, todo.completed && styles.completedText]}>
        {todo.text}
      </Text>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add new todo"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2c3e50',
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginRight: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 12,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 13,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
  },
  completedTodo: {
    backgroundColor: '#f8f9fa',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#95a5a6',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
}); 