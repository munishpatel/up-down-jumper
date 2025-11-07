import { StatusBar } from 'expo-status-bar';
import type { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import OnboardingPage from './src/screens/onboardingPage';
import AiProcessPage from './src/screens/aiProcessPage';
import MainPage from './src/screens/mainPage';
import Dashboard from './src/screens/dashboard';

type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  AiProcess: undefined;
  Main: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const WelcomeScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Onboarding');
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
        colors={['rgba(59, 130, 246, 0.1)', 'rgba(147, 51, 234, 0.05)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      
      <StatusBar style="light" />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Image 
              source={require('./assets/logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.aiBadge}>
          <LinearGradient
            colors={['rgba(17, 24, 39, 0.8)', 'rgba(31, 41, 55, 0.8)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 25 }]}
          />
          <Text style={styles.aiIcon}>⚡</Text>
          <Text style={styles.aiBadgeText}>AI-Powered Upskilling Application</Text>
        </View>

        <Text style={styles.title}>VOLO</Text>

        <Text style={styles.subtitle}>Do you want to upskill yourself?</Text>

        <TouchableOpacity
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#06b6d4', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
      </View>
    </View>
  );
};

const App: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingPage}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="AiProcess"
          component={AiProcessPage}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ animation: 'fade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#06b6d4',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    padding: 15,
  },
  logoImage: {
    width: 80,
    height: 80,
    tintColor: '#06b6d4',
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 30,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  aiIcon: {
    fontSize: 20,
    color: '#06b6d4',
    marginRight: 10,
    textShadowColor: 'rgba(6, 182, 212, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  aiBadgeText: {
    fontSize: 16,
    color: '#06b6d4',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#3b82f6',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
    textShadowColor: 'rgba(6, 182, 212, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 60,
    opacity: 0.95,
    fontWeight: '400',
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    top: -50,
    right: -50,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    bottom: -30,
    left: -30,
  },
});
