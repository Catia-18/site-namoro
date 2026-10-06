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
  BookOpen, 
  Sparkles, 
  Music,
  RefreshCw,
  MessageCircle
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
    <div className="max-w-md mx-auto px-4 py-4 sm:py-6 flex flex-col min-h-[calc(100vh-5rem)] font-sans">
      
      {/* Top Filter & Discover Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <span>Encontra o teu Crush em Luanda</span>
            <span>💖</span>
          </span>
        </div>

        <button
          onClick={onOpenFilters}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
            activeFiltersCount > 0
              ? 'bg-purple-100 border-purple-300 text-purple-700'
              : 'bg-white border-purple-100 text-slate-700 hover:border-purple-300'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filtros</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Card Viewport */}
      <div className="relative flex-1 flex flex-col justify-center min-h-[500px]">
        {currentProfile ? (
          <div
            className={`relative w-full aspect-[3/4.2] rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-slate-900 transition-all duration-300 select-none ${
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
            <div className="absolute top-7 left-4 z-20 flex flex-col gap-1.5 items-start">
              <span className="bg-purple-950/80 backdrop-blur-md text-pink-200 text-[11px] font-bold px-3 py-1 rounded-full border border-pink-400/30 flex items-center gap-1.5 shadow-sm">
                <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                <span>{currentProfile.compatibilityScore}% Química Romântica</span>
              </span>
              
              {currentProfile.lifestyle?.favoriteSong && (
                <span className="bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-white/20 flex items-center gap-1">
                  <Music className="w-2.5 h-2.5 text-sky-400" />
                  <span>{currentProfile.lifestyle.favoriteSong}</span>
                </span>
              )}
            </div>

            {/* Action overlay badges when animating */}
            {swipeDirection === 'right' && (
              <div className="absolute top-12 right-6 z-30 border-4 border-pink-500 text-pink-600 bg-white/95 font-black text-2xl px-4 py-1 rounded-2xl rotate-12 tracking-wide animate-in">
                MATCH! 💕
              </div>
            )}
            {swipeDirection === 'left' && (
              <div className="absolute top-12 left-6 z-30 border-4 border-slate-400 text-slate-700 bg-white/95 font-extrabold text-2xl px-4 py-1 rounded-2xl -rotate-12 tracking-wide animate-in">
                Passar ❌
              </div>
            )}
            {swipeDirection === 'up' && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 border-4 border-purple-500 text-purple-600 bg-white/95 font-black text-2xl px-4 py-1 rounded-2xl tracking-wide animate-in">
                Super Crush! 💘
              </div>
            )}

            {/* Scrim Overlay with Profile Info */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent pt-20 p-5 text-white z-20 flex flex-col justify-end">
              
              {/* Name, age and details trigger */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {currentProfile.name}, {currentProfile.age}
                  </h3>
                  <span className="bg-purple-500/80 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-sm">
                    {currentProfile.lifestyle?.vibeEmoji || '✨'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenDetails(currentProfile)}
                  className="w-9 h-9 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer shadow-md"
                  title="Ver perfil completo e detalhes de afinidade"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Course & Location */}
              <div className="space-y-1 mb-2.5 text-xs text-purple-200 font-medium">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-pink-400" />
                  <span className="truncate">{currentProfile.occupation}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>A {currentProfile.distanceKm} km · {currentProfile.location.split(',')[0]}</span>
                </div>
              </div>

              {/* Bio summary */}
              <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed mb-3">
                {currentProfile.bio}
              </p>

              {/* Interests tags in youth colors */}
              <div className="flex flex-wrap gap-1.5">
                {currentProfile.interests.slice(0, 4).map((interest) => (
                  <span
                    key={interest}
                    className="px-2.5 py-0.5 rounded-xl bg-purple-500/30 backdrop-blur-sm text-purple-100 text-[11px] font-bold border border-purple-400/20"
                  >
                    {interest}
                  </span>
                ))}
                {currentProfile.interests.length > 4 && (
                  <span className="px-2 py-0.5 rounded-xl bg-white/10 text-slate-300 text-[11px]">
                    +{currentProfile.interests.length - 4}
                  </span>
                )}
              </div>

            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-3xl p-8 border border-purple-100 text-center shadow-md flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 text-2xl">
              ✨
            </div>
            <h3 className="font-display text-xl font-extrabold text-slate-900 mb-2">
              Viste todas as pessoas com a tua vibe por enquanto!
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mb-6">
              Ajusta os filtros de distância para descobrir mais estudantes e amigos jovens perto de ti em Luanda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenFilters}
                className="px-4 py-2.5 rounded-2xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
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
                className="px-4 py-2.5 rounded-2xl border border-purple-200 text-purple-700 text-xs font-bold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Rever Vibes</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Interactive Youth Control Buttons */}
      {currentProfile && (
        <div className="mt-4 flex items-center justify-center gap-4 sm:gap-5 py-2">
          {/* Undo */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={history.length === 0}
            className="w-11 h-11 rounded-2xl bg-white text-amber-500 border border-purple-100 hover:bg-amber-50/50 flex items-center justify-center shadow-xs active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            title="Voltar perfil anterior"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Pass (Dislike suave) */}
          <button
            type="button"
            onClick={() => handleAction('pass')}
            className="w-14 h-14 rounded-3xl bg-white text-slate-500 border border-purple-100 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer group"
            title="Passar (Tecla ←)"
          >
            <X className="w-6 h-6 text-slate-400 group-hover:text-slate-700 transition-colors" />
          </button>

          {/* Super Crush (Star) */}
          <button
            type="button"
            onClick={() => handleAction('superlike')}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-md shadow-pink-400/25 hover:scale-105 flex items-center justify-center active:scale-90 transition-all cursor-pointer"
            title="Super Crush! 💘 (Tecla ↑)"
          >
            <Star className="w-5 h-5 fill-white text-white" />
          </button>

          {/* Curtir / Match (Heart) */}
          <button
            type="button"
            onClick={() => handleAction('like')}
            className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-90 transition-all cursor-pointer group"
            title="Dar Match / Curtir 💕 (Tecla →)"
          >
            <Heart className="w-7 h-7 fill-white text-white transition-transform group-hover:scale-110" />
          </button>
        </div>
      )}

      {/* Keyboard hints */}
      {currentProfile && (
        <div className="hidden sm:flex items-center justify-center gap-3 text-[10px] text-purple-400 mt-1 font-semibold">
          <span>← Passar</span>
          <span>·</span>
          <span>↑ Super Crush 💘</span>
          <span>·</span>
          <span>→ Curtir 💕</span>
          <span>·</span>
          <span>Pressiona [ I ] para bio romântica</span>
        </div>
      )}

    </div>
  );
};
