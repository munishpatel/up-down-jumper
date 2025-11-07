import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SideMenu from './sideMenu';
import Tasks from './tasks';

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  skills: string;
  timeSpent: string;
  teammates: string;
}

const Projects = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [tasksVisible, setTasksVisible] = useState(false);

  // Sample projects data matching the image
  const projects: Project[] = [
    {
      id: '1',
      title: 'RAG Model for Local-first Web',
      subtitle: 'The Build Fellowship "Build Projects"',
      skills: 'GenAI, RAG, PWA, CRDT\'s',
      timeSpent: '20hrs',
      teammates: 'Shivaji, Ruthwik',
    },
    {
      id: '2',
      title: 'Fine-tuning LLM Model with PEFT',
      subtitle: 'MLH (Major League Hacking)',
      skills: 'OpenAI, qLoRA, PEFT, Unsloth',
      timeSpent: '20hrs',
      teammates: 'Shivaji, Ruthwik',
    },
    {
      id: '3',
      title: 'CloudMart',
      subtitle: 'Excalidraw.io',
      skills: 'Hadoop, EC2, Cloud Runner, AWS',
      timeSpent: '20hrs',
      teammates: 'Shivaji, Ruthwik',
    },
  ];

  return (
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
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tasksButton}
          onPress={() => setTasksVisible(true)}
        >
          <Ionicons name="clipboard" size={28} color="#06b6d4" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Projects</Text>
        <Text style={styles.subtitle}>
          Build your portfolio with hands-on
        </Text>
        
        {/* Projects List */}
        {projects.map((project) => (
          <TouchableOpacity
            key={project.id}
            style={styles.projectCard}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
            />
            
            <View style={styles.projectContent}>
              {/* Project Title */}
              <Text style={styles.projectTitle}>{project.title}</Text>
              
              {/* Project Subtitle */}
              {project.subtitle && (
                <Text style={styles.projectSubtitle}>{project.subtitle}</Text>
              )}
              
              {/* Skills */}
              <View style={styles.projectDetail}>
                <Text style={styles.detailLabel}>Skills: </Text>
                <Text style={styles.detailValue}>{project.skills}</Text>
              </View>
              
              {/* Metrics Section */}
              <View style={styles.metricsSection}>
                <Text style={styles.metricsTitle}>Metrics:</Text>
                
                <View style={styles.metricItem}>
                  <Text style={styles.metricNumber}>1. </Text>
                  <Text style={styles.metricLabel}>Time Spent: </Text>
                  <Text style={styles.metricValue}>{project.timeSpent}</Text>
                </View>
                
                <View style={styles.metricItem}>
                  <Text style={styles.metricNumber}>2. </Text>
                  <Text style={styles.metricLabel}>Teammates: </Text>
                  <Text style={styles.metricValue}>{project.teammates}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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

export default Projects;

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
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 8,
    textShadowColor: 'rgba(6, 182, 212, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 24,
  },
  projectCard: {
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    overflow: 'hidden',
  },
  projectContent: {
    padding: 20,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 24,
  },
  projectSubtitle: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 12,
    lineHeight: 20,
  },
  projectDetail: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  detailValue: {
    fontSize: 14,
    color: '#d1d5db',
    flex: 1,
  },
  metricsSection: {
    marginTop: 8,
  },
  metricsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  metricItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  metricNumber: {
    fontSize: 14,
    color: '#d1d5db',
  },
  metricLabel: {
    fontSize: 14,
    color: '#d1d5db',
  },
  metricValue: {
    fontSize: 14,
    color: '#d1d5db',
  },
});
