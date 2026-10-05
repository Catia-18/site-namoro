import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  Sliders, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Heart,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { ALL_INTERESTS_LIST, userCurrentGabrielImg, profileMateusImg } from '../data/mockData';

interface OnboardingFlowProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1 state
  const [photos, setPhotos] = useState<string[]>([
    userCurrentGabrielImg,
    profileMateusImg,
  ]);
  const [name, setName] = useState('Gabriel Souza');
  const [age, setAge] = useState(28);
  const [location, setLocation] = useState('Pinheiros, São Paulo - SP');
  const [occupation, setOccupation] = useState('Arquiteto & Urbanista');

  // Step 2 state
  const [bio, setBio] = useState(
    'Apaixonado por design minimalista, café coado de manhã e finais de semana explorando novas cafeterias e feiras de arte.'
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Café Especial',
    'Artes Visuais',
    'Gastronomia',
    'Vinho',
    'Fotografia',
  ]);
  const [lookingFor, setLookingFor] = useState('Relacionamento sério');

  // Step 3 state
  const [ageRange, setAgeRange] = useState<[number, number]>([23, 35]);
  const [maxDistance, setMaxDistance] = useState<number>(25);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState<boolean>(true);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      if (selectedInterests.length < 8) {
        setSelectedInterests([...selectedInterests, interest]);
      }
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as any);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as any);
    } else {
      onCancel();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] py-10 px-4 sm:px-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-6 sm:p-10 relative overflow-hidden">
        
        {/* Step Indicator Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
              Passo {currentStep} de 3
            </span>
            <span className="text-xs font-medium text-slate-400">
              {currentStep === 1 && 'Identidade & Fotos'}
              {currentStep === 2 && 'Personalidade & Interesses'}
              {currentStep === 3 && 'Preferências de Encontro'}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-purple-600 transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: FOTOS E DADOS BÁSICOS */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif-display text-2xl font-bold text-slate-900">
                Seu perfil começa com suas fotos
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Escolha fotos claras em que seu rosto esteja visível e reflitam momentos que você ama.
              </p>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-3 gap-3">
              {photos.map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-rose-500 shadow-sm group"
                >
                  <img
                    src={src}
                    alt={`Foto ${index + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {index === 0 ? 'Principal' : `#${index + 1}`}
                  </div>
                </div>
              ))}

              {/* Add photo slot */}
              <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-300 hover:border-rose-400 bg-slate-50 hover:bg-rose-50/30 transition-all flex flex-col items-center justify-center cursor-pointer text-slate-500 hover:text-rose-600 p-3 text-center">
                <Camera className="w-6 h-6 mb-1 text-slate-400 group-hover:text-rose-500" />
                <span className="text-[11px] font-medium">+ Adicionar Foto</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome visível
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900"
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
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Localização / Bairro
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Profissão ou área de atuação
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: BIO, INTERESSES E O QUE PROCURA */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif-display text-2xl font-bold text-slate-900">
                O que move você no dia a dia?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Essas informações ajudam nosso algoritmo a conectar você a pessoas com valores e gostos alinhados.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sua biografia em poucas palavras
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
                placeholder="Conte o que te faz rir, como gosta de passar os domingos..."
                className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 resize-none"
              />
              <div className="text-right text-[11px] text-slate-400">
                {bio.length}/300 caracteres
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Seus interesses principais (selecione de 3 a 8)
                </label>
                <span className="text-[11px] font-medium text-rose-600">
                  {selectedInterests.length} selecionados
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1 border border-slate-100 rounded-xl bg-slate-50/50">
                {ALL_INTERESTS_LIST.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      <span>{interest}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                O que você busca hoje?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Relacionamento sério',
                  'Algo casual & sem pressa',
                  'Novas amizades',
                  'Ainda estou decidindo',
                ].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLookingFor(option)}
                    className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                      lookingFor === option
                        ? 'border-rose-500 bg-rose-50 text-rose-800 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PREFERÊNCIAS DE BUSCA */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif-display text-2xl font-bold text-slate-900">
                Quem você deseja encontrar?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Defina seus filtros de distância e faixa de idade. Você poderá ajustar isso a qualquer momento.
              </p>
            </div>

            {/* Distância */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700">Distância máxima</span>
                <span className="text-xs font-bold text-rose-600 tabular-nums">Até {maxDistance} km</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5 km (mesmo bairro)</span>
                <span>100 km (região metropolitana)</span>
              </div>
            </div>

            {/* Faixa etária */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700">Faixa de idade preferida</span>
                <span className="text-xs font-bold text-rose-600 tabular-nums">
                  {ageRange[0]} a {ageRange[1]} anos
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={ageRange[1]}
                  onChange={(e) => setAgeRange([ageRange[0], Math.max(ageRange[0] + 1, Number(e.target.value))])}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Selo verificado */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Apenas perfis verificados</div>
                  <div className="text-[11px] text-slate-600">Priorizar quem confirmou identidade por selfie</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={showVerifiedOnly}
                onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
              />
            </div>

            {/* Resumo de Sucesso */}
            <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl text-center">
              <Sparkles className="w-6 h-6 text-rose-500 mx-auto mb-1.5" />
              <h4 className="text-xs font-bold text-slate-900">Seu perfil está 100% pronto!</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Já selecionamos perfis compatíveis em São Paulo esperando por você.
              </p>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>{currentStep === 3 ? 'Concluir e Começar' : 'Continuar'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
