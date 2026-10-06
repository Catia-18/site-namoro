import React from 'react';
import { AppScreen } from '../types';
import { 
  Heart, 
  Sparkles, 
  MessageCircle, 
  User, 
  Bell, 
  SlidersHorizontal,
  Flame
} from 'lucide-react';

interface NavbarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  unreadNotificationsCount: number;
  unreadMessagesCount: number;
  likesCount: number;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  userAvatar: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  unreadNotificationsCount,
  unreadMessagesCount,
  likesCount,
  onOpenNotifications,
  onOpenSettings,
  userAvatar,
}) => {
  const isAuthOrLanding = currentScreen === 'landing' || currentScreen === 'register' || currentScreen === 'login';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-100 transition-all shadow-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark with romantic heart icon */}
        <button
          onClick={() => onNavigate(isAuthOrLanding ? 'landing' : 'discover')}
          className="flex items-center gap-2 group cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-400 flex items-center justify-center text-white shadow-sm shadow-pink-500/25 group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 fill-white text-white" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-rose-600 bg-clip-text text-transparent">
              Conecta
            </span>
            <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-1.5 py-0.2 rounded-md border border-pink-200 hidden sm:inline">
              Namoro 💖
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        {isAuthOrLanding ? (
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
            <a href="#como-funciona" className="hover:text-pink-600 transition-colors">
              Como Funciona 💘
            </a>
            <a href="#beneficios" className="hover:text-pink-600 transition-colors">
              Dates & Romance 🌹
            </a>
            <a href="#depoimentos" className="hover:text-pink-600 transition-colors">
              Casais Conecta 💕
            </a>
            <a href="#seguranca" className="hover:text-pink-600 transition-colors">
              Namoro Seguro 🛡️
            </a>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-1.5 sm:gap-2 text-xs font-semibold">
            <button
              onClick={() => onNavigate('discover')}
              className={`px-3.5 py-2 rounded-2xl transition-all flex items-center gap-2 cursor-pointer ${
                currentScreen === 'discover'
                  ? 'bg-purple-100/80 text-purple-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
              <span>Descobrir Crush 💘</span>
            </button>

            <button
              onClick={() => onNavigate('likes')}
              className={`px-3.5 py-2 rounded-2xl transition-all flex items-center gap-2 cursor-pointer relative ${
                currentScreen === 'likes'
                  ? 'bg-purple-100/80 text-purple-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Quem me Curtiu</span>
              {likesCount > 0 && (
                <span className="ml-1 text-[10px] font-bold bg-pink-500 text-white rounded-full px-1.5 py-0.2 shadow-xs">
                  {likesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('matches')}
              className={`px-3.5 py-2 rounded-2xl transition-all flex items-center gap-2 cursor-pointer ${
                currentScreen === 'matches'
                  ? 'bg-purple-100/80 text-purple-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Matches 💕</span>
            </button>

            <button
              onClick={() => onNavigate('chat')}
              className={`px-3.5 py-2 rounded-2xl transition-all flex items-center gap-2 cursor-pointer relative ${
                currentScreen === 'chat'
                  ? 'bg-purple-100/80 text-purple-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-purple-500" />
              <span>Conversas 💬</span>
              {unreadMessagesCount > 0 && (
                <span className="ml-1 text-[10px] font-bold bg-purple-600 text-white rounded-full px-1.5 py-0.2 shadow-xs">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className={`px-3.5 py-2 rounded-2xl transition-all flex items-center gap-2 cursor-pointer ${
                currentScreen === 'profile'
                  ? 'bg-purple-100/80 text-purple-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <User className="w-3.5 h-3.5 text-purple-500" />
              <span>O Meu Perfil</span>
            </button>
          </nav>
        )}

        {/* Zone 3: Primary Actions */}
        {isAuthOrLanding ? (
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate('login')}
              className="text-xs font-bold text-slate-700 hover:text-purple-600 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Entrar
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="text-xs font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:opacity-95 px-4.5 py-2 rounded-2xl shadow-sm shadow-pink-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Heart className="w-3 h-3 fill-white" />
              <span>Criar Perfil 💕</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 rounded-2xl text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
              title="Notificações"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 ring-2 ring-white" />
              )}
            </button>

            <button
              onClick={onOpenSettings}
              className="p-2.5 rounded-2xl text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
              title="Configurações & Privacidade"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className="relative cursor-pointer ml-1 group"
              title="Ir para o meu perfil"
            >
              <img
                src={userAvatar}
                alt="Meu Avatar"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-2xl object-cover ring-2 ring-purple-200 group-hover:ring-pink-400 transition-all"
              />
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
