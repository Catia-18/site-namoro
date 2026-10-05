import React, { useState, useEffect } from 'react';
import { UserProfile, FilterState } from '../types';
import { 
  Heart, 
  X, 
  Star, 
  RotateCcw, 
  SlidersHorizontal, 
  Info, 
  MapPin, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  RefreshCw
} from 'lucide-react';

interface DiscoverViewProps {
  profiles: UserProfile[];
  onLike: (user: UserProfile) => void;
  onPass: (user: UserProfile) => void;
  onSuperLike: (user: UserProfile) => void;
  onOpenDetails: (user: UserProfile) => void;
  onOpenFilters: () => void;
  onResetStack: () => void;
  activeFiltersCount: number;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  profiles,
  onLike,
  onPass,
  onSuperLike,
  onOpenDetails,
  onOpenFilters,
  onResetStack,
  activeFiltersCount,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const currentProfile = profiles[currentIndex];

  // Reset photo index when profile changes
  useEffect(() => {
    setPhotoIndex(0);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentProfile) return;
      if (e.key === 'ArrowLeft') {
        handleAction('pass');
      } else if (e.key === 'ArrowRight') {
        handleAction('like');
      } else if (e.key === 'ArrowUp') {
        handleAction('superlike');
      } else if (e.key === 'i' || e.key === 'I') {
        onOpenDetails(currentProfile);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentProfile, currentIndex]);

