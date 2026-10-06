import React from 'react';
import { AppScreen } from '../types';
import { Compass, Heart, Sparkles, MessageCircle, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  likesCount: number;
  unreadMessagesCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScreen,
  onNavigate,
  likesCount,
  unreadMessagesCount,
}) => {
  const isAuthOrLanding = currentScreen === 'landing' || currentScreen === 'register' || currentScreen === 'login' || currentScreen === 'onboarding';
  if (isAuthOrLanding) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-100 px-2 py-1.5 safe-area-pb font-sans shadow-lg">
      <div className="grid grid-cols-5 items-center">
        <button
          onClick={() => onNavigate('discover')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentScreen === 'discover' ? 'text-purple-600 font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Descobrir</span>
        </button>

        <button
          onClick={() => onNavigate('likes')}
          className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
            currentScreen === 'likes' ? 'text-pink-600 font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {likesCount > 0 && (
              <span className="absolute -top-1 -right-2 text-[9px] font-bold bg-pink-500 text-white rounded-full px-1 min-w-[14px] text-center shadow-xs">
                {likesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Curtidas 💖</span>
        </button>

        <button
          onClick={() => onNavigate('matches')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentScreen === 'matches' ? 'text-pink-600 font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Matches 💕</span>
        </button>

        <button
          onClick={() => onNavigate('chat')}
          className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
            currentScreen === 'chat' ? 'text-purple-600 font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-2 text-[9px] font-bold bg-purple-600 text-white rounded-full px-1 min-w-[14px] text-center shadow-xs">
                {unreadMessagesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Chat 💬</span>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentScreen === 'profile' ? 'text-purple-600 font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Perfil</span>
        </button>
      </div>
    </nav>
  );
};
