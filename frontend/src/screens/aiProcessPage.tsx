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

interface ProcessStep {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
}

const AiProcessPage = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(2);
  const [funFact, setFunFact] = useState({
    title: 'Did you know?',
    text: 'Python was named after the British comedy group Monty Python, not the snake!',
  });

  const steps: ProcessStep[] = [
    {
      id: 1,
      title: 'Extracting Your Profile Information',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Analyzing Target Job Requirements',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Mapping Your Current Skills',
      status: 'in-progress',
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
  ];

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 42) {
          clearInterval(interval);
          return 42;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const renderStepIcon = (status: string) => {
    if (status === 'completed') {
      return (
        <View style={styles.stepIconCompleted}>
          <Ionicons name="checkmark" size={24} color="#5B8DEF" />
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
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Building Your Path</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Circle */}
        <View style={styles.progressCircleContainer}>
          <View style={styles.progressCircleOuter}>
            <View style={styles.progressCircle}>
              <Ionicons name="settings" size={64} color="#5B8DEF" />
            </View>
          </View>
        </View>

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
                {index < steps.length - 1 && (
                  <View style={styles.stepConnector} />
                )}
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
            <Ionicons name="bulb" size={32} color="#5B8DEF" />
          </View>
          <View style={styles.funFactContent}>
            <Text style={styles.funFactTitle}>{funFact.title}</Text>
            <Text style={styles.funFactText}>{funFact.text}</Text>
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  progressCircleContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  progressCircleOuter: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(91, 141, 239, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(91, 141, 239, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSection: {
    marginBottom: 40,
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
    marginBottom: 40,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  stepIndicatorContainer: {
    alignItems: 'center',
    marginRight: 16,
    paddingTop: 2,
  },
  stepIconCompleted: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(91, 141, 239, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#5B8DEF',
  },
  stepIconInProgress: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#5B8DEF',
  },
  stepIconInProgressInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#5B8DEF',
  },
  stepIconPending: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 44,
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
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1A2A3A',
  },
  funFactIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(91, 141, 239, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  funFactContent: {
    flex: 1,
  },
  funFactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  funFactText: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
});
