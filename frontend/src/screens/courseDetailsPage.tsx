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

interface CourseContent {
  id: string;
  title: string;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  provider: string;
  progress: number;
  totalContent: number;
  completedContent: number;
}

interface CourseDetailsProps {
  course: Course;
  onBack: (updatedCourse: Course) => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onBack }) => {
  // Sample course content
  const [contents, setContents] = useState<CourseContent[]>([
    { id: '1', title: 'Introduction to the Course', completed: false },
    { id: '2', title: 'Setting Up Your Environment', completed: false },
    { id: '3', title: 'Core Concepts Overview', completed: false },
    { id: '4', title: 'Hands-on Tutorial Part 1', completed: false },
    { id: '5', title: 'Hands-on Tutorial Part 2', completed: false },
    { id: '6', title: 'Advanced Techniques', completed: false },
    { id: '7', title: 'Best Practices', completed: false },
    { id: '8', title: 'Real-world Applications', completed: false },
    { id: '9', title: 'Common Pitfalls to Avoid', completed: false },
    { id: '10', title: 'Final Project', completed: false },
  ]);

  const handleToggleContent = (contentId: string) => {
    const updatedContents = contents.map(content =>
      content.id === contentId
        ? { ...content, completed: !content.completed }
        : content
    );
    
    setContents(updatedContents);
    
    // Calculate progress
    const completedCount = updatedContents.filter(c => c.completed).length;
    const totalCount = updatedContents.length;
    const progress = Math.round((completedCount / totalCount) * 100);
    
    // Update course progress
    const updatedCourse = {
      ...course,
      progress,
      completedContent: completedCount,
      totalContent: totalCount,
    };
    
    // Call onBack with updated course when user navigates back
    // For now, we'll store it and use it when back button is pressed
  };

  const handleBack = () => {
    const completedCount = contents.filter(c => c.completed).length;
    const totalCount = contents.length;
    const progress = Math.round((completedCount / totalCount) * 100);
    
    const updatedCourse = {
      ...course,
      progress,
      completedContent: completedCount,
      totalContent: totalCount,
    };
    
    onBack(updatedCourse);
  };

  const completedCount = contents.filter(c => c.completed).length;
  const totalCount = contents.length;
  const currentProgress = Math.round((completedCount / totalCount) * 100);

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
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle} numberOfLines={1}>
          {course.title}
        </Text>
        
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Video Placeholder */}
        <View style={styles.videoContainer}>
          <LinearGradient
            colors={['rgba(17, 24, 39, 0.9)', 'rgba(31, 41, 55, 0.9)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
          />
          <Ionicons name="play-circle" size={80} color="#06b6d4" />
          <Text style={styles.videoText}>Course Video</Text>
          <Text style={styles.videoSubtext}>Click to play</Text>
        </View>

        {/* Course Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.courseTitle}>{course.title}</Text>
          </View>
          <Text style={styles.courseProvider}>{course.provider}</Text>
          
          {/* Overall Progress */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Overall Progress</Text>
              <Text style={styles.progressPercentage}>{currentProgress}%</Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${currentProgress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressStats}>
              {completedCount} of {totalCount} lessons completed
            </Text>
          </View>
        </View>

        {/* Course Contents */}
        <View style={styles.contentsSection}>
          <Text style={styles.sectionTitle}>Course Contents</Text>
          
          {contents.map((content, index) => (
            <TouchableOpacity
              key={content.id}
              style={styles.contentItem}
              onPress={() => handleToggleContent(content.id)}
            >
              <LinearGradient
                colors={
                  content.completed
                    ? ['rgba(6, 182, 212, 0.2)', 'rgba(6, 182, 212, 0.1)']
                    : ['rgba(17, 24, 39, 0.8)', 'rgba(31, 41, 55, 0.8)']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
              />
              
              <View style={styles.contentLeft}>
                <View style={styles.contentNumber}>
                  <Text style={styles.contentNumberText}>{index + 1}</Text>
                </View>
                <Text 
                  style={[
                    styles.contentTitle,
                    content.completed && styles.contentTitleCompleted
                  ]}
                  numberOfLines={2}
                >
                  {content.title}
                </Text>
              </View>
              
              <View style={[
                styles.checkbox,
                content.completed && styles.checkboxCompleted
              ]}>
                {content.completed && (
                  <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CourseDetails;

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
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  videoContainer: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 24,
  },
  videoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
  },
  videoSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#06b6d4',
    flex: 1,
  },
  courseProvider: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 20,
  },
  progressSection: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: '700',
    color: '#06b6d4',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#06b6d4',
    borderRadius: 4,
  },
  progressStats: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
  },
  contentsSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    marginBottom: 12,
    overflow: 'hidden',
  },
  contentLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contentNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#06b6d4',
  },
  contentTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  contentTitleCompleted: {
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(6, 182, 212, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  checkboxCompleted: {
    backgroundColor: '#06b6d4',
    borderColor: '#06b6d4',
  },
});
