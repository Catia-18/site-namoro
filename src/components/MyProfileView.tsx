import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Edit3, 
  Eye, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Flame, 
  Sparkles,
  SlidersHorizontal
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
    <div className="max-w-4xl mx-auto px-4 py-6">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
            {isPreviewMode ? 'Prévia do Seu Perfil' : 'Meu Perfil'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isPreviewMode
              ? 'É exatamente assim que outros usuários veem você no Conecta'
              : 'Gerencie suas informações pessoais, fotos e preferências'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Preview Mode Toggle */}
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              isPreviewMode
                ? 'bg-purple-50 border-purple-300 text-purple-700'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isPreviewMode ? 'Sair da Prévia' : 'Ver como visitante'}</span>
          </button>

          {!isPreviewMode && (
            <button
              onClick={onOpenEdit}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Perfil</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row (Hidden in Visitor Preview) */}
      {!isPreviewMode && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-1">
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
              {likesCount + 24}
            </span>
            <span className="text-[11px] text-slate-500">Curtidas recebidas</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
              <Flame className="w-4 h-4 fill-purple-600" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
              {matchesCount + 12}
            </span>
            <span className="text-[11px] text-slate-500">Matches realizados</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
              96%
            </span>
            <span className="text-[11px] text-slate-500">Taxa de afinidade</span>
          </div>
        </div>
      )}

      {/* Main Profile Showcase Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Photo Gallery Column */}
        <div className="md:col-span-5 bg-slate-950 flex flex-col">
          <div className="relative aspect-[3/4] w-full">
            <img
              src={currentUser.photos[selectedPhotoIndex] || currentUser.photos[0]}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-3 h-3" />
              <span>Identidade Verificada</span>
            </div>
          </div>

          {/* Thumbnails row */}
          {currentUser.photos.length > 1 && (
            <div className="p-3 bg-slate-900 flex items-center gap-2 overflow-x-auto">
              {currentUser.photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPhotoIndex(i)}
                  className={`w-14 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    i === selectedPhotoIndex ? 'border-rose-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
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
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
                  {currentUser.name}, {currentUser.age}
                </h3>
              </div>
              <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <Briefcase className="w-4 h-4 text-rose-500" />
                  <span>{currentUser.occupation}</span>
                  {currentUser.companyOrCollege && (
                    <span className="text-slate-400 font-normal">· {currentUser.companyOrCollege}</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>{currentUser.location}</span>
                </div>
              </div>
            </div>

            {/* Relationship goal badge */}
            <div className="p-3.5 bg-rose-50/70 border border-rose-100 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Buscando no Conecta:</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  {currentUser.relationshipGoalLabel}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Biografia
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {currentUser.bio}
              </p>
            </div>

            {/* Interests */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Interesses
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200/60"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Lifestyle */}
            {currentUser.lifestyle && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Estilo de Vida
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {currentUser.lifestyle.height && (
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="text-[10px] text-slate-400 block">Altura</span>
                      <span className="font-semibold">{currentUser.lifestyle.height}</span>
                    </div>
                  )}
                  {currentUser.lifestyle.zodiac && (
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="text-[10px] text-slate-400 block">Signo</span>
                      <span className="font-semibold">{currentUser.lifestyle.zodiac}</span>
                    </div>
                  )}
                  {currentUser.lifestyle.exercise && (
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="text-[10px] text-slate-400 block">Exercício</span>
                      <span className="font-semibold">{currentUser.lifestyle.exercise}</span>
                    </div>
                  )}
                  {currentUser.lifestyle.drinking && (
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="text-[10px] text-slate-400 block">Bebida</span>
                      <span className="font-semibold">{currentUser.lifestyle.drinking}</span>
                    </div>
                  )}
                  {currentUser.lifestyle.smoking && (
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="text-[10px] text-slate-400 block">Fumo</span>
                      <span className="font-semibold">{currentUser.lifestyle.smoking}</span>
                    </div>
                  )}
                  {currentUser.lifestyle.pets && (
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="text-[10px] text-slate-400 block">Pets</span>
                      <span className="font-semibold">{currentUser.lifestyle.pets}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions inside Card */}
          {!isPreviewMode && (
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onOpenSettings}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Configurações da Conta</span>
              </button>

              <button
                onClick={onOpenEdit}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-rose-500" />
                <span>Editar Informações</span>
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
