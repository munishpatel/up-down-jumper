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

const Upload = () => {
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
        <Text style={styles.title}>Upload</Text>
        <Text style={styles.subtitle}>
          Share your progress and achievements
        </Text>
        
        {/* Placeholder content */}
        <View style={styles.uploadCard}>
          <Ionicons name="cloud-upload-outline" size={60} color="#5B8DEF" />
          <Text style={styles.uploadText}>Upload Your Work</Text>
          <Text style={styles.uploadSubtext}>
            Share projects, code, or documents
          </Text>
          
          <TouchableOpacity style={styles.uploadButton}>
            <Ionicons name="add-circle" size={24} color="#FFFFFF" />
            <Text style={styles.uploadButtonText}>Choose File</Text>
          </TouchableOpacity>
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

export default Upload;

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
  uploadCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginTop: 20,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    marginBottom: 30,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5B8DEF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
