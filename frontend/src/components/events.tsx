import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SideMenu from './sideMenu';
import Tasks from './tasks';

interface EventsProps {
  navigation?: any;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  registrationLink: string;
  articles: Array<{ title: string; url: string }>;
  image?: any;
}

const Events: React.FC<EventsProps> = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [tasksVisible, setTasksVisible] = useState(false);
  const [likedEvents, setLikedEvents] = useState<Set<string>>(new Set());

  // Sample events data matching the image
  const events: Event[] = [
    {
      id: '1',
      name: "O'Reilly AI Conference",
      date: 'Fri, Nov 7-9th',
      time: '9am',
      location: '1500 S Western Ave',
      description: 'Join us for the premier AI conference featuring cutting-edge presentations, workshops, and networking opportunities. Learn from industry leaders about the latest advancements in artificial intelligence, machine learning, and deep learning technologies.',
      registrationLink: 'https://www.oreilly.com/conferences/',
      articles: [
        {
          title: 'Introduction to Large Language Models',
          url: 'https://example.com/llm-intro',
        },
        {
          title: 'AI Ethics and Responsible Development',
          url: 'https://professional.dce.harvard.edu/blog/ethics-in-ai-why-it-matters/',
        },
      ],
    },
    {
      id: '2',
      name: 'AWS re:Invent',
      date: 'Sat, Dec 5-6th',
      time: '11am',
      location: '1535 E 72nd St',
      description: 'AWS re:Invent is a learning conference hosted by Amazon Web Services for the global cloud computing community. Discover new services, learn best practices, and network with AWS experts and peers.',
      registrationLink: 'https://reinvent.awsevents.com/',
      articles: [
        {
          title: 'Getting Started with AWS',
          url: 'https://example.com/aws-intro',
        },
        {
          title: 'Cloud Architecture Best Practices',
          url: 'https://example.com/cloud-architecture',
        },
      ],
    },
    {
      id: '3',
      name: 'DataDog World Tour',
      date: 'Sun, Nov 12th',
      time: '9am',
      location: '208 West Hudson St',
      description: 'Experience the latest in monitoring and analytics. Learn how to optimize your infrastructure, applications, and logs with Datadog. Meet with experts and explore real-world use cases.',
      registrationLink: 'https://www.datadoghq.com/event/',
      articles: [
        {
          title: 'Modern Observability Practices',
          url: 'https://example.com/observability',
        },
      ],
    },
    {
      id: '4',
      name: 'Agentic-AI Hands-on',
      date: 'Mon, Nov 18th',
      time: '5pm',
      location: '1500 S Western Ave',
      description: 'Hands-on workshop exploring agentic AI systems. Build autonomous agents, learn about agent frameworks, and discover how to deploy intelligent systems that can take actions on behalf of users.',
      registrationLink: 'https://example.com/agentic-ai',
      articles: [
        {
          title: 'Understanding AI Agents',
          url: 'https://example.com/ai-agents',
        },
        {
          title: 'Building Autonomous Systems',
          url: 'https://example.com/autonomous-systems',
        },
      ],
    },
  ];

  const toggleLike = (eventId: string) => {
    setLikedEvents((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(eventId)) {
        newLiked.delete(eventId);
      } else {
        newLiked.add(eventId);
      }
      return newLiked;
    });
  };

  const handleEventPress = (event: Event) => {
    if (navigation) {
      navigation.navigate('EventDetails', { event });
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
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tasksButton}
          onPress={() => setTasksVisible(true)}
        >
          <Ionicons name="clipboard" size={28} color="#06b6d4" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Events</Text>
        <Text style={styles.subtitle}>
          Networking and learning opportunities
        </Text>
        
        {/* Location Filter */}
        <Text style={styles.filterTitle}>Popular in Chicago</Text>

        {/* Events List */}
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            onPress={() => handleEventPress(event)}
            activeOpacity={0.7}
            style={styles.eventCard}
          >
            <LinearGradient
              colors={['rgba(17, 24, 39, 0.6)', 'rgba(31, 41, 55, 0.6)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
            />
            
            <View style={styles.eventContent}>
              {/* Event Image Placeholder */}
              <View style={styles.eventImageContainer}>
                <LinearGradient
                  colors={['rgba(6, 182, 212, 0.3)', 'rgba(59, 130, 246, 0.3)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.eventImage}
                >
                  <Ionicons name="calendar" size={32} color="#06b6d4" />
                </LinearGradient>
              </View>

              {/* Event Details */}
              <View style={styles.eventDetails}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventDate}>{event.date}, {event.time}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
              </View>

              {/* Like Button */}
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  toggleLike(event.id);
                }}
                style={styles.likeButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={likedEvents.has(event.id) ? 'heart' : 'heart-outline'}
                  size={28}
                  color={likedEvents.has(event.id) ? '#ef4444' : '#FFFFFF'}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Side Menu */}
      <SideMenu 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />

      {/* Tasks Modal */}
      <Tasks 
        visible={tasksVisible} 
        onClose={() => setTasksVisible(false)} 
      />
    </View>
  );
};

export default Events;

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
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasksButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 8,
    textShadowColor: 'rgba(6, 182, 212, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  eventCard: {
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    overflow: 'hidden',
  },
  eventContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  eventImageContainer: {
    marginRight: 16,
  },
  eventImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  eventDetails: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 14,
    color: '#9ca3af',
  },
  likeButton: {
    padding: 8,
  },
});
