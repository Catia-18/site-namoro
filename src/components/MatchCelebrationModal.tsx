import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Heart, MessageCircle, ArrowRight, Sparkles, Send } from 'lucide-react';
import { ICEBREAKER_SUGGESTIONS } from '../data/mockData';

interface MatchCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchedUser: UserProfile | null;
  currentUser: UserProfile;
  onStartChat: (initialMessage?: string) => void;
}

export const MatchCelebrationModal: React.FC<MatchCelebrationModalProps> = ({
  isOpen,
  onClose,
  matchedUser,
  currentUser,
  onStartChat,
}) => {
  const [selectedIcebreaker, setSelectedIcebreaker] = useState('');

  if (!isOpen || !matchedUser) return null;

  const handleSendQuickMessage = (text: string) => {
    onStartChat(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="max-w-md w-full text-center relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-rose-500/30 shadow-2xl shadow-rose-950/50">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Heart Icon */}
        <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 text-white shadow-xl shadow-rose-500/40 mb-4 animate-bounce">
          <Heart className="w-8 h-8 fill-white" />
        </div>

        {/* Title */}
        <h2 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-rose-400 via-rose-300 to-purple-300 bg-clip-text text-transparent mb-2">
          É um Match!
        </h2>
        
        <p className="text-slate-300 text-sm max-w-xs mx-auto mb-8">
          Você e <span className="font-semibold text-white">{matchedUser.name}</span> se curtiram mutuamente. A afinidade é de <span className="text-rose-400 font-bold">{matchedUser.compatibilityScore}%</span>.
        </p>

        {/* Two Avatar Cards */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 relative">
          {/* Current User Photo */}
          <div className="relative w-28 h-36 sm:w-32 sm:h-44 rounded-2xl overflow-hidden shadow-xl ring-2 ring-rose-500/80 -rotate-3 hover:rotate-0 transition-transform">
            <img
              src={currentUser.photos[0]}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
              <span className="text-white text-xs font-semibold">Você</span>
            </div>
          </div>

          {/* Central Heart Connector */}
          <div className="absolute z-10 w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/50 ring-4 ring-slate-900">
            <Heart className="w-5 h-5 fill-white animate-pulse" />
          </div>

          {/* Matched User Photo */}
          <div className="relative w-28 h-36 sm:w-32 sm:h-44 rounded-2xl overflow-hidden shadow-xl ring-2 ring-purple-500/80 rotate-3 hover:rotate-0 transition-transform">
            <img
              src={matchedUser.photos[0]}
              alt={matchedUser.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
              <span className="text-white text-xs font-semibold">{matchedUser.name}</span>
            </div>
          </div>
        </div>

        {/* Icebreaker Suggestions */}
        <div className="mb-6 text-left">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Quebre o gelo com uma pergunta:</span>
          </div>

          <div className="space-y-1.5">
            {ICEBREAKER_SUGGESTIONS.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSendQuickMessage(suggestion)}
                className="w-full text-left text-xs p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-rose-500/50 transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="truncate pr-2">{suggestion}</span>
                <Send className="w-3 h-3 text-rose-400 opacity-60 group-hover:opacity-100 shrink-0 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => onStartChat()}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold shadow-lg shadow-rose-500/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enviar mensagem agora</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer font-medium"
          >
            Continuar descobrindo
          </button>
        </div>

      </div>
    </div>
  );
};
