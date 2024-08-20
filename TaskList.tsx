import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './TaskItem';
import { Task } from './types';
import { styles } from './styles';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');

  // Load tasks from AsyncStorage when component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksString = await AsyncStorage.getItem('tasks');
        if (tasksString) {
          setTasks(JSON.parse(tasksString));
        }
      } catch (error) {
        console.error('Failed to load tasks from AsyncStorage', error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks to AsyncStorage', error);
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim()) {
      const newTask = { id: Date.now().toString(), text: taskText, completed: false };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setTaskText('');
    }
  };

  const removeTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const toggleTaskCompletion = useCallback((id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const editTask = useCallback((id: string, newText: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a task..."
        value={taskText}
        onChangeText={setTaskText}
      />
      <Button title="Add Task" onPress={addTask} color="#222222" />
      <FlatList
        style={styles.tasks_container}
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            removeTask={removeTask}
            toggleTaskCompletion={toggleTaskCompletion}
            editTask={editTask}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
