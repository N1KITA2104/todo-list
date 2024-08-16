import React, { useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Task } from './types';
import { styles } from './styles';

interface TaskItemProps {
  task: Task;
  removeTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  editTask: (id: string, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = React.memo(({ task, removeTask, toggleTaskCompletion, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = useCallback(() => {
    if (isEditing) {
      if (newText.trim() === '') {
        alert('Task text cannot be empty.');
        return;
      }
      editTask(task.id, newText);
    }
    setIsEditing(prev => !prev);
  }, [isEditing, newText, editTask, task.id]);

  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTaskCompletion(task.id)}>
        <FontAwesome
          name={task.completed ? 'check-square' : 'square-o'}
          size={24}
          color={task.completed ? '#2ecc71' : '#333'}
        />
      </TouchableOpacity>
      {isEditing ? (
        <TextInput
          style={styles.taskTextInput}
          value={newText}
          onChangeText={setNewText}
        />
      ) : (
        <Text style={[styles.taskText, task.completed && styles.completedText]}>
          {task.text}
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
          <FontAwesome
            name={isEditing ? 'save' : 'edit'}
            size={24}
            color="#1E90FF"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeTask(task.id)} style={styles.iconButton}>
          <FontAwesome
            name="trash"
            size={24}
            color="#ff6347"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default TaskItem;
