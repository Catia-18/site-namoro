import React, { useState } from 'react';
import { UserProfile, Conversation } from '../types';
import { 
  Search, 
  Flame, 
  MessageCircle, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  ArrowRight,
  Clock
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
    <div className="max-w-4xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <span>Seus Matches</span>
            <span className="text-sm font-sans bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
              {matches.length}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pessoas que você curtiu e que também curtiram você de volta
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Buscar por nome ou profissão..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-slate-800"
          />
        </div>
      </div>

      {/* New Matches Carousel Row */}
      {matches.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Conexões Recentes
          </h3>
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
            {matches.map((user) => (
              <button
                key={user.id}
                onClick={() => onSelectMatch(user)}
                className="flex flex-col items-center shrink-0 group cursor-pointer"
              >
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl p-0.5 bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 shadow-md group-hover:scale-105 transition-all">
                  <img
                    src={user.photos[0]}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <span className="text-xs font-semibold text-slate-800 mt-1.5 truncate max-w-[70px]">
                  {user.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-rose-600 font-medium">
                  {user.compatibilityScore}% afinidade
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Matches Grid List */}
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMatches.map((user) => {
            const hasExistingChat = conversations.some((c) => c.partnerId === user.id);
            return (
              <div
                key={user.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3.5 text-white">
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif-display text-lg font-bold">
                        {user.name}, {user.age}
                      </span>
                      {user.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-200">{user.occupation}</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {user.bio}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onOpenDetails(user)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      Ver perfil
                    </button>

                    <button
                      onClick={() => onSelectMatch(user)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-semibold shadow-sm shadow-rose-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{hasExistingChat ? 'Continuar Chat' : 'Conversar'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center shadow-sm max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Flame className="w-8 h-8" />
          </div>
          <h3 className="font-serif-display text-xl font-bold text-slate-900 mb-2">
            Nenhum match com esse filtro
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Continue curtindo novos perfis no Descobrir para encontrar pessoas que também gostem de você.
          </p>
          <button
            onClick={onGoToDiscover}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-semibold shadow-md shadow-rose-500/25 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Ir para o Descobrir</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
