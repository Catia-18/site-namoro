import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Heart, MessageCircle, ArrowRight, Sparkles, Send, Music } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300 font-sans">
      <div className="max-w-md w-full text-center relative overflow-hidden bg-gradient-to-b from-slate-900 via-purple-950/90 to-slate-950 p-6 sm:p-8 rounded-3xl border border-pink-400/40 shadow-2xl shadow-pink-950/60">
        
        {/* Soft romantic glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Heart Badge */}
        <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 text-white shadow-xl shadow-pink-500/40 mb-3 animate-bounce">
          <Heart className="w-7 h-7 fill-white" />
        </div>

        {/* Title */}
        <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-pink-300 via-rose-200 to-purple-200 bg-clip-text text-transparent mb-1">
          É um Match Romântico! 💕✨
        </h2>
        
        <p className="text-pink-100/90 text-xs sm:text-sm max-w-xs mx-auto mb-6">
          Tu e a <span className="font-bold text-white">{matchedUser.name}</span> curtiram-se mutuamente! A vossa química é de <span className="text-pink-300 font-extrabold">{matchedUser.compatibilityScore}%</span>.
        </p>

        {/* Two Avatar Cards with Central Heart */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-7 relative">
          {/* Current User Photo */}
          <div className="relative w-28 h-36 sm:w-32 sm:h-44 rounded-3xl overflow-hidden shadow-xl ring-2 ring-purple-400/80 -rotate-3 hover:rotate-0 transition-transform">
            <img
              src={currentUser.photos[0]}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
              <span className="text-white text-xs font-bold">Tu (Adilson)</span>
            </div>
          </div>

          {/* Central Heart Connector */}
          <div className="absolute z-10 w-11 h-11 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/50 ring-4 ring-slate-900">
            <Heart className="w-6 h-6 fill-white animate-pulse" />
          </div>

          {/* Matched User Photo */}
          <div className="relative w-28 h-36 sm:w-32 sm:h-44 rounded-3xl overflow-hidden shadow-xl ring-2 ring-pink-400/80 rotate-3 hover:rotate-0 transition-transform">
            <img
              src={matchedUser.photos[0]}
              alt={matchedUser.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
              <span className="text-white text-xs font-bold">{matchedUser.name}</span>
            </div>
          </div>
        </div>

        {/* Icebreaker Suggestions */}
        <div className="mb-6 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold text-pink-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Quebra o gelo com uma pergunta de date:</span>
          </div>

          <div className="space-y-1.5">
            {ICEBREAKER_SUGGESTIONS.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSendQuickMessage(suggestion)}
                className="w-full text-left text-xs p-2.5 rounded-2xl bg-slate-900/80 hover:bg-pink-950/50 text-pink-100 border border-pink-400/20 hover:border-pink-400/60 transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="truncate pr-2">{suggestion}</span>
                <Send className="w-3 h-3 text-pink-400 opacity-60 group-hover:opacity-100 shrink-0 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => onStartChat()}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Conversar & Marcar Date 💬💕</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl text-pink-200/80 hover:text-white text-xs font-semibold hover:bg-white/5 transition-colors cursor-pointer"
          >
            Continuar a procurar o amor
          </button>
        </div>

      </div>
    </div>
  );
};
