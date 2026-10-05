import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  X, 
  Heart, 
  XCircle, 
  Star, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  Flag,
  ChevronLeft,
  ChevronRight,
  Flame,
  Info
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[92vh] relative">
        
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

            {/* Scrim overlay with basic name */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 text-white pointer-events-none">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif-display text-3xl font-bold">
                  {user.name}, {user.age}
                </span>
                {user.verified && (
                  <span className="bg-emerald-500 text-white p-1 rounded-full text-xs" title="Perfil Verificado">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{user.location} (a {user.distanceKm} km de você)</span>
              </div>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 space-y-6">
            
            {/* Compatibility Banner */}
            <div className="p-4 bg-gradient-to-r from-rose-50 to-purple-50 rounded-2xl border border-rose-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-rose-500/20">
                  {user.compatibilityScore}%
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    <span>Alta Afinidade Detectada</span>
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    {user.compatibilityHighlights?.join(' · ') || 'Gostos culturais e valores alinhados'}
                  </p>
                </div>
              </div>
            </div>

            {/* Profession & College */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span className="font-medium">{user.occupation}</span>
              </div>
              {user.companyOrCollege && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>{user.companyOrCollege}</span>
                </div>
              )}
            </div>

            {/* Biography */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Sobre mim
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {user.bio}
              </p>
            </div>

            {/* Relationship goal badge */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Buscando no Conecta:</div>
                <div className="text-xs font-bold text-slate-900">{user.relationshipGoalLabel}</div>
              </div>
            </div>

            {/* Interests */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Interesses & Paixões
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200/60"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Lifestyle */}
            {user.lifestyle && (
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Estilo de Vida
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {user.lifestyle.zodiac && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="text-[10px] text-slate-400 block">Signo</span>
                      <span className="font-semibold">{user.lifestyle.zodiac}</span>
                    </div>
                  )}
                  {user.lifestyle.height && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="text-[10px] text-slate-400 block">Altura</span>
                      <span className="font-semibold">{user.lifestyle.height}</span>
                    </div>
                  )}
                  {user.lifestyle.exercise && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="text-[10px] text-slate-400 block">Exercício</span>
                      <span className="font-semibold">{user.lifestyle.exercise}</span>
                    </div>
                  )}
                  {user.lifestyle.drinking && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="text-[10px] text-slate-400 block">Bebida</span>
                      <span className="font-semibold">{user.lifestyle.drinking}</span>
                    </div>
                  )}
                  {user.lifestyle.pets && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="text-[10px] text-slate-400 block">Animais</span>
                      <span className="font-semibold">{user.lifestyle.pets}</span>
                    </div>
                  )}
                  {user.lifestyle.languages && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="text-[10px] text-slate-400 block">Idiomas</span>
                      <span className="font-semibold">{user.lifestyle.languages.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Report/Block Button */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <button
                onClick={() => onOpenReport(user)}
                className="text-xs text-slate-400 hover:text-rose-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Denunciar ou bloquear este perfil</span>
              </button>
            </div>

          </div>

        </div>

        {/* Sticky Action Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent border-t border-slate-100 flex items-center justify-center gap-6">
          <button
            onClick={() => { onPass(user); onClose(); }}
            className="w-14 h-14 rounded-full bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer"
            title="Passar"
          >
            <XCircle className="w-7 h-7 text-slate-400 hover:text-slate-600" />
          </button>

          <button
            onClick={() => { onSuperLike(user); onClose(); }}
            className="w-12 h-12 rounded-full bg-white text-blue-500 border border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer"
            title="Super Like"
          >
            <Star className="w-6 h-6 fill-blue-500 text-blue-500" />
          </button>

          <button
            onClick={() => { onLike(user); onClose(); }}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-rose-600 text-white flex items-center justify-center shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Curtir"
          >
            <Heart className="w-7 h-7 fill-white text-white" />
          </button>
        </div>

      </div>
    </div>
  );
};
