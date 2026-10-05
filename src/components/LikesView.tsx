import React from 'react';
import { ReceivedLike, UserProfile } from '../types';
import { Heart, X, Sparkles, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

interface LikesViewProps {
  likes: ReceivedLike[];
  onLikeBack: (like: ReceivedLike) => void;
  onPassLike: (likeId: string) => void;
  onOpenDetails: (user: UserProfile) => void;
  onGoToDiscover: () => void;
}

export const LikesView: React.FC<LikesViewProps> = ({
  likes,
  onLikeBack,
  onPassLike,
  onOpenDetails,
  onGoToDiscover,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
          <span>Quem Curtiu Você</span>
          <span className="text-sm font-sans bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
            {likes.length}
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Essas pessoas demonstraram interesse no seu perfil. Curta de volta para iniciar um Match imediato!
        </p>
      </div>

      {likes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {likes.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col group"
            >
              {/* Photo Area */}
              <div
                className="relative aspect-[3/4] cursor-pointer overflow-hidden bg-slate-900"
                onClick={() => onOpenDetails(item.user)}
              >
                <img
                  src={item.user.photos[0]}
                  alt={item.user.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Compatibility Badge */}
                <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-rose-400" />
                  <span>{item.user.compatibilityScore}% Afinidade</span>
                </div>

                {/* Scrim with name and info */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-serif-display text-xl font-bold">
                      {item.user.name}, {item.user.age}
                    </span>
                    {item.user.verified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <div className="text-xs text-slate-200 truncate">{item.user.occupation}</div>
                  <div className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>A {item.user.distanceKm} km · {item.likedAt}</span>
                  </div>
                </div>
              </div>

              {/* Bio & Actions */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {item.user.bio}
                </p>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onPassLike(item.id)}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>Passar</span>
                  </button>

                  <button
                    onClick={() => onLikeBack(item)}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-500/25 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Curtir de volta</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center shadow-sm max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif-display text-xl font-bold text-slate-900 mb-2">
            Nenhuma nova curtida por enquanto
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Mantenha seu perfil atualizado e continue ativo no Descobrir para chamar a atenção de pessoas compatíveis.
          </p>
          <button
            onClick={onGoToDiscover}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-semibold shadow-md shadow-rose-500/25 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explorar novos perfis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
