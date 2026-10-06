import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  X, 
  Heart, 
  Star, 
  MapPin, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  Music,
  Smile,
  Compass
} from 'lucide-react';

interface ProfileDetailModalProps {
  user: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (user: UserProfile) => void;
  onPass: (user: UserProfile) => void;
  onSuperLike: (user: UserProfile) => void;
  onOpenReport: (user: UserProfile) => void;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  user,
  isOpen,
  onClose,
  onLike,
  onPass,
  onSuperLike,
  onOpenReport,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!isOpen || !user) return null;

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user.photos.length > 0) {
      setPhotoIndex((prev) => (prev + 1) % user.photos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user.photos.length > 0) {
      setPhotoIndex((prev) => (prev - 1 + user.photos.length) % user.photos.length);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[92vh] relative">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900/80 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto no-scrollbar pb-24">
          
          {/* Photo Gallery Carousel */}
          <div className="relative aspect-[3/4] w-full bg-slate-950">
            <img
              src={user.photos[photoIndex] || user.photos[0]}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />

            {/* Photo Indicators Bar */}
            <div className="absolute top-3 left-4 right-14 flex items-center gap-1.5 z-10">
              {user.photos.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    i === photoIndex ? 'bg-white shadow-sm' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Left & Right Touch/Click zones */}
            {user.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Compatibility Tag Floating */}
            <div className="absolute bottom-4 left-4 z-10 bg-purple-950/85 backdrop-blur-md text-pink-200 px-3.5 py-1.5 rounded-2xl border border-pink-400/30 flex items-center gap-2 shadow-lg">
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
              <span className="text-xs font-bold">{user.compatibilityScore}% Química Romântica 💕</span>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {user.name}, {user.age}
                </h3>
                {user.verified && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Estudante Verificado 🇦🇴</span>
                  </span>
                )}
              </div>

              <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <BookOpen className="w-4 h-4 text-purple-500" />
                  <span>{user.occupation}</span>
                  {user.companyOrCollege && (
                    <span className="text-slate-400 font-normal">· {user.companyOrCollege}</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-4 h-4 text-pink-500" />
                  <span>{user.location} · a {user.distanceKm} km de ti</span>
                </div>
              </div>
            </div>

            {/* Compatibility Highlights */}
            {user.compatibilityHighlights && user.compatibilityHighlights.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50/60 border border-purple-100 space-y-1.5">
                <span className="text-[11px] font-bold text-pink-900 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
                  <span>Porque têm química de casal:</span>
                </span>
                <ul className="text-xs text-purple-950 space-y-1 font-medium">
                  {user.compatibilityHighlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Vibe goal */}
            <div className="p-3.5 rounded-2xl bg-pink-50/40 border border-pink-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
              </div>
              <div>
                <span className="text-[11px] text-pink-900 font-semibold block">O que procura no Conecta Namoro:</span>
                <span className="text-xs font-bold text-slate-900">{user.relationshipGoalLabel}</span>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900/60 mb-2">
                Sobre Mim
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-purple-50/20 p-3 rounded-2xl border border-purple-50">
                {user.bio}
              </p>
            </div>

            {/* Interests */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900/60 mb-2">
                Interesses & Hobbies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {user.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 rounded-xl bg-purple-50 text-purple-800 text-xs font-medium border border-purple-100"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Youth Lifestyle info */}
            {user.lifestyle && (
              <div className="pt-2 border-t border-purple-50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900/60 mb-3">
                  No Dia a Dia ✨
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {user.lifestyle.favoriteSong && (
                    <div className="p-2.5 rounded-2xl bg-white border border-purple-100 text-slate-700 flex items-center gap-2">
                      <Music className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Música no Loop</span>
                        <span className="font-semibold text-slate-800 truncate block">{user.lifestyle.favoriteSong}</span>
                      </div>
                    </div>
                  )}
                  {user.lifestyle.studyArea && (
                    <div className="p-2.5 rounded-2xl bg-white border border-purple-100 text-slate-700 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Curso / Área</span>
                        <span className="font-semibold text-slate-800 truncate block">{user.lifestyle.studyArea}</span>
                      </div>
                    </div>
                  )}
                  {user.lifestyle.sports && (
                    <div className="p-2.5 rounded-2xl bg-white border border-purple-100 text-slate-700 flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Desporto</span>
                        <span className="font-semibold text-slate-800 truncate block">{user.lifestyle.sports}</span>
                      </div>
                    </div>
                  )}
                  {user.lifestyle.pets && (
                    <div className="p-2.5 rounded-2xl bg-white border border-purple-100 text-slate-700 flex items-center gap-2">
                      <Smile className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Animais</span>
                        <span className="font-semibold text-slate-800 truncate block">{user.lifestyle.pets}</span>
                      </div>
                    </div>
                  )}
                  {user.lifestyle.zodiac && (
                    <div className="p-2.5 rounded-2xl bg-white border border-purple-100 text-slate-700 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Signo</span>
                        <span className="font-semibold text-slate-800 truncate block">{user.lifestyle.zodiac}</span>
                      </div>
                    </div>
                  )}
                  {user.lifestyle.languages && (
                    <div className="p-2.5 rounded-2xl bg-white border border-purple-100 text-slate-700 flex items-center gap-2">
                      <Smile className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Idiomas</span>
                        <span className="font-semibold text-slate-800 truncate block">{user.lifestyle.languages.join(', ')}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Report/Block Button */}
            <div className="pt-4 border-t border-purple-50 text-center">
              <button
                onClick={() => onOpenReport(user)}
                className="text-xs text-slate-400 hover:text-purple-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Denunciar ou bloquear este perfil</span>
              </button>
            </div>

          </div>

        </div>

        {/* Sticky Action Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent border-t border-purple-50 flex items-center justify-center gap-6">
          <button
            onClick={() => { onPass(user); onClose(); }}
            className="w-13 h-13 rounded-3xl bg-white text-slate-500 border border-purple-100 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
            title="Passar"
          >
            <X className="w-6 h-6 text-slate-400 hover:text-slate-600" />
          </button>

          <button
            onClick={() => { onSuperLike(user); onClose(); }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-md shadow-pink-400/25 hover:scale-105 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            title="Super Crush! 💘"
          >
            <Star className="w-5 h-5 fill-white text-white" />
          </button>

          <button
            onClick={() => { onLike(user); onClose(); }}
            className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Dar Match / Curtir 💕"
          >
            <Heart className="w-7 h-7 fill-white text-white" />
          </button>
        </div>

      </div>
    </div>
  );
};