  const handleAction = (type: 'pass' | 'like' | 'superlike') => {
    if (!currentProfile) return;

    if (type === 'pass') {
      setSwipeDirection('left');
      setTimeout(() => {
        setHistory((prev) => [...prev, currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        setSwipeDirection(null);
        onPass(currentProfile);
      }, 250);
    } else if (type === 'like') {
      setSwipeDirection('right');
      setTimeout(() => {
        setHistory((prev) => [...prev, currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        setSwipeDirection(null);
        onLike(currentProfile);
      }, 250);
    } else if (type === 'superlike') {
      setSwipeDirection('up');
      setTimeout(() => {
        setHistory((prev) => [...prev, currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        setSwipeDirection(null);
        onSuperLike(currentProfile);
      }, 250);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastIndex = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentIndex(lastIndex);
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentProfile && currentProfile.photos.length > 1) {
      setPhotoIndex((prev) => (prev + 1) % currentProfile.photos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentProfile && currentProfile.photos.length > 1) {
      setPhotoIndex((prev) => (prev - 1 + currentProfile.photos.length) % currentProfile.photos.length);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 sm:py-6 flex flex-col min-h-[calc(100vh-5rem)]">
      
      {/* Top Filter & Discover Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-700">
            Descobrindo perto de São Paulo
          </span>
        </div>

        <button
          onClick={onOpenFilters}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
            activeFiltersCount > 0
              ? 'bg-rose-50 border-rose-300 text-rose-600'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filtros</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Card Viewport */}
      <div className="relative flex-1 flex flex-col justify-center min-h-[500px]">
        {currentProfile ? (
          <div
            className={`relative w-full aspect-[3/4.2] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 transition-all duration-300 select-none ${
              swipeDirection === 'left'
                ? '-translate-x-32 rotate-[-12deg] opacity-0'
                : swipeDirection === 'right'
                ? 'translate-x-32 rotate-[12deg] opacity-0'
                : swipeDirection === 'up'
                ? '-translate-y-32 opacity-0'
                : 'translate-x-0 rotate-0 opacity-100'
            }`}
          >
            {/* Background image */}
            <img
              src={currentProfile.photos[photoIndex] || currentProfile.photos[0]}
              alt={currentProfile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            {/* Photo Indicators */}
            {currentProfile.photos.length > 1 && (
              <div className="absolute top-3 left-4 right-4 flex items-center gap-1.5 z-20">
                {currentProfile.photos.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      i === photoIndex ? 'bg-white shadow-sm' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Left and Right click targets to switch photos */}
            {currentProfile.photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevPhoto}
                  className="absolute left-0 top-1/4 bottom-1/3 w-1/3 z-10 opacity-0 hover:opacity-20 bg-white/20 transition-opacity cursor-pointer"
                  title="Foto anterior"
                />
                <button
                  type="button"
                  onClick={nextPhoto}
                  className="absolute right-0 top-1/4 bottom-1/3 w-1/3 z-10 opacity-0 hover:opacity-20 bg-white/20 transition-opacity cursor-pointer"
                  title="Próxima foto"
                />
              </>
            )}

            {/* Compatibility Tag Badge */}
            <div className="absolute top-7 left-4 z-20">
              <span className="bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-rose-400" />
                <span>{currentProfile.compatibilityScore}% Afinidade</span>
              </span>
            </div>

            {/* Action overlay badges when animating */}
            {swipeDirection === 'right' && (
              <div className="absolute top-12 right-6 z-30 border-4 border-rose-500 text-rose-500 bg-white/90 font-black text-2xl px-4 py-1 rounded-2xl rotate-12 uppercase tracking-wider animate-in">
                Curtir
              </div>
            )}
            {swipeDirection === 'left' && (
              <div className="absolute top-12 left-6 z-30 border-4 border-slate-700 text-slate-700 bg-white/90 font-black text-2xl px-4 py-1 rounded-2xl -rotate-12 uppercase tracking-wider animate-in">
                Passar
              </div>
            )}
            {swipeDirection === 'up' && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 border-4 border-blue-500 text-blue-500 bg-white/90 font-black text-2xl px-4 py-1 rounded-2xl uppercase tracking-wider animate-in">
                Super Like
              </div>
            )}

            {/* Scrim Overlay with Profile Info */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent pt-20 p-5 text-white z-20 flex flex-col justify-end">
              
              {/* Name, age and verified */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight">
                    {currentProfile.name}, {currentProfile.age}
                  </h3>
                  {currentProfile.verified && (
                    <span className="bg-emerald-500 text-white p-0.5 rounded-full" title="Identidade Verificada">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenDetails(currentProfile)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer shadow-md"
                  title="Ver perfil completo e detalhes de afinidade"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Occupation and location */}
              <div className="space-y-1 mb-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-rose-300" />
                  <span className="truncate">{currentProfile.occupation}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-300" />
                  <span>A {currentProfile.distanceKm} km · {currentProfile.location.split(',')[0]}</span>
                </div>
              </div>

              {/* Bio summary */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                {currentProfile.bio}
              </p>

              {/* Interests tags */}
              <div className="flex flex-wrap gap-1.5">
                {currentProfile.interests.slice(0, 4).map((interest) => (
                  <span
                    key={interest}
                    className="px-2 py-0.5 rounded-lg bg-white/15 backdrop-blur-sm text-white text-[11px] font-medium"
                  >
                    {interest}
                  </span>
                ))}
                {currentProfile.interests.length > 4 && (
                  <span className="px-1.5 py-0.5 rounded-lg bg-white/10 text-slate-300 text-[11px]">
                    +{currentProfile.interests.length - 4}
                  </span>
                )}
              </div>

            </div>
          </div>
        ) : (
          /* Empty state: No more profiles */
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-lg flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-slate-900 mb-2">
              Você viu todos os perfis compatíveis por enquanto!
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mb-6">
              Ajuste seus filtros de distância ou idade para descobrir mais pessoas incríveis na sua região.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenFilters}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Ajustar Filtros</span>
              </button>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setHistory([]);
                  onResetStack();
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Rever perfis</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Interactive Control Buttons */}
      {currentProfile && (
        <div className="mt-4 flex items-center justify-center gap-4 sm:gap-6 py-2">
          {/* Undo */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={history.length === 0}
            className="w-11 h-11 rounded-full bg-white text-amber-500 border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 flex items-center justify-center shadow-md active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            title="Voltar perfil anterior"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Pass (Dislike) */}
          <button
            type="button"
            onClick={() => handleAction('pass')}
            className="w-14 h-14 rounded-full bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 flex items-center justify-center shadow-lg active:scale-90 transition-all cursor-pointer group"
            title="Passar (Tecla ←)"
          >
            <X className="w-7 h-7 text-slate-400 group-hover:text-slate-700 transition-colors" />
          </button>

          {/* Super Like */}
          <button
            type="button"
            onClick={() => handleAction('superlike')}
            className="w-12 h-12 rounded-full bg-white text-blue-500 border border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer"
            title="Super Like (Tecla ↑)"
          >
            <Star className="w-5 h-5 fill-blue-500 text-blue-500" />
          </button>

          {/* Like */}
          <button
            type="button"
            onClick={() => handleAction('like')}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-rose-600 text-white flex items-center justify-center shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-90 transition-all cursor-pointer group"
            title="Curtir (Tecla →)"
          >
            <Heart className="w-7 h-7 fill-white text-white transition-transform group-hover:scale-110" />
          </button>
        </div>
      )}

      {/* Keyboard hints footer */}
      {currentProfile && (
        <div className="hidden sm:flex items-center justify-center gap-4 text-[10px] text-slate-400 mt-2">
          <span>← Passar</span>
          <span>·</span>
          <span>↑ Super Like</span>
          <span>·</span>
          <span>→ Curtir</span>
          <span>·</span>
          <span>Pressione [ I ] para detalhes</span>
        </div>
      )}

    </div>
  );
};
