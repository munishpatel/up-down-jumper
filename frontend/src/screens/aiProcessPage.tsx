import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  AiProcess: undefined;
  Main: undefined;
  Dashboard: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ProcessStep {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
}

const AiProcessPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<ProcessStep[]>([
    {
      id: 1,
      title: 'Extracting Your Profile Information',
      status: 'in-progress',
    },
    {
      id: 2,
      title: 'Analyzing Target Job Requirements',
      status: 'pending',
    },
    {
      id: 3,
      title: 'Mapping Your Current Skills',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Identifying Key Skill Gaps',
      status: 'pending',
    },
    {
      id: 5,
      title: 'Sourcing Relevant Learning Resources',
      status: 'pending',
    },
    {
      id: 6,
      title: 'Planning Your Personalized Learning Path',
      status: 'pending',
    },
    {
      id: 7,
      title: 'Finalizing Your Roadmap',
      status: 'pending',
    },
  ]);
  const [funFact, setFunFact] = useState({
    title: 'Did you know?',
    text: 'Python was named after the British comedy group Monty Python, not the snake!',
  });

  useEffect(() => {
    const totalSteps = steps.length;
    const progressPerStep = 100 / totalSteps;
    let currentProgress = 0;
    let currentStepIndex = 0;

    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      // Update step status based on progress
      const completedStepsCount = Math.floor(currentProgress / progressPerStep);
      
      setSteps((prevSteps) =>
        prevSteps.map((step, index) => {
          if (index < completedStepsCount) {
            return { ...step, status: 'completed' };
          } else if (index === completedStepsCount) {
            return { ...step, status: 'in-progress' };
          } else {
            return { ...step, status: 'pending' };
          }
        })
      );

      // When progress reaches 100%, navigate to Main page
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          navigation.navigate('Main');
        }, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [navigation]);

  const renderStepIcon = (status: string) => {
    if (status === 'completed') {
      return (
        <View style={styles.stepIconCompleted}>
          <Ionicons name="checkmark" size={20} color="#06b6d4" />
        </View>
      );
    } else if (status === 'in-progress') {
      return (
        <View style={styles.stepIconInProgress}>
          <View style={styles.stepIconInProgressInner} />
        </View>
      );
    } else {
      return <View style={styles.stepIconPending} />;
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
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Building Your Path</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        {/* Overall Progress */}
        <View style={styles.progressSection}>
          <LinearGradient
            colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
          />
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Overall Progress</Text>
            <Text style={styles.progressPercentage}>{progress}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={['#06b6d4', '#3b82f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBarFill, { width: `${progress}%` }]}
            />
          </View>
        </View>

        {/* Steps */}
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={step.id} style={styles.stepRow}>
              <View style={styles.stepIndicatorContainer}>
                {renderStepIcon(step.status)}
              </View>
              <Text
                style={[
                  styles.stepTitle,
                  step.status === 'in-progress' && styles.stepTitleActive,
                  step.status === 'pending' && styles.stepTitlePending,
                ]}
              >
                {step.title}
              </Text>
            </View>
          ))}
        </View>

        {/* Fun Fact Card */}
        <View style={styles.funFactCard}>
          <LinearGradient
            colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
          />
          <View style={styles.funFactIcon}>
            <Ionicons name="bulb" size={28} color="#06b6d4" />
          </View>
          <View style={styles.funFactContent}>
            <Text style={styles.funFactTitle}>{funFact.title}</Text>
            <Text style={styles.funFactText}>{funFact.text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AiProcessPage;

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
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#06b6d4',
    textShadowColor: 'rgba(6, 182, 212, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  progressSection: {
    marginBottom: 25,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    overflow: 'hidden',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#06b6d4',
    textShadowColor: 'rgba(6, 182, 212, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  stepsContainer: {
    marginBottom: 20,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepIndicatorContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  stepIconCompleted: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#06b6d4',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  stepIconInProgress: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#06b6d4',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  stepIconInProgressInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#06b6d4',
  },
  stepIconPending: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    borderWidth: 2,
    borderColor: 'rgba(75, 85, 99, 0.5)',
  },
  stepTitle: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  stepTitleActive: {
    color: '#06b6d4',
    fontWeight: '500',
  },
  stepTitlePending: {
    color: '#6b7280',
  },
  funFactCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    overflow: 'hidden',
  },
  funFactIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  funFactContent: {
    flex: 1,
  },
  funFactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  funFactText: {
    fontSize: 13,
    color: '#9ca3af',
    lineHeight: 18,
  },
});
