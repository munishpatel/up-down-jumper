import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
          <Ionicons name="checkmark" size={20} color="#5B8DEF" />
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
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Overall Progress</Text>
            <Text style={styles.progressPercentage}>{progress}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
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
          <View style={styles.funFactIcon}>
            <Ionicons name="bulb" size={28} color="#5B8DEF" />
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
    backgroundColor: '#0A0A0A',
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
    color: '#FFFFFF',
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
    color: '#5B8DEF',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#1A2332',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#5B8DEF',
    borderRadius: 4,
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
    backgroundColor: 'rgba(91, 141, 239, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#5B8DEF',
  },
  stepIconInProgress: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#5B8DEF',
  },
  stepIconInProgressInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5B8DEF',
  },
  stepIconPending: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1A2332',
    borderWidth: 2,
    borderColor: '#2A3A4A',
  },
  stepConnector: {
    width: 2,
    height: 40,
    backgroundColor: '#1A2332',
    marginTop: 4,
  },
  stepTitle: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  stepTitleActive: {
    color: '#5B8DEF',
    fontWeight: '500',
  },
  stepTitlePending: {
    color: '#6B7280',
  },
  funFactCard: {
    flexDirection: 'row',
    backgroundColor: '#0F1923',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1A2A3A',
  },
  funFactIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(91, 141, 239, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
    color: '#9CA3AF',
    lineHeight: 18,
  },
});
