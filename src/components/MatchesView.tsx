import React, { useState } from 'react';
import { UserProfile, Conversation } from '../types';
import { 
  Search, 
  MessageCircle, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  ArrowRight,
  Music,
  BookOpen
} from 'lucide-react';

interface MatchesViewProps {
  matches: UserProfile[];
  conversations: Conversation[];
  onSelectMatch: (user: UserProfile) => void;
  onOpenDetails: (user: UserProfile) => void;
  onGoToDiscover: () => void;
}

export const MatchesView: React.FC<MatchesViewProps> = ({
  matches,
  conversations,
  onSelectMatch,
  onOpenDetails,
  onGoToDiscover,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMatches = matches.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.occupation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-700 bg-pink-100/70 px-3 py-1 rounded-full mb-2 border border-pink-200/50">
            <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
            <span>Namoro & Encontros em Angola 🇦🇴</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>Os Teus Matches Românticos</span>
            <span className="text-xs bg-pink-100 text-pink-700 font-bold px-2.5 py-0.5 rounded-full border border-pink-200">
              {matches.length}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pessoas especiais que curtiram o teu perfil e com quem deste match mútuo! É hora de marcar o date. 💕
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Procurar por nome ou curso..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-2xl border border-purple-100 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 shadow-xs"
          />
        </div>
      </div>

      {/* New Matches Carousel Row */}
      {matches.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>Novos Matches</span>
              <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.2 rounded-full font-semibold">
                Online para conversar 💕
              </span>
            </h3>
          </div>
          
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
            {matches.map((user) => (
              <button
                key={user.id}
                onClick={() => onSelectMatch(user)}
                className="flex flex-col items-center shrink-0 group cursor-pointer"
              >
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-3xl p-0.5 bg-gradient-to-tr from-purple-500 via-pink-400 to-rose-400 shadow-md group-hover:scale-105 transition-all">
                  <img
                    src={user.photos[0]}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-[22px]"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white shadow-xs" />
                </div>
                <span className="text-xs font-bold text-slate-800 mt-1.5 truncate max-w-[70px]">
                  {user.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-pink-600 font-bold">
                  {user.compatibilityScore}% química
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Matches Grid List */}
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMatches.map((user) => {
            const hasExistingChat = conversations.some((c) => c.partnerId === user.id);
            return (
              <div
                key={user.id}
                className="bg-white rounded-3xl border border-purple-100/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div
                  className="relative aspect-[4/3] cursor-pointer"
                  onClick={() => onOpenDetails(user)}
                >
                  <img
                    src={user.photos[0]}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-4 text-white">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-lg font-bold">
                        {user.name}, {user.age}
                      </span>
                      {user.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                    <span className="text-[11px] text-pink-200 line-clamp-1">{user.occupation}</span>
                    {user.lifestyle?.favoriteSong && (
                      <div className="flex items-center gap-1 text-[10px] text-sky-200 mt-0.5">
                        <Music className="w-2.5 h-2.5" />
                        <span className="truncate">{user.lifestyle.favoriteSong}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {user.bio}
                  </p>

                  <div className="pt-3 border-t border-purple-50 flex items-center justify-between">
                    <button
                      onClick={() => onOpenDetails(user)}
                      className="text-xs font-semibold text-purple-700 hover:text-purple-900 transition-colors cursor-pointer"
                    >
                      Ver perfil 🌹
                    </button>

                    <button
                      onClick={() => onSelectMatch(user)}
                      className="px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:opacity-95 text-white text-xs font-bold shadow-sm shadow-pink-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{hasExistingChat ? 'Continuar Chat' : 'Conversar & Date 💬'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-10 border border-purple-100 text-center shadow-xs max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-3xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4 text-2xl">
            💖
          </div>
          <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
            Nenhum match com esse filtro
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Continua a explorar perfis de solteiros no Descobrir para encontrares quem também quer namorar contigo em Luanda.
          </p>
          <button
            onClick={onGoToDiscover}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white text-xs font-bold shadow-md shadow-pink-500/25 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Descobrir Crush</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
