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
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  AiProcess: undefined;
  Main: undefined;
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
                placeholderTextColor="#888"
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
            <Text style={styles.inputIcon}>📅</Text>
            <TextInput
              style={styles.input}
              placeholder="3"
              placeholderTextColor="#888"
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
            <Text style={styles.inputIcon}>⏰</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 2 hours"
              placeholderTextColor="#888"
              value={dailyCommitment}
              onChangeText={setDailyCommitment}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.processButton, isLoading && styles.processButtonDisabled]}
          onPress={handleProcessProfile}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.processButtonText}>Process Profile</Text>
          )}
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
    backgroundColor: '#0A0A0A',
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
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B0B0',
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
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputSuffix: {
    fontSize: 16,
    color: '#888',
    marginLeft: 8,
  },
  uploadContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#888',
  },
  processButton: {
    backgroundColor: '#5B8DEF',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#5B8DEF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  processButtonDisabled: {
    backgroundColor: '#4A7BC8',
    opacity: 0.7,
  },
  processButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomSpacer: {
    height: 20,
  },
});
