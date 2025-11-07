import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface EventDetailsPageProps {
  navigation: any;
  route: any;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = ({ navigation, route }) => {
  const { event } = route.params;

  const handleRegistration = () => {
    if (event.registrationLink) {
      Linking.openURL(event.registrationLink);
    }
  };

  const handleArticlePress = (url: string) => {
    Linking.openURL(url);
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
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Details</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Event Name */}
        <View style={styles.section}>
          <Text style={styles.eventName}>{event.name}</Text>
        </View>

        {/* Date and Location */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={20} color="#06b6d4" />
            <Text style={styles.infoText}>{event.date}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color="#06b6d4" />
            <Text style={styles.infoText}>{event.time}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={20} color="#06b6d4" />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <LinearGradient
            colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.description}>{event.description}</Text>
          </LinearGradient>
        </View>

        {/* Articles to Read */}
        {event.articles && event.articles.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Articles to Read Before Attending</Text>
            {event.articles.map((article: any, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleArticlePress(article.url)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.articleCard}
                >
                  <View style={styles.articleContent}>
                    <Ionicons name="document-text-outline" size={24} color="#06b6d4" />
                    <View style={styles.articleTextContainer}>
                      <Text style={styles.articleTitle}>{article.title}</Text>
                      <Text style={styles.articleUrl} numberOfLines={1}>{article.url}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Connections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connections</Text>
          <LinearGradient
            colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.connectionsContainer}>
              <Ionicons name="person-outline" size={48} color="#06b6d4" />
              <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
                <LinearGradient
                  colors={['#06b6d4', '#3b82f6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.addButtonGradient}
                >
                  <Ionicons name="add" size={24} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Text style={styles.connectionsText}>
              Add connections who you meet at this event
            </Text>
          </LinearGradient>
        </View>

        {/* Registration Button */}
        {event.registrationLink && (
          <TouchableOpacity
            onPress={handleRegistration}
            activeOpacity={0.8}
            style={styles.registerButtonContainer}
          >
            <LinearGradient
              colors={['#06b6d4', '#3b82f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.registerButton}
            >
              <Text style={styles.registerButtonText}>Register Now</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default EventDetailsPage;

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
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  eventName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 16,
    textShadowColor: 'rgba(6, 182, 212, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#d1d5db',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    overflow: 'hidden',
  },
  description: {
    fontSize: 15,
    color: '#d1d5db',
    lineHeight: 22,
  },
  articleCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    overflow: 'hidden',
  },
  articleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  articleUrl: {
    fontSize: 12,
    color: '#6b7280',
  },
  connectionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addButton: {
    marginLeft: 16,
  },
  addButtonGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionsText: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
  },
  registerButtonContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
