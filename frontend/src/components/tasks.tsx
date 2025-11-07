import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TasksProps {
  visible: boolean;
  onClose: () => void;
}

const Tasks: React.FC<TasksProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Tasks</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today</Text>
            
            <View style={styles.taskCard}>
              <View style={styles.taskCheckbox}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#5B8DEF" />
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>Complete React Native course</Text>
                <Text style={styles.taskTime}>Due: 5:00 PM</Text>
              </View>
            </View>

            <View style={styles.taskCard}>
              <View style={styles.taskCheckbox}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#5B8DEF" />
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>Build portfolio project</Text>
                <Text style={styles.taskTime}>Due: 8:00 PM</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This Week</Text>
            
            <View style={styles.taskCard}>
              <View style={styles.taskCheckbox}>
                <Ionicons name="ellipse-outline" size={24} color="#CCCCCC" />
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>Learn TypeScript basics</Text>
                <Text style={styles.taskTime}>Due: Friday</Text>
              </View>
            </View>

            <View style={styles.taskCard}>
              <View style={styles.taskCheckbox}>
                <Ionicons name="ellipse-outline" size={24} color="#CCCCCC" />
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>Complete coding challenge</Text>
                <Text style={styles.taskTime}>Due: Saturday</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Add Task Button */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add New Task</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  taskCheckbox: {
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 14,
    color: '#666666',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B8DEF',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#5B8DEF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
