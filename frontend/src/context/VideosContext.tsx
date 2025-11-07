import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Video {
  id: string;
  uri: any;
  title: string;
  description: string;
  isUserUploaded?: boolean;
}

interface VideosContextType {
  videos: Video[];
  addVideo: (video: Video) => void;
}

const VideosContext = createContext<VideosContextType | undefined>(undefined);

// Initial videos
const initialVideos: Video[] = [
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

export const VideosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>(initialVideos);

  const addVideo = (video: Video) => {
    setVideos((prevVideos) => [...prevVideos, video]);
  };

  return (
    <VideosContext.Provider value={{ videos, addVideo }}>
      {children}
    </VideosContext.Provider>
  );
};

export const useVideos = () => {
  const context = useContext(VideosContext);
  if (context === undefined) {
    throw new Error('useVideos must be used within a VideosProvider');
  }
  return context;
};
