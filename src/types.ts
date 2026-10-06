export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'feminino' | 'masculino' | 'nao-binario';
  occupation: string;
  companyOrCollege?: string;
  distanceKm: number;
  location: string;
  bio: string;
  photos: string[];
  interests: string[];
  relationshipGoal: 'namoro-serio' | 'romance-encontros' | 'conhecer-crush' | 'aberto-ao-amor' | string;
  relationshipGoalLabel: string;
  verified: boolean;
  lifestyle: {
    favoriteSong?: string;
    vibeEmoji?: string;
    zodiac?: string;
    studyArea?: string;
    sports?: string;
    pets?: string;
    languages?: string[];
  };
  compatibilityScore: number; // e.g. 98%
  compatibilityHighlights: string[];
}

export interface MatchItem {
  id: string;
  userId: string;
  matchedAt: string;
  user: UserProfile;
  unread: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string; // 'me' or user id
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  partnerId: string;
  partner: UserProfile;
  messages: ChatMessage[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface ReceivedLike {
  id: string;
  user: UserProfile;
  likedAt: string;
  mutual?: boolean;
}

export interface AppNotification {
  id: string;
  type: 'match' | 'message' | 'like' | 'security';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  actionScreen?: AppScreen;
}

export interface FilterState {
  maxDistance: number;
  ageRange: [number, number];
  gender: 'todos' | 'feminino' | 'masculino' | 'todos';
  relationshipGoals: string[];
  selectedInterests: string[];
  verifiedOnly: boolean;
}

export type AppScreen = 
  | 'landing'
  | 'register'
  | 'login'
  | 'onboarding'
  | 'discover'
  | 'matches'
  | 'chat'
  | 'likes'
  | 'profile'
  | 'settings';
