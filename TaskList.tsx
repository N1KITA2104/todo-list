import React, { useState, useCallback } from 'react';
import { View, FlatList, TextInput, Button } from 'react-native';
import TaskItem from './TaskItem';
import { Task } from './types';
import { styles } from './styles';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim()) {
      setTasks(prevTasks => [
        ...prevTasks,
        { id: Date.now().toString(), text: taskText, completed: false },
      ]);
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
