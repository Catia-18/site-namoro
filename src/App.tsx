import React, { useState } from 'react';
import { 
  AppScreen, 
  UserProfile, 
  Conversation, 
  ReceivedLike, 
  AppNotification, 
  FilterState, 
  ChatMessage 
} from './types';
import { 
  CURRENT_USER, 
  DISCOVER_PROFILES, 
  INITIAL_CONVERSATIONS, 
  INITIAL_LIKES_RECEIVED, 
  INITIAL_NOTIFICATIONS, 
  DEFAULT_FILTERS 
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LandingPage } from './components/LandingPage';
import { AuthScreen } from './components/AuthScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { DiscoverView } from './components/DiscoverView';
import { MatchesView } from './components/MatchesView';
import { ChatView } from './components/ChatView';
import { LikesView } from './components/LikesView';
import { MyProfileView } from './components/MyProfileView';
import { FilterModal } from './components/FilterModal';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { MatchCelebrationModal } from './components/MatchCelebrationModal';
import { ReportModal } from './components/ReportModal';
import { EditProfileModal } from './components/EditProfileModal';
import { NotificationsModal } from './components/NotificationsModal';
import { SettingsModal } from './components/SettingsModal';
import { PresentationBar } from './components/PresentationBar';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

  // Core Data State
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [discoverProfiles, setDiscoverProfiles] = useState<UserProfile[]>(DISCOVER_PROFILES);
  const [matches, setMatches] = useState<UserProfile[]>([
    DISCOVER_PROFILES[0], // Kianda
    DISCOVER_PROFILES[1], // Weza
    DISCOVER_PROFILES[2], // Esperança
  ]);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv_kianda');
  const [likesReceived, setLikesReceived] = useState<ReceivedLike[]>(INITIAL_LIKES_RECEIVED);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Modals State
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedDetailProfile, setSelectedDetailProfile] = useState<UserProfile | null>(null);
  const [matchedProfileForModal, setMatchedProfileForModal] = useState<UserProfile | null>(null);
  const [reportTargetProfile, setReportTargetProfile] = useState<UserProfile | null>(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Unread counts
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Handlers for Discover & Likes
  const handleLike = (user: UserProfile) => {
    // If liking Kianda, Esperança or anyone who liked user, trigger Match modal!
    const isReciprocal = likesReceived.some((l) => l.user.id === user.id) || user.id === 'user_kianda';

    if (isReciprocal) {
      // Add to matches if not already there
      if (!matches.some((m) => m.id === user.id)) {
        setMatches([user, ...matches]);
      }
      // Remove from likes received
      setLikesReceived(likesReceived.filter((l) => l.user.id !== user.id));
      // Trigger celebratory Match modal!
      setMatchedProfileForModal(user);
    } else {
      showToast(`Você curtiu ${user.name}!`);
    }
  };

  const handlePass = (user: UserProfile) => {
    // Just pass
  };

  const handleSuperLike = (user: UserProfile) => {
    showToast(`Super Like enviado para ${user.name}! ⭐`);
    // Treat as instant match
    if (!matches.some((m) => m.id === user.id)) {
      setMatches([user, ...matches]);
    }
    setMatchedProfileForModal(user);
  };

  const handleLikeBackFromLikesView = (like: ReceivedLike) => {
    // Add to matches
    if (!matches.some((m) => m.id === like.user.id)) {
      setMatches([like.user, ...matches]);
    }
    // Remove from received likes
    setLikesReceived(likesReceived.filter((l) => l.id !== like.id));
    // Trigger celebratory Match modal!
    setMatchedProfileForModal(like.user);
  };

  const handlePassLikeFromLikesView = (likeId: string) => {
    setLikesReceived(likesReceived.filter((l) => l.id !== likeId));
    showToast('Perfil removido da lista de curtidas.');
  };

  // Match Modal -> Chat trigger
  const handleStartChatFromMatch = (initialMessage?: string) => {
    if (!matchedProfileForModal) return;

    const partner = matchedProfileForModal;
    setMatchedProfileForModal(null);

    // Find or create conversation
    let existingConv = conversations.find((c) => c.partnerId === partner.id);
    if (!existingConv) {
      const newConv: Conversation = {
        id: `conv_${partner.id}_${Date.now()}`,
        partnerId: partner.id,
        partner: partner,
        isOnline: true,
        lastMessage: initialMessage || 'Novo match!',
        lastMessageTime: 'Agora',
        unreadCount: 0,
        messages: initialMessage ? [
          {
            id: `msg_${Date.now()}`,
            senderId: 'me',
            text: initialMessage,
            timestamp: 'Agora',
            read: true,
          }
        ] : [],
      };
      setConversations([newConv, ...conversations]);
      setActiveConversationId(newConv.id);
    } else {
      if (initialMessage) {
        const newMsg: ChatMessage = {
          id: `msg_${Date.now()}`,
          senderId: 'me',
          text: initialMessage,
          timestamp: 'Agora',
          read: true,
        };
        existingConv.messages.push(newMsg);
        existingConv.lastMessage = initialMessage;
        existingConv.lastMessageTime = 'Agora';
      }
      setActiveConversationId(existingConv.id);
    }

    setCurrentScreen('chat');
  };

  // Chat message sending
  const handleSendMessage = (conversationId: string, text: string) => {
    const isAutoReply = text.startsWith('[');
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: isAutoReply ? 'partner' : 'me',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMsg],
            lastMessage: isAutoReply ? text.replace(/^\[.*?\]:\s*/, '') : text,
            lastMessageTime: 'Agora',
          };
        }
        return conv;
      })
    );
  };

  // Notifications handler
  const handleNotificationClick = (notif: AppNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setIsNotificationsModalOpen(false);
    if (notif.actionScreen) {
      setCurrentScreen(notif.actionScreen);
    }
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Todas as notificações foram marcadas como lidas.');
  };

  // Report & Block handler
  const handleBlockOrReport = (action: 'block' | 'report', reason: string) => {
    if (!reportTargetProfile) return;
    const targetId = reportTargetProfile.id;

    // Filter out from discover
    setDiscoverProfiles((prev) => prev.filter((p) => p.id !== targetId));
    // Filter out from matches
    setMatches((prev) => prev.filter((p) => p.id !== targetId));
    // Filter out from conversations
    setConversations((prev) => prev.filter((c) => c.partnerId !== targetId));
    // Filter out from likes
    setLikesReceived((prev) => prev.filter((l) => l.user.id !== targetId));

    showToast(
      action === 'report'
        ? `Denúncia registrada e ${reportTargetProfile.name} foi bloqueado(a).`
        : `${reportTargetProfile.name} foi bloqueado(a).`
    );
    setReportTargetProfile(null);
  };

  // Reset entire stack to showcase again
  const handleResetStack = () => {
    setDiscoverProfiles(DISCOVER_PROFILES);
    showToast('Feed de perfis restaurado com sucesso.');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-slate-900 flex flex-col font-sans selection:bg-rose-500 selection:text-white pb-16 md:pb-0">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-xs font-medium px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-md animate-in fade-in slide-in-from-top-2 flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        unreadNotificationsCount={unreadNotificationsCount}
        unreadMessagesCount={unreadMessagesCount}
        likesCount={likesReceived.length}
        onOpenNotifications={() => setIsNotificationsModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        userAvatar={currentUser.photos[0]}
      />

      {/* Main Screen Views */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'landing' && (
          <LandingPage
            onRegister={() => {
              setAuthMode('register');
              setCurrentScreen('register');
            }}
            onLogin={() => {
              setAuthMode('login');
              setCurrentScreen('login');
            }}
            onExploreDemo={() => setCurrentScreen('discover')}
          />
        )}

        {(currentScreen === 'register' || currentScreen === 'login') && (
          <AuthScreen
            initialMode={currentScreen}
            onSuccess={(isNewUser) => {
              if (isNewUser) {
                setCurrentScreen('onboarding');
              } else {
                setCurrentScreen('discover');
              }
            }}
            onBackToLanding={() => setCurrentScreen('landing')}
          />
        )}

        {currentScreen === 'onboarding' && (
          <OnboardingFlow
            onComplete={() => {
              showToast('Perfil configurado com sucesso! Bem-vindo ao Conecta.');
              setCurrentScreen('discover');
            }}
            onCancel={() => setCurrentScreen('landing')}
          />
        )}

        {currentScreen === 'discover' && (
          <DiscoverView
            profiles={discoverProfiles}
            onLike={handleLike}
            onPass={handlePass}
            onSuperLike={handleSuperLike}
            onOpenDetails={(user) => setSelectedDetailProfile(user)}
            onOpenFilters={() => setIsFilterModalOpen(true)}
            onResetStack={handleResetStack}
            activeFiltersCount={filters.selectedInterests.length + (filters.verifiedOnly ? 1 : 0)}
          />
        )}

        {currentScreen === 'matches' && (
          <MatchesView
            matches={matches}
            conversations={conversations}
            onSelectMatch={(user) => {
              // Find or create conversation
              const conv = conversations.find((c) => c.partnerId === user.id);
              if (conv) {
                setActiveConversationId(conv.id);
              } else {
                const newConv: Conversation = {
                  id: `conv_${user.id}`,
                  partnerId: user.id,
                  partner: user,
                  isOnline: true,
                  lastMessage: 'Comece uma conversa!',
                  lastMessageTime: 'Agora',
                  unreadCount: 0,
                  messages: [],
                };
                setConversations([newConv, ...conversations]);
                setActiveConversationId(newConv.id);
              }
              setCurrentScreen('chat');
            }}
            onOpenDetails={(user) => setSelectedDetailProfile(user)}
            onGoToDiscover={() => setCurrentScreen('discover')}
          />
        )}

        {currentScreen === 'chat' && (
          <ChatView
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={(id) => setActiveConversationId(id)}
            onSendMessage={handleSendMessage}
            onOpenDetails={(user) => setSelectedDetailProfile(user)}
          />
        )}

        {currentScreen === 'likes' && (
          <LikesView
            likes={likesReceived}
            onLikeBack={handleLikeBackFromLikesView}
            onPassLike={handlePassLikeFromLikesView}
            onOpenDetails={(user) => setSelectedDetailProfile(user)}
            onGoToDiscover={() => setCurrentScreen('discover')}
          />
        )}

        {currentScreen === 'profile' && (
          <MyProfileView
            currentUser={currentUser}
            onOpenEdit={() => setIsEditProfileModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
            likesCount={likesReceived.length}
            matchesCount={matches.length}
          />
        )}

        {currentScreen === 'settings' && (
          <div className="flex-1 p-4 flex items-center justify-center">
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 shadow-md font-semibold text-sm"
            >
              Abrir Painel de Configurações
            </button>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation (Ergonomic thumb-zone) */}
      <MobileBottomNav
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        likesCount={likesReceived.length}
        unreadMessagesCount={unreadMessagesCount}
      />

      {/* Floating Presentation & Prototype Demo Controller */}
      <PresentationBar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          if (screen === 'settings') {
            setIsSettingsModalOpen(true);
          } else {
            setCurrentScreen(screen);
          }
        }}
        onTriggerMatchDemo={() => {
          setMatchedProfileForModal(DISCOVER_PROFILES[0]);
        }}
        onTriggerProfileDetailDemo={() => {
          setSelectedDetailProfile(DISCOVER_PROFILES[0]);
        }}
        onTriggerReportDemo={() => {
          setReportTargetProfile(DISCOVER_PROFILES[3]);
        }}
        onResetDemo={() => {
          setDiscoverProfiles(DISCOVER_PROFILES);
          setLikesReceived(INITIAL_LIKES_RECEIVED);
          setMatches([DISCOVER_PROFILES[0], DISCOVER_PROFILES[1], DISCOVER_PROFILES[2]]);
          setConversations(INITIAL_CONVERSATIONS);
          showToast('Dados e perfis de demonstração reiniciados!');
        }}
      />

      {/* Modals & Overlays */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
          showToast('Filtros aplicados com sucesso!');
        }}
        onResetFilters={() => {
          setFilters(DEFAULT_FILTERS);
          showToast('Filtros restaurados para o padrão.');
        }}
      />

      <ProfileDetailModal
        user={selectedDetailProfile}
        isOpen={!!selectedDetailProfile}
        onClose={() => setSelectedDetailProfile(null)}
        onLike={(user) => {
          setSelectedDetailProfile(null);
          handleLike(user);
        }}
        onPass={(user) => {
          setSelectedDetailProfile(null);
          handlePass(user);
        }}
        onSuperLike={(user) => {
          setSelectedDetailProfile(null);
          handleSuperLike(user);
        }}
        onOpenReport={(user) => {
          setSelectedDetailProfile(null);
          setReportTargetProfile(user);
        }}
      />

      <MatchCelebrationModal
        isOpen={!!matchedProfileForModal}
        onClose={() => setMatchedProfileForModal(null)}
        matchedUser={matchedProfileForModal}
        currentUser={currentUser}
        onStartChat={handleStartChatFromMatch}
      />

      <ReportModal
        isOpen={!!reportTargetProfile}
        onClose={() => setReportTargetProfile(null)}
        targetUser={reportTargetProfile}
        onConfirmBlockOrReport={handleBlockOrReport}
      />

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        currentUser={currentUser}
        onSave={(updated) => {
          setCurrentUser(updated);
          showToast('Perfil atualizado com sucesso!');
        }}
      />

      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onNotificationClick={handleNotificationClick}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onLogout={() => {
          setIsSettingsModalOpen(false);
          setCurrentScreen('landing');
          showToast('Você saiu da sua conta.');
        }}
      />

    </div>
  );
}
