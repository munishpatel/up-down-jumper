import React, { useState } from 'react';
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

interface Task {
  id: string;
  title: string;
  day: string;
  completed: boolean;
}

const Tasks: React.FC<TasksProps> = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [tasks, setTasks] = useState<Task[]>([
    // Day 1 Tasks
    {
      id: '1',
      title: 'Watch an intro to vector databases & embeddings basics.',
      day: 'Day 1',
      completed: false,
    },
    {
      id: '2',
      title: 'Learn FAISS indexing: flat index vs IVF vs HNSW',
      day: 'Day 1',
      completed: false,
    },
    {
      id: '3',
      title: 'Set up Python env and load a small dataset for embedding tests.',
      day: 'Day 1',
      completed: false,
    },
    {
      id: '4',
      title: 'Search LinkedIn for "RAG Engineer / Vector DB Engineer" and follow 20 relevant profiles',
      day: 'Day 1',
      completed: false,
    },
    {
      id: '5',
      title: 'Follow up with 3 connections you made at "DataDog World tour"',
      day: 'Day 1',
      completed: false,
    },
    // Day 2 Tasks
    {
      id: '6',
      title: 'Go through Pinecone basics: namespaces, upserts, queries.',
      day: 'Day 2',
      completed: false,
    },
    {
      id: '7',
      title: 'Study best practices for fast vector search in production.',
      day: 'Day 2',
      completed: false,
    },
    {
      id: '8',
      title: 'Test storing 200–500 embeddings in FAISS or Chroma locally.',
      day: 'Day 2',
      completed: false,
    },
    {
      id: '9',
      title: 'Send 5 personalized messages asking how professionals learned vector DBs.',
      day: 'Day 2',
      completed: false,
    },
  ]);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const displayTasks = activeTab === 'active' ? activeTasks : completedTasks;
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

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'active' && styles.activeTab]}
            onPress={() => setActiveTab('active')}
          >
            <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
              Active ({activeTasks.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              Completed ({completedTasks.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Group tasks by day */}
          {['Day 1', 'Day 2'].map((day) => {
            const dayTasks = displayTasks.filter(task => task.day === day);
            if (dayTasks.length === 0) return null;

            return (
              <View key={day} style={styles.section}>
                <Text style={styles.sectionTitle}>{day}</Text>
                
                {dayTasks.map((task) => (
                  <TouchableOpacity
                    key={task.id}
                    style={styles.taskCard}
                    onPress={() => toggleTaskCompletion(task.id)}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={
                        task.completed
                          ? ['rgba(6, 182, 212, 0.15)', 'rgba(6, 182, 212, 0.05)']
                          : ['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
                    />
                    <TouchableOpacity
                      style={styles.taskCheckbox}
                      onPress={() => toggleTaskCompletion(task.id)}
                    >
                      <Ionicons
                        name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
                        size={24}
                        color={task.completed ? '#06b6d4' : '#6b7280'}
                      />
                    </TouchableOpacity>
                    <View style={styles.taskContent}>
                      <Text
                        style={[
                          styles.taskTitle,
                          task.completed && styles.taskTitleCompleted,
                        ]}
                      >
                        {task.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })}

          {displayTasks.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons
                name={activeTab === 'active' ? 'checkmark-done-circle-outline' : 'list-outline'}
                size={80}
                color="#06b6d4"
              />
              <Text style={styles.emptyText}>
                {activeTab === 'active' ? 'All tasks completed!' : 'No completed tasks yet'}
              </Text>
              <Text style={styles.emptySubtext}>
                {activeTab === 'active'
                  ? 'Great job! Add new tasks to continue learning.'
                  : 'Complete tasks to see them here.'}
              </Text>
            </View>
          )}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(6, 182, 212, 0.2)',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderColor: '#06b6d4',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9ca3af',
  },
  activeTabText: {
    color: '#06b6d4',
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
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    overflow: 'hidden',
  },
  taskCheckbox: {
    marginRight: 12,
    marginTop: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 22,
  },
  taskTitleCompleted: {
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
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
