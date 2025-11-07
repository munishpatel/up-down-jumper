import { StatusBar } from 'expo-status-bar';
import type { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated, Easing, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');

// Your existing imports remain the same
import OnboardingPage from './src/screens/onboardingPage';
import AiProcessPage from './src/screens/aiProcessPage';
import MainPage from './src/screens/mainPage';
import Dashboard from './src/screens/dashboard';
import EventDetailsPage from './src/screens/eventDetailsPage';
import { VideosProvider } from './src/context/VideosContext';

type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  AiProcess: undefined;
  Main: undefined;
  Dashboard: undefined;
  EventDetails: { event: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const WelcomeScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;
  const scaleLogo = useRef(new Animated.Value(0)).current;
  const rotateGradient = useRef(new Animated.Value(0)).current;
  const particleAnim = useRef(new Animated.Value(0)).current;

  // Floating particles animation
  const particle1X = useRef(new Animated.Value(0)).current;
  const particle1Y = useRef(new Animated.Value(0)).current;
  const particle2X = useRef(new Animated.Value(0)).current;
  const particle2Y = useRef(new Animated.Value(0)).current;
  const particle3X = useRef(new Animated.Value(0)).current;
  const particle3Y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scaleLogo, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(particleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Rotating gradient background
    Animated.loop(
      Animated.timing(rotateGradient, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Floating particles animation
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(particle1X, {
            toValue: 1,
            duration: 4000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(particle1X, {
            toValue: 0,
            duration: 4000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(particle1Y, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(particle1Y, {
            toValue: 0,
            duration: 3000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // Additional particles animations (similar patterns for particle2X, particle2Y, etc.)
  }, []);

  const handleGetStarted = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideUp, {
          toValue: -50,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      navigation.navigate('Onboarding');
    });
  };

  const interpolateRotate = rotateGradient.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const particle1TranslateX = particle1X.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 40],
  });

  const particle1TranslateY = particle1Y.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  return (
    <View style={styles.container}>
      {/* Animated Rotating Gradient Background */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [
              {
                rotate: interpolateRotate,
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={['#0f0f23', '#1a1a2e', '#16213e', '#0f3460']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Animated Gradient Overlays */}
      <LinearGradient
        colors={['rgba(59, 130, 246, 0.2)', 'rgba(147, 51, 234, 0.1)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating Particles */}
      <Animated.View
        style={[
          styles.floatingParticle,
          styles.particle1,
          {
            transform: [
              { translateX: particle1TranslateX },
              { translateY: particle1TranslateY },
            ],
          },
        ]}
      />
      <Animated.View style={[styles.floatingParticle, styles.particle2]} />
      <Animated.View style={[styles.floatingParticle, styles.particle3]} />
      <Animated.View style={[styles.floatingParticle, styles.particle4]} />

      <StatusBar style="light" />

      <View style={styles.content}>
        {/* Main Logo with Enhanced Glow */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleLogo }],
            },
          ]}
        >
          <View style={styles.logoGlow} />
          <View style={styles.logoInnerGlow} />
          <View style={styles.logoCircle}>
            <Image 
              source={require('./assets/logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.pulseRing} />
        </Animated.View>

        {/* AI Badge with Modern Design */}
        <Animated.View
          style={[
            styles.aiBadgeContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUp }],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.aiBadge}
          >
            <View style={styles.aiIconWrapper}>
              <Text style={styles.aiIcon}>🤖</Text>
            </View>
            <Text style={styles.aiBadgeText}>AI-POWERED UPSKILLING</Text>
          </LinearGradient>
        </Animated.View>

        {/* Main Title with Gradient Text */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUp }],
            },
          ]}
        >
          <LinearGradient
            colors={['#06b6d4', '#3b82f6', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientText}
          >
            <Text style={styles.title}>VOLO</Text>
          </LinearGradient>
          <Text style={styles.subtitle}>
            Master new skills with{'\n'}AI-driven personalized learning
          </Text>
        </Animated.View>

        {/* Feature Highlights */}
        <Animated.View
          style={[
            styles.featuresContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUp }],
            },
          ]}
        >
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={styles.featureText}>Personalized Paths</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>Fast Learning</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureText}>Progress Tracking</Text>
          </View>
        </Animated.View>

        {/* Animated Get Started Button */}
        <Animated.View
          style={[
            styles.buttonWrapper,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUp }],
              zIndex: 10,
            },
          ]}
        >
          <TouchableOpacity
            onPress={handleGetStarted}
            activeOpacity={0.9}
            style={styles.buttonTouchable}
          >
            <LinearGradient
              colors={['#06b6d4', '#3b82f6', '#8b5cf6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>START LEARNING NOW</Text>
              <View style={styles.buttonIcon}>
                <Text style={styles.arrow}>→</Text>
              </View>
            </LinearGradient>
            <View style={styles.buttonShadow} />
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom Wave Design */}
        <View style={[styles.waveContainer, { pointerEvents: 'none' }]}>
          <View style={styles.wave} />
          <View style={[styles.wave, styles.wave2]} />
        </View>
      </View>
    </View>
  );
};

// Rest of your App component remains the same...
const App: FC = () => {
  return (
    <VideosProvider>
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
          <Stack.Screen
            name="EventDetails"
            component={EventDetailsPage}
            options={{ animation: 'slide_from_right' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </VideosProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: height * 0.1,
    paddingBottom: 40,
  },
  // Logo Styles
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 30,
  },
  logoGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(6, 182, 212, 0.3)',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 50,
    elevation: 20,
  },
  logoInnerGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  logoImage: {
    width: 60,
    height: 60,
    tintColor: '#ffffff',
  },
  pulseRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    opacity: 0.6,
  },
  // AI Badge Styles
  aiBadgeContainer: {
    marginBottom: 40,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  aiIconWrapper: {
    marginRight: 10,
  },
  aiIcon: {
    fontSize: 16,
  },
  aiBadgeText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: 1,
    opacity: 0.9,
  },
  // Title Styles
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  gradientText: {
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 64,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
    opacity: 0.9,
    letterSpacing: 0.5,
  },
  // Features Styles
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 50,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
    textAlign: 'center',
  },
  // Button Styles
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  buttonTouchable: {
    width: '100%',
    maxWidth: 300,
    position: 'relative',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  buttonIcon: {
    marginLeft: 10,
  },
  arrow: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonShadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#06b6d4',
    borderRadius: 25,
    zIndex: -1,
    transform: [{ translateY: 10 }],
    opacity: 0.3,
  },
  // Floating Particles
  floatingParticle: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.6,
  },
  particle1: {
    width: 8,
    height: 8,
    backgroundColor: '#06b6d4',
    top: '30%',
    left: '20%',
  },
  particle2: {
    width: 6,
    height: 6,
    backgroundColor: '#3b82f6',
    top: '60%',
    right: '25%',
  },
  particle3: {
    width: 4,
    height: 4,
    backgroundColor: '#8b5cf6',
    bottom: '40%',
    left: '15%',
  },
  particle4: {
    width: 5,
    height: 5,
    backgroundColor: '#06b6d4',
    bottom: '25%',
    right: '20%',
  },
  // Wave Design
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  wave2: {
    height: 40,
    backgroundColor: 'rgba(6, 182, 212, 0.05)',
    bottom: 10,
    left: 20,
    right: 20,
  },
});