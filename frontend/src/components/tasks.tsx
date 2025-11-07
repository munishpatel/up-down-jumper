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
import { LinearGradient } from 'expo-linear-gradient';
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
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={['rgba(59, 130, 246, 0.08)', 'rgba(139, 92, 246, 0.05)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Tasks</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
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
              <LinearGradient
                colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
              />
              <View style={styles.taskCheckbox}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#06b6d4" />
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>Complete React Native course</Text>
                <Text style={styles.taskTime}>Due: 5:00 PM</Text>
              </View>
            </View>

            <View style={styles.taskCard}>
              <LinearGradient
                colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
              />
              <View style={styles.taskCheckbox}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#06b6d4" />
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
              <LinearGradient
                colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
              />
              <View style={styles.taskCheckbox}>
                <Ionicons name="ellipse-outline" size={24} color="#6b7280" />
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>Learn TypeScript basics</Text>
                <Text style={styles.taskTime}>Due: Friday</Text>
              </View>
            </View>

            <View style={styles.taskCard}>
              <LinearGradient
                colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
              />
              <View style={styles.taskCheckbox}>
                <Ionicons name="ellipse-outline" size={24} color="#6b7280" />
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>Complete coding challenge</Text>
                <Text style={styles.taskTime}>Due: Saturday</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Add Task Button */}
        <View style={styles.addButtonContainer}>
          <TouchableOpacity>
            <LinearGradient
              colors={['#06b6d4', '#3b82f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addButton}
            >
              <Ionicons name="add-circle" size={24} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add New Task</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(6, 182, 212, 0.2)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#06b6d4',
    textShadowColor: 'rgba(6, 182, 212, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
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
    color: '#FFFFFF',
    marginBottom: 16,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    overflow: 'hidden',
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
    color: '#FFFFFF',
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 14,
    color: '#9ca3af',
  },
  addButtonContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#06b6d4',
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
