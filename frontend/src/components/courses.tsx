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
import CourseDetails from '../screens/courseDetailsPage';

interface Course {
  id: string;
  title: string;
  provider: string;
  progress: number;
  totalContent: number;
  completedContent: number;
}

const Courses = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [tasksVisible, setTasksVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  
  const [suggestedCourses, setSuggestedCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'MLOps (MLFlow, DVC, GitOps)',
      provider: 'Coursera',
      progress: 0,
      totalContent: 20,
      completedContent: 0,
    },
    {
      id: '2',
      title: 'LLM Fine-tuning',
      provider: 'Hugging Face',
      progress: 0,
      totalContent: 15,
      completedContent: 0,
    },
    {
      id: '3',
      title: 'Prompt engineering',
      provider: 'Udemy',
      progress: 0,
      totalContent: 12,
      completedContent: 0,
    },
  ]);

  const handleAddCourse = (course: Course) => {
    setEnrolledCourses([...enrolledCourses, course]);
    setSuggestedCourses(suggestedCourses.filter(c => c.id !== course.id));
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackFromDetails = (updatedCourse: Course) => {
    setEnrolledCourses(enrolledCourses.map(c => 
      c.id === updatedCourse.id ? updatedCourse : c
    ));
    setSelectedCourse(null);
  };

  if (selectedCourse) {
    return (
      <CourseDetails 
        course={selectedCourse} 
        onBack={handleBackFromDetails}
      />
    );
  }

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
        <Text style={styles.title}>Courses</Text>
        <Text style={styles.subtitle}>
          Your personalized learning courses
        </Text>
        
        {/* Enrolled Courses - Top Half */}
        <View style={styles.enrolledSection}>
          {enrolledCourses.length === 0 ? (
            <View style={styles.emptyEnrolled}>
              <Text style={styles.emptyEnrolledText}>
                No enrolled courses yet. Add courses from suggestions below.
              </Text>
            </View>
          ) : (
            <View style={styles.courseGrid}>
              {enrolledCourses.map((course) => (
                <TouchableOpacity
                  key={course.id}
                  style={styles.courseCard}
                  onPress={() => handleCourseClick(course)}
                >
                  <LinearGradient
                    colors={['rgba(17, 24, 39, 0.8)', 'rgba(31, 41, 55, 0.8)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
                  />
                  <View style={styles.courseContent}>
                    <Text style={styles.courseTitle} numberOfLines={2}>
                      {course.title}
                    </Text>
                    <Text style={styles.courseProvider}>{course.provider}</Text>
                    
                    {/* Progress Bar */}
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBarBackground}>
                        <View 
                          style={[
                            styles.progressBarFill, 
                            { width: `${course.progress}%` }
                          ]} 
                        />
                      </View>
                      <Text style={styles.progressText}>{course.progress}%</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Suggested Courses - Bottom Half */}
        <View style={styles.suggestedSection}>
          <Text style={styles.sectionTitle}>Suggested Courses</Text>
          
          <View style={styles.courseGrid}>
            {suggestedCourses.map((course) => (
              <View key={course.id} style={styles.courseCardWrapper}>
                <View style={styles.courseCard}>
                  <LinearGradient
                    colors={['rgba(17, 24, 39, 0.8)', 'rgba(31, 41, 55, 0.8)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
                  />
                  <View style={styles.courseContent}>
                    <Text style={styles.courseTitle} numberOfLines={2}>
                      {course.title}
                    </Text>
                    <Text style={styles.courseProvider}>{course.provider}</Text>
                  </View>
                </View>
                
                {/* Add Button */}
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddCourse(course)}
                >
                  <Ionicons name="add" size={24} color="#06b6d4" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
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

export default Courses;

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
    marginBottom: 20,
  },
  enrolledSection: {
    minHeight: 200,
    marginBottom: 10,
  },
  emptyEnrolled: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    borderStyle: 'dashed',
  },
  emptyEnrolledText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    marginVertical: 20,
  },
  suggestedSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  courseGrid: {
    gap: 16,
  },
  courseCardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  courseCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    overflow: 'hidden',
    minHeight: 70,
  },
  courseContent: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  courseProvider: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: 5,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#06b6d4',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#06b6d4',
    minWidth: 32,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderWidth: 1.5,
    borderColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    overflow: 'hidden',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
