import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SideMenu from './sideMenu';
import Tasks from './tasks';

const Events = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [tasksVisible, setTasksVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="menu" size={28} color="#000000" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tasksButton}
          onPress={() => setTasksVisible(true)}
        >
          <Ionicons name="clipboard" size={28} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Events</Text>
        <Text style={styles.subtitle}>
          Networking and learning opportunities
        </Text>
        
        {/* Placeholder content */}
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={80} color="#CCCCCC" />
          <Text style={styles.emptyText}>No events scheduled</Text>
          <Text style={styles.emptySubtext}>
            Upcoming webinars, workshops, and meetups will appear here
          </Text>
        </View>
      </ScrollView>

      {/* Side Menu */}
      <SideMenu 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />

      {/* Tasks Modal */}
      <Tasks 
        visible={tasksVisible} 
        onClose={() => setTasksVisible(false)} 
      />
    </View>
  );
};

export default Events;

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
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasksButton: {
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999999',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BBBBBB',
    marginTop: 8,
    textAlign: 'center',
  },
});
