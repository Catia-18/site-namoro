import React from 'react';
import { AppScreen } from '../types';
import { 
  Sparkles, 
  Compass, 
  Heart, 
  MessageCircle, 
  User, 
  Home, 
  UserPlus, 
  SlidersHorizontal,
  Flame
} from 'lucide-react';

interface PresentationBarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onTriggerMatchDemo: () => void;
  onTriggerProfileDetailDemo: () => void;
  onTriggerReportDemo: () => void;
  onResetDemo: () => void;
}

export const PresentationBar: React.FC<PresentationBarProps> = ({
  currentScreen,
  onNavigate,
  onTriggerMatchDemo,
  onTriggerProfileDetailDemo,
  onTriggerReportDemo,
  onResetDemo,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-[95vw] sm:max-w-2xl">
      <div className="bg-slate-900/90 text-white backdrop-blur-md px-3 py-2 rounded-2xl shadow-2xl border border-slate-700/60 flex items-center gap-1.5 transition-all text-xs">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors font-medium cursor-pointer"
          title="Abrir mapa de navegação de apresentação"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span className="hidden sm:inline">Modo Demonstração</span>
          <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold ml-0.5">
            10 Telas
          </span>
        </button>

        <div className="h-4 w-px bg-slate-700 mx-1" />

        {/* Quick jump buttons */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              currentScreen === 'landing' ? 'bg-white text-slate-900 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Home className="w-3 h-3" />
            <span>Landing</span>
          </button>

          <button
            onClick={() => onNavigate('discover')}
            className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              currentScreen === 'discover' ? 'bg-white text-slate-900 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3 h-3" />
            <span>Descobrir</span>
          </button>

          <button
            onClick={onTriggerMatchDemo}
            className="px-2 py-1 rounded-md text-amber-300 hover:bg-amber-500/20 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 font-medium"
            title="Exibir tela de Match instantâneo"
          >
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Tela Match</span>
          </button>

          <button
            onClick={() => onNavigate('chat')}
            className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              currentScreen === 'chat' ? 'bg-white text-slate-900 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageCircle className="w-3 h-3" />
            <span>Chat</span>
          </button>

          <button
            onClick={() => onNavigate('likes')}
            className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              currentScreen === 'likes' ? 'bg-white text-slate-900 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Heart className="w-3 h-3" />
            <span>Curtidas</span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              currentScreen === 'profile' ? 'bg-white text-slate-900 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <User className="w-3 h-3" />
            <span>Meu Perfil</span>
          </button>
        </div>

        {/* Extended drawer */}
        {isExpanded && (
          <div className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-semibold text-slate-300">Mapa Completo de Telas do Protótipo:</span>
              <button 
                onClick={onResetDemo}
                className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                Reiniciar Dados
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
              <button
                onClick={() => { onNavigate('landing'); setIsExpanded(false); }}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Home className="w-3.5 h-3.5 text-rose-400" />
                <span>1. Landing Page</span>
              </button>
              <button
                onClick={() => { onNavigate('register'); setIsExpanded(false); }}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 text-purple-400" />
                <span>2. Cadastro</span>
              </button>
              <button
                onClick={() => { onNavigate('login'); setIsExpanded(false); }}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>3. Login</span>
              </button>
              <button
                onClick={() => { onNavigate('onboarding'); setIsExpanded(false); }}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>4. Onboarding (3 etapas)</span>
              </button>
              <button
                onClick={() => { onNavigate('discover'); setIsExpanded(false); }}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-rose-400" />
                <span>5. Descobrir (Cards)</span>
              </button>
              <button
                onClick={() => { onTriggerProfileDetailDemo(); setIsExpanded(false); }}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-pink-400" />
                <span>6. Perfil Expandido</span>
              </button>
              <button
                onClick={() => { onTriggerMatchDemo(); setIsExpanded(false); }}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>7. Tela de Match!</span>
              </button>
              <button
                onClick={() => { onNavigate('chat'); setIsExpanded(false); }}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>8. Mensagens & Chat</span>
              </button>
              <button
                onClick={() => { onNavigate('likes'); setIsExpanded(false); }}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>9. Curtidas Recebidas</span>
              </button>
              <button
                onClick={() => { onNavigate('profile'); setIsExpanded(false); }}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span>10. Meu Perfil</span>
              </button>
              <button
                onClick={() => { onNavigate('settings'); setIsExpanded(false); }}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span>11. Configurações</span>
              </button>
              <button
                onClick={() => { onTriggerReportDemo(); setIsExpanded(false); }}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-rose-300 transition-colors flex items-center gap-1.5"
              >
                <span className="w-3.5 h-3.5 flex items-center justify-center font-bold text-[10px] text-rose-400">🛡️</span>
                <span>12. Denúncia / Bloqueio</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
