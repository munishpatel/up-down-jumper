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

// Backend API URL - Update this to your backend URL
const API_URL = 'http://localhost:8000'; // For iOS simulator use: http://localhost:8000
// For Android emulator use: http://10.0.2.2:8000
// For physical device use: http://YOUR_COMPUTER_IP:8000

const OnboardingPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [jobLinks, setJobLinks] = useState<string[]>(['', '', '']);
  const [resumeFile, setResumeFile] = useState<any>(null);
  const [jobDuration, setJobDuration] = useState('3');
  const [dailyCommitment, setDailyCommitment] = useState('');

  const handleJobLinkChange = (index: number, value: string) => {
    const newJobLinks = [...jobLinks];
    newJobLinks[index] = value;
    setJobLinks(newJobLinks);
  };

  const handleResumeUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setResumeFile(result.assets[0]);
        Alert.alert('Success', 'Resume uploaded successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload resume');
    }
  };

  const handleProcessProfile = async () => {
    // Validation
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
      // Create FormData for multipart/form-data request
      const formData = new FormData();
      
      // Add the first job link (required)
      formData.append('job_link', jobLinks[0]);
      formData.append('job_duration', jobDuration);
      formData.append('daily_commitment', dailyCommitment);
      
      // Add resume file
      const resumeData: any = {
        uri: resumeFile.uri,
        type: resumeFile.mimeType || 'application/pdf',
        name: resumeFile.name || 'resume.pdf',
      };
      formData.append('resume', resumeData);

      // Send request to backend
      const response = await fetch(`${API_URL}/api/v1/onboarding`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      console.log('Response status:', response.status);

      const result = await response.json();

      if (response.ok && result.success) {
        // Navigate to AI Process Page
        navigation.navigate('AiProcess');
      } else {
        // Navigate to AI Process Page even if backend fails
        navigation.navigate('AiProcess');
      }
    } catch (error) {
      console.log('Error processing profile:', error);
      // Navigate to AI Process Page even if there's an error
      navigation.navigate('AiProcess');
    } finally {
      setIsLoading(false);
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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome, Volant!</Text>
          <Text style={styles.subtitle}>
             Ready to Volo? Start by telling us more about you.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description Links</Text>

          {jobLinks.map((link, i) => (
            <View key={i} style={styles.inputContainer}>
              <LinearGradient
                colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
              />
              <Text style={styles.inputIcon}>🔗</Text>
              <TextInput
                style={styles.input}
                placeholder={
                  i === 0
                    ? 'Paste job link here'
                    : i === 1
                    ? 'Paste another job link (optional)'
                    : 'And another (optional)'
                }
                placeholderTextColor="#6b7280"
                value={link}
                onChangeText={(text) => handleJobLinkChange(i, text)}
                autoCapitalize="none"
                keyboardType="url"
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Resume</Text>

          <TouchableOpacity
            style={styles.uploadContainer}
            onPress={handleResumeUpload}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
            />
            <Text style={styles.uploadIcon}>📄</Text>
            <Text style={styles.uploadText}>
              {resumeFile ? resumeFile.name : 'Upload your resume'}
            </Text>
            <Text style={styles.uploadSubtext}>PDF format, up to 5MB</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get a job in</Text>

          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
            />
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Commitment</Text>

          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
            />
            <Text style={styles.inputIcon}>⏰</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 2 hours"
              placeholderTextColor="#6b7280"
              value={dailyCommitment}
              onChangeText={setDailyCommitment}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleProcessProfile}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <LinearGradient
            colors={isLoading ? ['#4b5563', '#6b7280'] : ['#06b6d4', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.processButton}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.processButtonText}>Process Profile</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

export default OnboardingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 16,
    textShadowColor: 'rgba(6, 182, 212, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    overflow: 'hidden',
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputSuffix: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 8,
  },
  uploadContainer: {
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: 16,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
  processButton: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  processButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomSpacer: {
    height: 20,
  },
});
