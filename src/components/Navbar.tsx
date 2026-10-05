import React from 'react';
import { AppScreen } from '../types';
import { 
  Heart, 
  Compass, 
  MessageCircle, 
  User, 
  Bell, 
  SlidersHorizontal,
  Flame,
  CheckCircle2
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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element wordmark) */}
        <button
          onClick={() => onNavigate(isAuthOrLanding ? 'landing' : 'discover')}
          className="flex items-center gap-2 group cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-rose-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-4 h-4 fill-white text-white" />
          </div>
          <span className="font-serif-display text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-rose-600 bg-clip-text text-transparent">
            Conecta
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        {isAuthOrLanding ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#como-funciona" className="hover:text-rose-600 transition-colors">
              Como Funciona
            </a>
            <a href="#beneficios" className="hover:text-rose-600 transition-colors">
              Diferenciais
            </a>
            <a href="#depoimentos" className="hover:text-rose-600 transition-colors">
              Histórias Reais
            </a>
            <a href="#seguranca" className="hover:text-rose-600 transition-colors">
              Segurança
            </a>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium">
            <button
              onClick={() => onNavigate('discover')}
              className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
                currentScreen === 'discover'
                  ? 'bg-rose-50 text-rose-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Descobrir</span>
            </button>

            <button
              onClick={() => onNavigate('likes')}
              className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-2 cursor-pointer relative ${
                currentScreen === 'likes'
                  ? 'bg-rose-50 text-rose-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Curtidas</span>
              {likesCount > 0 && (
                <span className="ml-1 text-[11px] font-semibold bg-rose-500 text-white rounded-full px-1.5 py-0.2">
                  {likesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('matches')}
              className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
                currentScreen === 'matches'
                  ? 'bg-rose-50 text-rose-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Matches</span>
            </button>

            <button
              onClick={() => onNavigate('chat')}
              className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-2 cursor-pointer relative ${
                currentScreen === 'chat'
                  ? 'bg-rose-50 text-rose-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Mensagens</span>
              {unreadMessagesCount > 0 && (
                <span className="ml-1 text-[11px] font-semibold bg-purple-600 text-white rounded-full px-1.5 py-0.2">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
                currentScreen === 'profile'
                  ? 'bg-rose-50 text-rose-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Meu Perfil</span>
            </button>
          </nav>
        )}

        {/* Zone 3: Primary Actions */}
        {isAuthOrLanding ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('login')}
              className="text-sm font-semibold text-slate-700 hover:text-rose-600 px-3 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Entrar
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 px-4 py-2 rounded-xl shadow-sm shadow-rose-500/20 active:scale-95 transition-all cursor-pointer"
            >
              Criar minha conta
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Notificações"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            <button
              onClick={onOpenSettings}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Configurações de Conta e Segurança"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-rose-200 transition-all cursor-pointer"
              title="Acessar meu perfil"
            >
              <img
                src={userAvatar}
                alt="Meu perfil"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
              />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
