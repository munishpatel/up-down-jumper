import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ViewToken,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import SideMenu from './sideMenu';
import Tasks from './tasks';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Calculate heights for proper video sizing
const HEADER_HEIGHT = 103; // paddingTop (60) + paddingBottom (15) + content (28)
const TAB_BAR_HEIGHT = 90; // From dashboard.tsx tabBarStyle
const VIDEO_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT - TAB_BAR_HEIGHT;

// Video data
const videos = [
  {
    id: '1',
    uri: require('../../assets/video1.mp4'),
    title: 'Learning Byte 1',
    description: 'Quick learning content',
  },
  {
    id: '2',
    uri: require('../../assets/video2.mp4'),
    title: 'Learning Byte 2',
    description: 'Micro-lesson content',
  },
  {
    id: '3',
    uri: require('../../assets/video3.mp4'),
    title: 'Learning Byte 3',
    description: 'Educational snippet',
  },
];

interface VideoItemProps {
  item: typeof videos[0];
  isActive: boolean;
  videoRef: React.RefObject<Video | null>;
}

const VideoItem: React.FC<VideoItemProps> = ({ item, isActive, videoRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.setIsMutedAsync(false).catch(() => {});
      videoRef.current?.playAsync().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current?.pauseAsync().catch(() => {});
      setIsPlaying(false);
    }
  }, [isActive, videoRef]);

  // Cleanup: pause and unload video when component unmounts
  useEffect(() => {
    return () => {
      videoRef.current?.pauseAsync().catch(() => {});
      videoRef.current?.setIsMutedAsync(true).catch(() => {});
      videoRef.current?.unloadAsync().catch(() => {});
    };
  }, [videoRef]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
      setIsPlaying(false);
    } else {
      await videoRef.current?.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        source={item.uri}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={isActive}
      />
      
      {/* Overlay gradient */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.overlay}
      />

      {/* Play/Pause button */}
      <TouchableOpacity 
        style={styles.playPauseButton}
        onPress={handlePlayPause}
        activeOpacity={0.7}
      >
        {!isPlaying && (
          <Ionicons name="play" size={60} color="rgba(255,255,255,0.8)" />
        )}
      </TouchableOpacity>

      {/* Video info */}
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoDescription}>{item.description}</Text>
      </View>

      {/* Side actions */}
      <View style={styles.sideActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={32} color="#FFFFFF" />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={32} color="#FFFFFF" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={32} color="#FFFFFF" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Bytes = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [tasksVisible, setTasksVisible] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(true);
  
  // Create refs for all videos
  const videoRefs = useRef<Array<React.RefObject<Video | null>>>(
    videos.map(() => React.createRef<Video | null>())
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveVideoIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // Pause all videos when screen loses focus
  useFocusEffect(
    useCallback(() => {
      // Screen is focused
      setIsFocused(true);
      
      return () => {
        // Screen is unfocused - pause all videos immediately
        setIsFocused(false);
        videoRefs.current.forEach((ref) => {
          if (ref.current) {
            ref.current.pauseAsync().catch(() => {});
            ref.current.setIsMutedAsync(true).catch(() => {});
          }
        });
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Bytes</Text>
        
        <TouchableOpacity 
          style={styles.tasksButton}
          onPress={() => setTasksVisible(true)}
        >
          <Ionicons name="clipboard" size={28} color="#06b6d4" />
        </TouchableOpacity>
      </View>

      {/* Video List */}
      <FlatList
        data={videos}
        renderItem={({ item, index }) => (
          <VideoItem 
            item={item} 
            isActive={index === activeVideoIndex && isFocused} 
            videoRef={videoRefs.current[index]}
          />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={VIDEO_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
      />

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

export default Bytes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#06b6d4',
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
  videoContainer: {
    width: SCREEN_WIDTH,
    height: VIDEO_HEIGHT,
    backgroundColor: '#000000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 80,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  videoDescription: {
    fontSize: 14,
    color: '#E5E7EB',
  },
  sideActions: {
    position: 'absolute',
    right: 15,
    bottom: 20,
    gap: 25,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 5,
  },
});
