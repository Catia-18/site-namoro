import React, { useState } from 'react';
import { FilterState } from '../types';
import { X, SlidersHorizontal, Check, RefreshCw, ShieldCheck } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-rose-600" />
            <h3 className="font-serif-display text-lg font-bold text-slate-900">
              Filtros de Descoberta
            </h3>
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
              <label className="font-semibold text-slate-800 text-xs">
                Distância máxima
              </label>
              <span className="font-bold text-rose-600 text-xs tabular-nums">
                Até {localFilters.maxDistance} km
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="100"
              step="2"
              value={localFilters.maxDistance}
              onChange={(e) => setLocalFilters({ ...localFilters, maxDistance: Number(e.target.value) })}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>2 km (ao lado)</span>
              <span>100 km (toda a região)</span>
            </div>
          </div>

          {/* Faixa Etária */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-slate-800 text-xs">
                Faixa de idade
              </label>
              <span className="font-bold text-rose-600 text-xs tabular-nums">
                {localFilters.ageRange[0]} - {localFilters.ageRange[1]} anos
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400 w-8">Mín:</span>
                <input
                  type="range"
                  min="18"
                  max="50"
                  value={localFilters.ageRange[0]}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    ageRange: [Math.min(Number(e.target.value), localFilters.ageRange[1] - 1), localFilters.ageRange[1]],
                  })}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <span className="text-xs font-semibold tabular-nums w-6">{localFilters.ageRange[0]}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400 w-8">Máx:</span>
                <input
                  type="range"
                  min="22"
                  max="65"
                  value={localFilters.ageRange[1]}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    ageRange: [localFilters.ageRange[0], Math.max(Number(e.target.value), localFilters.ageRange[0] + 1)],
                  })}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <span className="text-xs font-semibold tabular-nums w-6">{localFilters.ageRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Preferência de Gênero */}
          <div>
            <label className="block font-semibold text-slate-800 text-xs mb-2">
              Quero ver
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'feminino', label: 'Mulheres' },
                { id: 'masculino', label: 'Homens' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, gender: opt.id as any })}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    localFilters.gender === opt.id
                      ? 'border-rose-500 bg-rose-50 text-rose-700 font-semibold'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de Relacionamento */}
          <div>
            <label className="block font-semibold text-slate-800 text-xs mb-2">
              Tipo de relacionamento
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'relacionamento-serio', label: 'Relacionamento sério' },
                { id: 'algo-casual', label: 'Algo casual & leve' },
                { id: 'amizade', label: 'Amizade & afinidades' },
                { id: 'nao-sei-ainda', label: 'Aberto a possibilidades' },
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
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isChecked
                        ? 'border-rose-500 bg-rose-50 text-rose-700 font-semibold'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{goal.label}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtro por Interesses */}
          <div>
            <label className="block font-semibold text-slate-800 text-xs mb-2">
              Interesses em comum
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 border border-slate-100 rounded-xl bg-slate-50/50">
              {ALL_INTERESTS_LIST.slice(0, 14).map((interest) => {
                const isSelected = localFilters.selectedInterests?.includes(interest);
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
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Apenas Verificados */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-800">
                Apenas perfis com identidade verificada
              </span>
            </div>
            <input
              type="checkbox"
              checked={localFilters.verifiedOnly}
              onChange={(e) => setLocalFilters({ ...localFilters, verifiedOnly: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300 cursor-pointer"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restaurar padrão</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-semibold shadow-md shadow-rose-500/20 hover:from-rose-600 hover:to-rose-700 transition-all cursor-pointer"
            >
              Aplicar filtros
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
