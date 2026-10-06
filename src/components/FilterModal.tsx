import React, { useState } from 'react';
import { FilterState } from '../types';
import { X, SlidersHorizontal, Check, RefreshCw, Sparkles } from 'lucide-react';
import { ALL_INTERESTS_LIST } from '../data/mockData';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (newFilters: FilterState) => void;
  onResetFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    const list = localFilters.selectedInterests || [];
    if (list.includes(interest)) {
      setLocalFilters({
        ...localFilters,
        selectedInterests: list.filter((i) => i !== interest),
      });
    } else {
      setLocalFilters({
        ...localFilters,
        selectedInterests: [...list, interest],
      });
    }
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    onResetFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900">
                Filtros de Descoberta
              </h3>
              <p className="text-[11px] text-pink-600 font-semibold">Encontra o teu crush em Luanda com química real 💕</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Distância Máxima */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-800 text-xs">
                Distância máxima
              </label>
              <span className="font-bold text-purple-600 text-xs tabular-nums bg-purple-50 px-2 py-0.5 rounded-md">
                Até {localFilters.maxDistance} km
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              step="2"
              value={localFilters.maxDistance}
              onChange={(e) => setLocalFilters({ ...localFilters, maxDistance: Number(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>2 km (mesmo bairro)</span>
              <span>50 km (toda Luanda)</span>
            </div>
          </div>

          {/* Faixa Etária */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-800 text-xs">
                Faixa de idade (Jovens & Estudantes)
              </label>
              <span className="font-bold text-purple-600 text-xs tabular-nums bg-purple-50 px-2 py-0.5 rounded-md">
                {localFilters.ageRange[0]} - {localFilters.ageRange[1]} anos
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400 w-8">Mín:</span>
                <input
                  type="range"
                  min="16"
                  max="24"
                  value={localFilters.ageRange[0]}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    ageRange: [Math.min(Number(e.target.value), localFilters.ageRange[1] - 1), localFilters.ageRange[1]],
                  })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <span className="text-xs font-bold tabular-nums w-6 text-purple-700">{localFilters.ageRange[0]}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400 w-8">Máx:</span>
                <input
                  type="range"
                  min="18"
                  max="26"
                  value={localFilters.ageRange[1]}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    ageRange: [localFilters.ageRange[0], Math.max(Number(e.target.value), localFilters.ageRange[0] + 1)],
                  })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <span className="text-xs font-bold tabular-nums w-6 text-purple-700">{localFilters.ageRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Preferência de Género */}
          <div>
            <label className="block font-bold text-slate-800 text-xs mb-2">
              Quero ver
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'todos', label: 'Toda a gente' },
                { id: 'feminino', label: 'Raparigas' },
                { id: 'masculino', label: 'Rapazes' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, gender: opt.id as any })}
                  className={`py-2 px-3 rounded-2xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                    localFilters.gender === opt.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700 font-bold'
                      : 'border-slate-200 text-slate-700 hover:border-purple-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de Relacionamento / Procura */}
          <div>
            <label className="block font-bold text-slate-800 text-xs mb-2">
              O que procuras no Conecta
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'namoro-serio', label: 'Namoro Sério 💖' },
                { id: 'romance-encontros', label: 'Romance & Encontros 💕' },
                { id: 'conhecer-crush', label: 'Conhecer Meu Crush 💘' },
                { id: 'aberto-ao-amor', label: 'Aberto ao Amor 🌹' },
              ].map((goal) => {
                const isChecked = localFilters.relationshipGoals?.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => {
                      const current = localFilters.relationshipGoals || [];
                      const updated = isChecked
                        ? current.filter((g) => g !== goal.id)
                        : [...current, goal.id];
                      setLocalFilters({ ...localFilters, relationshipGoals: updated });
                    }}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-medium border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isChecked
                        ? 'border-purple-500 bg-purple-50 text-purple-700 font-bold'
                        : 'border-slate-200 text-slate-700 hover:border-purple-200'
                    }`}
                  >
                    <span>{goal.label}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-purple-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interesses Filtrados */}
          <div>
            <label className="block font-bold text-slate-800 text-xs mb-2">
              Filtrar por interesses em comum
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1.5 border border-purple-50 rounded-2xl bg-purple-50/20">
              {ALL_INTERESTS_LIST.map((interest) => {
                const isSelected = localFilters.selectedInterests?.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-purple-600 text-white font-semibold'
                        : 'bg-white text-slate-600 border border-purple-100 hover:border-purple-300'
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
        <div className="p-4 bg-purple-50/40 border-t border-purple-50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-2xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Limpar filtros</span>
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white text-xs font-bold shadow-md shadow-purple-500/20 active:scale-95 transition-all cursor-pointer"
          >
            Aplicar Filtros ✨
          </button>
        </div>

      </div>
    </div>
  );
};
