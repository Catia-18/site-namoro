import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Camera, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { ALL_INTERESTS_LIST } from '../data/mockData';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSave: (updatedUser: UserProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSave,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [age, setAge] = useState(currentUser.age);
  const [occupation, setOccupation] = useState(currentUser.occupation);
  const [companyOrCollege, setCompanyOrCollege] = useState(currentUser.companyOrCollege || '');
  const [location, setLocation] = useState(currentUser.location);
  const [bio, setBio] = useState(currentUser.bio);
  const [interests, setInterests] = useState<string[]>(currentUser.interests);
  const [relationshipGoal, setRelationshipGoal] = useState(currentUser.relationshipGoal);
  const [relationshipGoalLabel, setRelationshipGoalLabel] = useState(currentUser.relationshipGoalLabel);
  const [photos, setPhotos] = useState<string[]>(currentUser.photos);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      if (interests.length < 10) {
        setInterests([...interests, interest]);
      }
    }
  };

  const handleRemovePhoto = (index: number) => {
    if (photos.length > 1) {
      setPhotos(photos.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    const updated: UserProfile = {
      ...currentUser,
      name,
      age,
      occupation,
      companyOrCollege,
      location,
      bio,
      interests,
      relationshipGoal,
      relationshipGoalLabel,
      photos,
    };
    onSave(updated);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-serif-display text-lg font-bold text-slate-900">
            Editar Meu Perfil
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Photos Management */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Fotos do Perfil (Arraste ou gerencie)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {photos.map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 shadow-sm group"
                >
                  <img
                    src={src}
                    alt={`Foto ${index + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {index === 0 ? 'Capa' : `#${index + 1}`}
                  </div>
                  {photos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                      title="Remover foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}

              {photos.length < 6 && (
                <div
                  onClick={() => {
                    // Duplicate first photo or placeholder for demo
                    setPhotos([...photos, '/src/assets/images/hero_dating_couple_1791225929622.jpg']);
                  }}
                  className="aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-300 hover:border-rose-400 bg-slate-50 flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:text-rose-600 p-2 text-center transition-all"
                >
                  <Plus className="w-6 h-6 mb-1" />
                  <span className="text-[11px] font-medium">+ Adicionar Foto</span>
                </div>
              )}
            </div>
          </div>

          {/* Name & Age */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Idade
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-slate-900"
              />
            </div>
          </div>

          {/* Occupation & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Profissão
              </label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Empresa ou Faculdade
              </label>
              <input
                type="text"
                value={companyOrCollege}
                onChange={(e) => setCompanyOrCollege(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-slate-900"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Localização atual
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-slate-900"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Biografia
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={350}
              className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-slate-900 resize-none"
            />
          </div>

          {/* O que Procura */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              O que você procura no Conecta
            </label>
            <select
              value={relationshipGoal}
              onChange={(e) => {
                const val = e.target.value as any;
                setRelationshipGoal(val);
                const labels: Record<string, string> = {
                  'relacionamento-serio': 'Relacionamento sério',
                  'algo-casual': 'Conexão leve & casual',
                  'amizade': 'Novas amizades',
                  'nao-sei-ainda': 'Aberto a possibilidades',
                };
                setRelationshipGoalLabel(labels[val] || 'Relacionamento sério');
              }}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-slate-900 bg-white"
            >
              <option value="relacionamento-serio">Relacionamento sério</option>
              <option value="algo-casual">Conexão leve & casual</option>
              <option value="amizade">Novas amizades</option>
              <option value="nao-sei-ainda">Aberto a possibilidades</option>
            </select>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Seus interesses ({interests.length}/10)
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 border border-slate-100 rounded-xl bg-slate-50/50">
              {ALL_INTERESTS_LIST.map((interest) => {
                const isSelected = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            Descartar alterações
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Salvo com sucesso!</span>
              </>
            ) : (
              <span>Salvar alterações</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
