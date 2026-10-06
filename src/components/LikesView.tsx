import React from 'react';
import { ReceivedLike, UserProfile } from '../types';
import { Heart, X, Sparkles, ShieldCheck, MapPin, ArrowRight, Music } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto px-4 py-6 font-sans">
      
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-700 bg-pink-100/70 px-3 py-1 rounded-full mb-2 border border-pink-200/50">
          <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
          <span>Interesse Romântico 💖</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
          <span>Quem Tem um Crush por Ti</span>
          <span className="text-xs bg-pink-100 text-pink-700 font-bold px-2.5 py-0.5 rounded-full border border-pink-200">
            {likes.length}
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Estas pessoas curtiram o teu perfil e querem conhecer-te melhor. Curte de volta para desbloquear um Match imediato e começarem a conversar! 💕
        </p>
      </div>

      {likes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {likes.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-purple-100/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
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
                <div className="absolute top-3 left-3 bg-purple-950/80 backdrop-blur-md text-pink-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-pink-400/30 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                  <span>{item.user.compatibilityScore}% Química Romântica</span>
                </div>

                {/* Scrim with name and info */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-display text-xl font-bold">
                      {item.user.name}, {item.user.age}
                    </span>
                    {item.user.verified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <div className="text-xs text-pink-200 truncate">{item.user.occupation}</div>
                  
                  {item.user.lifestyle?.favoriteSong && (
                    <div className="flex items-center gap-1 text-[10px] text-sky-200 mt-1">
                      <Music className="w-2.5 h-2.5" />
                      <span className="truncate">{item.user.lifestyle.favoriteSong}</span>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-300 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-pink-400" />
                    <span>A {item.user.distanceKm} km · {item.likedAt}</span>
                  </div>
                </div>
              </div>

              {/* Bio & Actions */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {item.user.bio}
                </p>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-purple-50">
                  <button
                    onClick={() => onPassLike(item.id)}
                    className="flex-1 py-2 px-3 rounded-2xl border border-purple-100 text-slate-600 hover:bg-slate-100 hover:text-slate-900 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                    <span>Passar</span>
                  </button>

                  <button
                    onClick={() => onLikeBack(item)}
                    className="flex-1 py-2 px-3 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-pink-500/25 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Dar Match 💕</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-10 border border-purple-100 text-center shadow-xs max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-3xl bg-pink-50 text-pink-500 flex items-center justify-center mx-auto mb-4 text-2xl">
            💌
          </div>
          <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
            Nenhuma curtida pendente
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Quando outros solteiros em Luanda curtirem o teu perfil, eles vão aparecer aqui para poderes dar match imediato e marcarem um date.
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
