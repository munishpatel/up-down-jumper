import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
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

const { width } = Dimensions.get('window');
const API_URL = 'http://localhost:8000';

const OnboardingPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [jobLinks, setJobLinks] = useState<string[]>(['', '']);
  const [resumeFile, setResumeFile] = useState<any>(null);
  const [jobDuration, setJobDuration] = useState('3');
  const [dailyCommitment, setDailyCommitment] = useState('');
  const [activeInput, setActiveInput] = useState<number | null>(null);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleJobLinkChange = (index: number, value: string) => {
    const newJobLinks = [...jobLinks];
    newJobLinks[index] = value;
    setJobLinks(newJobLinks);
  };

  const handleResumeUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setResumeFile(result.assets[0]);
      }
    } catch (error) {
      console.log('Error uploading resume:', error);
    }
  };

  const handleProcessProfile = async () => {
    if (!jobLinks[0]) {
      Alert.alert('Error', 'Please enter at least one job link');
      return;
    }
    if (!resumeFile) {
      Alert.alert('Error', 'Please upload your resume');
      return;
    }
    if (!dailyCommitment) {
      Alert.alert('Error', 'Please enter your daily commitment');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('job_link', jobLinks[0]);
      formData.append('job_duration', jobDuration);
      formData.append('daily_commitment', dailyCommitment);
      
      const resumeData: any = {
        uri: resumeFile.uri,
        type: resumeFile.mimeType || 'application/pdf',
        name: resumeFile.name || 'resume.pdf',
      };
      formData.append('resume', resumeData);

      const response = await fetch(`${API_URL}/api/v1/onboarding`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        navigation.navigate('AiProcess');
      } else {
        navigation.navigate('AiProcess');
      }
    } catch (error) {
      console.log('Error processing profile:', error);
      navigation.navigate('AiProcess');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Enhanced Background */}
      <LinearGradient
        colors={['#0f0f23', '#1a1a2e', '#16213e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Animated Gradient Overlay */}
      <LinearGradient
        colors={['rgba(59, 130, 246, 0.15)', 'rgba(147, 51, 234, 0.08)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <StatusBar style="light" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Build Your</Text>
            <LinearGradient
              colors={['#06b6d4', '#3b82f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientBackground}
            >
              <Text style={styles.gradientTitle}>Career Path</Text>
            </LinearGradient>
          </View>
          <Text style={styles.subtitle}>
            Tell us about your goals and let AI create your personalized learning journey
          </Text>
        </Animated.View>

        {/* Main Form Container */}
        <View style={styles.formContainer}>
          {/* Job Links Section */}
          <Animated.View 
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Text style={styles.sectionIconText}>🎯</Text>
              </View>
              <Text style={styles.sectionTitle}>Target Positions</Text>
            </View>
            
            <View style={styles.inputsGrid}>
              {jobLinks.map((link, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveInput(index)}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={
                      activeInput === index 
                        ? ['rgba(6, 182, 212, 0.2)', 'rgba(59, 130, 246, 0.15)']
                        : ['rgba(17, 24, 39, 0.7)', 'rgba(31, 41, 55, 0.7)']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                      styles.inputWrapper,
                      activeInput === index && styles.inputWrapperActive
                    ]}
                  >
                    <Text style={styles.inputLabel}>
                      {index === 0 ? 'Primary Role' : 'Secondary Role'}
                    </Text>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputIcon}>🔗</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Paste job URL"
                        placeholderTextColor="#6b7280"
                        value={link}
                        onChangeText={(text) => handleJobLinkChange(index, text)}
                        onFocus={() => setActiveInput(index)}
                        onBlur={() => setActiveInput(null)}
                        autoCapitalize="none"
                        keyboardType="url"
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Resume Upload Section */}
          <Animated.View 
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Text style={styles.sectionIconText}>📄</Text>
              </View>
              <Text style={styles.sectionTitle}>Your Resume</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.uploadCard,
                resumeFile && styles.uploadCardSuccess
              ]}
              onPress={handleResumeUpload}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  resumeFile 
                    ? ['rgba(16, 185, 129, 0.1)', 'rgba(5, 150, 105, 0.05)']
                    : ['rgba(17, 24, 39, 0.7)', 'rgba(31, 41, 55, 0.7)']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
              />
              
              <View style={styles.uploadContent}>
                <View style={[
                  styles.uploadIconContainer,
                  resumeFile && styles.uploadIconContainerSuccess
                ]}>
                  <Text style={styles.uploadIcon}>
                    {resumeFile ? '✅' : '📄'}
                  </Text>
                </View>
                <View style={styles.uploadTextContainer}>
                  <Text style={styles.uploadTitle}>
                    {resumeFile ? 'Resume Uploaded!' : 'Upload Resume'}
                  </Text>
                  <Text style={styles.uploadSubtitle}>
                    {resumeFile ? resumeFile.name : 'PDF format, up to 5MB'}
                  </Text>
                </View>
                <View style={[
                  styles.uploadButton,
                  resumeFile && styles.uploadButtonSuccess
                ]}>
                  <Text style={styles.uploadButtonText}>
                    {resumeFile ? 'Change' : 'Browse'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Goals Section */}
          <Animated.View 
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Text style={styles.sectionIconText}>🎯</Text>
              </View>
              <Text style={styles.sectionTitle}>Learning Goals</Text>
            </View>

            <View style={styles.goalsGrid}>
              {/* Timeline Input */}
              <View style={styles.goalInput}>
                <Text style={styles.goalLabel}>Timeline</Text>
                <LinearGradient
                  colors={['rgba(17, 24, 39, 0.7)', 'rgba(31, 41, 55, 0.7)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
                />
                <View style={styles.inputRow}>
                  <Text style={styles.inputIcon}>📅</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="3"
                    placeholderTextColor="#6b7280"
                    value={jobDuration}
                    onChangeText={setJobDuration}
                    keyboardType="number-pad"
                  />
                  <Text style={styles.inputSuffix}>months</Text>
                </View>
              </View>

              {/* Daily Commitment Input */}
              <View style={styles.goalInput}>
                <Text style={styles.goalLabel}>Daily Time</Text>
                <LinearGradient
                  colors={['rgba(17, 24, 39, 0.7)', 'rgba(31, 41, 55, 0.7)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
                />
                <View style={styles.inputRow}>
                  <Text style={styles.inputIcon}>⏰</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="2 hours"
                    placeholderTextColor="#6b7280"
                    value={dailyCommitment}
                    onChangeText={setDailyCommitment}
                  />
                </View>
              </View>
            </View>
          </Animated.View>

          {/* CTA Button */}
          <Animated.View 
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <TouchableOpacity
              onPress={handleProcessProfile}
              activeOpacity={0.9}
              disabled={isLoading}
              style={styles.buttonTouchable}
            >
              <LinearGradient
                colors={isLoading ? ['#4b5563', '#6b7280'] : ['#06b6d4', '#3b82f6', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.processButton}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Text style={styles.processButtonText}>Generate My Plan</Text>
                    <Text style={styles.buttonArrow}>→</Text>
                  </>
                )}
              </LinearGradient>
              <View style={styles.buttonGlow} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OnboardingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  gradientBackground: {
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  gradientTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  formContainer: {
    gap: 32,
  },
  section: {
    gap: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  sectionIconText: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  inputsGrid: {
    gap: 16,
  },
  inputWrapper: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    overflow: 'hidden',
  },
  inputWrapperActive: {
    borderColor: 'rgba(6, 182, 212, 0.5)',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#06b6d4',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#06b6d4',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  inputSuffix: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
    fontWeight: '500',
  },
  uploadCard: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  uploadCardSuccess: {
    borderColor: 'rgba(16, 185, 129, 0.4)',
    borderStyle: 'solid',
  },
  uploadContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  uploadIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  uploadIconContainerSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  uploadIcon: {
    fontSize: 20,
  },
  uploadTextContainer: {
    flex: 1,
    gap: 4,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  uploadButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  uploadButtonSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#06b6d4',
  },
  goalsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  goalInput: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    overflow: 'hidden',
  },
  goalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#06b6d4',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonTouchable: {
    position: 'relative',
  },
  processButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 25,
    gap: 12,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  processButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  buttonArrow: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  buttonGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#06b6d4',
    borderRadius: 25,
    zIndex: -1,
    transform: [{ translateY: 10 }],
    opacity: 0.3,
    filter: 'blur(10px)',
  },
});