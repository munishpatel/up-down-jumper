import { StatusBar } from 'expo-status-bar';
import type { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import OnboardingPage from './src/screens/onboardingPage';
import AiProcessPage from './src/screens/aiProcessPage';
import MainPage from './src/screens/mainPage';

type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  AiProcess: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const WelcomeScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>↑↓</Text>
          </View>
        </View>

        <View style={styles.aiBadge}>
          <Text style={styles.aiIcon}>⚡</Text>
          <Text style={styles.aiBadgeText}>AI-Powered Upskilling Application</Text>
        </View>

        <Text style={styles.title}>Up Down Jumper</Text>

        <Text style={styles.subtitle}>Do you want to upskill yourself?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>

        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
      </View>
    </LinearGradient>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  iconText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(100, 200, 255, 0.3)',
  },
  aiIcon: {
    fontSize: 20,
    color: '#5FC9F8',
    marginRight: 10,
  },
  aiBadgeText: {
    fontSize: 16,
    color: '#5FC9F8',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
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
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonText: {
    color: '#667eea',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -50,
    right: -50,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    bottom: -30,
    left: -30,
  },
});
