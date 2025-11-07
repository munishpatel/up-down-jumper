import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import SideMenu from './sideMenu';
import Tasks from './tasks';
import { useVideos } from '../context/VideosContext';

const Upload = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [tasksVisible, setTasksVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { addVideo, videos } = useVideos();

  const handlePickVideo = async () => {
    try {
      setUploading(true);
      
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setUploading(false);
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        
        // Create new video object
        const newVideo = {
          id: `${videos.length + 1}`,
          uri: { uri: file.uri },
          title: `Learning Byte ${videos.length + 1}`,
          description: 'User uploaded content',
          isUserUploaded: true,
        };

        // Add video to context
        addVideo(newVideo);
        
        setUploading(false);
        
        Alert.alert(
          'Success!',
          'Your video has been uploaded successfully! Check the Bytes tab to view it.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      setUploading(false);
      Alert.alert(
        'Upload Failed',
        'There was an error uploading your video. Please try again.',
        [{ text: 'OK' }]
      );
      console.error('Error picking video:', error);
    }
  };

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
        <Text style={styles.title}>Upload</Text>
        <Text style={styles.subtitle}>
          Share your progress and achievements
        </Text>
        
        {/* Placeholder content */}
        <View style={styles.uploadCard}>
          <LinearGradient
            colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
          />
          <Ionicons 
            name={uploading ? "hourglass-outline" : "cloud-upload-outline"} 
            size={60} 
            color="#06b6d4" 
          />
          <Text style={styles.uploadText}>
            {uploading ? 'Uploading...' : 'Upload Your Video'}
          </Text>
          <Text style={styles.uploadSubtext}>
            {uploading 
              ? 'Please wait while we process your video' 
              : 'Share your learning journey with video content'}
          </Text>
          
          <TouchableOpacity 
            onPress={handlePickVideo}
            disabled={uploading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={uploading ? ['#6b7280', '#9ca3af'] : ['#06b6d4', '#3b82f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.uploadButton}
            >
              <Ionicons 
                name={uploading ? "sync" : "videocam"} 
                size={24} 
                color="#FFFFFF" 
              />
              <Text style={styles.uploadButtonText}>
                {uploading ? 'Uploading...' : 'Choose Video'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Uploaded Videos Info */}
        {videos.length > 3 && (
          <View style={styles.infoCard}>
            <LinearGradient
              colors={['rgba(6, 182, 212, 0.1)', 'rgba(59, 130, 246, 0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
            />
            <Ionicons name="checkmark-circle" size={32} color="#06b6d4" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                {videos.length - 3} video(s) uploaded
              </Text>
              <Text style={styles.infoText}>
                View your uploaded videos in the Bytes tab
              </Text>
            </View>
          </View>
        )}
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
    marginBottom: 40,
  },
  uploadCard: {
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  uploadText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 20,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    marginBottom: 30,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    overflow: 'hidden',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#06b6d4',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#9ca3af',
  },
});
