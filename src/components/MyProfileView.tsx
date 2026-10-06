import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Edit3, 
  Eye, 
  ShieldCheck, 
  MapPin, 
  BookOpen, 
  Heart, 
  Sparkles,
  Music,
  Smile,
  Compass
} from 'lucide-react';

interface MyProfileViewProps {
  currentUser: UserProfile;
  onOpenEdit: () => void;
  onOpenSettings: () => void;
  likesCount: number;
  matchesCount: number;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({
  currentUser,
  onOpenEdit,
  onOpenSettings,
  likesCount,
  matchesCount,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 font-sans">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-100/70 px-3 py-1 rounded-full mb-1 border border-purple-200/50">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Perfil Jovem Verificado 🇦🇴</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isPreviewMode ? 'Prévia do Teu Perfil' : 'O Meu Perfil'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isPreviewMode
              ? 'É exatamente assim que outros jovens te veem no Conecta'
              : 'Gere as tuas fotos, músicas favoritas, curso e interesses'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Preview Mode Toggle */}
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              isPreviewMode
                ? 'bg-purple-100 border-purple-300 text-purple-700'
                : 'bg-white border-purple-100 text-slate-700 hover:border-purple-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-purple-500" />
            <span>{isPreviewMode ? 'Sair da Prévia' : 'Ver como visitante'}</span>
          </button>

          {!isPreviewMode && (
            <button
              onClick={onOpenEdit}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-bold shadow-md shadow-purple-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Perfil ✨</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row (Hidden in Visitor Preview) */}
      {!isPreviewMode && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-white p-4 rounded-3xl border border-purple-100/80 shadow-xs flex flex-col items-center justify-center text-center">
            <div className="w-9 h-9 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center mb-1">
              <Heart className="w-4 h-4 fill-pink-500" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
              {likesCount + 18}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Curtidas recebidas 💖</span>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-purple-100/80 shadow-xs flex flex-col items-center justify-center text-center">
            <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
              {matchesCount + 8}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Matches românticos 💕</span>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-purple-100/80 shadow-xs flex flex-col items-center justify-center text-center">
            <div className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-1">
              <Smile className="w-4 h-4 text-rose-600" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
              98%
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Química de casal 🌹</span>
          </div>
        </div>
      )}

      {/* Main Profile Showcase Card */}
      <div className="bg-white rounded-3xl border border-purple-100/80 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Photo Gallery Column */}
        <div className="md:col-span-5 bg-slate-950 flex flex-col">
          <div className="relative aspect-[3/4] w-full">
            <img
              src={currentUser.photos[selectedPhotoIndex] || currentUser.photos[0]}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-3 h-3" />
              <span>Estudante Verificado 🇦🇴</span>
            </div>
          </div>

          {/* Thumbnails row */}
          {currentUser.photos.length > 1 && (
            <div className="p-3 bg-slate-900 flex items-center gap-2 overflow-x-auto">
              {currentUser.photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPhotoIndex(i)}
                  className={`w-14 h-16 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    i === selectedPhotoIndex ? 'border-purple-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo}
                    alt={`Miniatura ${i}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Information Column */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div className="space-y-6">
            {/* Name, age and location */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {currentUser.name}, {currentUser.age}
                </h3>
                <span className="text-sm bg-purple-100 text-purple-700 px-2 py-0.5 rounded-lg font-bold">
                  {currentUser.lifestyle?.vibeEmoji || '✨'}
                </span>
              </div>
              <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <BookOpen className="w-4 h-4 text-purple-500" />
                  <span>{currentUser.occupation}</span>
                  {currentUser.companyOrCollege && (
                    <span className="text-slate-400 font-normal">· {currentUser.companyOrCollege}</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-4 h-4 text-pink-500" />
                  <span>{currentUser.location}</span>
                </div>
              </div>
            </div>

            {/* Vibe goal badge */}
            <div className="p-3.5 bg-gradient-to-r from-purple-50 to-pink-50/50 border border-purple-100 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 fill-pink-500" />
              </div>
              <div>
                <div className="text-[11px] text-pink-900 font-semibold">O que procuro no Conecta Namoro:</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  {currentUser.relationshipGoalLabel}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900/60 mb-2">
                Sobre Mim
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-purple-50/20 p-3 rounded-2xl border border-purple-50">
                {currentUser.bio}
              </p>
            </div>

            {/* Interests */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900/60 mb-2">
                Interesses & Hobbies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 rounded-xl bg-purple-50 text-purple-800 text-xs font-medium border border-purple-100"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Youth Lifestyle details */}
            {currentUser.lifestyle && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900/60 mb-2">
                  No Meu Dia a Dia ✨
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {currentUser.lifestyle.favoriteSong && (
                    <div className="p-2.5 rounded-2xl bg-white border border-purple-100 text-slate-700 flex items-center gap-2">
                      <Music className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Música no loop</span>
                        <span className="font-semibold text-slate-800 truncate block">{currentUser.lifestyle.favoriteSong}</span>
                      </div>
                    </div>
                  )}

                  {currentUser.lifestyle.sports && (
                    <div className="p-2.5 rounded-2xl bg-white border border-purple-100 text-slate-700 flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Desporto & Atividade</span>
                        <span className="font-semibold text-slate-800 truncate block">{currentUser.lifestyle.sports}</span>
                      </div>
                    </div>
                  )}

                  {currentUser.lifestyle.studyArea && (
                    <div className="p-2.5 rounded-2xl bg-white border border-purple-100 text-slate-700 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Área de Estudo</span>
                        <span className="font-semibold text-slate-800 truncate block">{currentUser.lifestyle.studyArea}</span>
                      </div>
                    </div>
                  )}

                  {currentUser.lifestyle.languages && (
                    <div className="p-2.5 rounded-2xl bg-white border border-purple-100 text-slate-700 flex items-center gap-2">
                      <Smile className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Idiomas</span>
                        <span className="font-semibold text-slate-800 truncate block">{currentUser.lifestyle.languages.join(', ')}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
