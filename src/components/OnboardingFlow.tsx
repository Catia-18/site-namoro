import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  MapPin, 
  BookOpen, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Heart,
  Music,
  Smile,
  ShieldCheck
} from 'lucide-react';
import { ALL_INTERESTS_LIST, youthAdilsonImg, youthDamiaoImg } from '../data/mockData';

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
    youthAdilsonImg,
    youthDamiaoImg,
  ]);
  const [name, setName] = useState('Adilson Manuel');
  const [age, setAge] = useState(20);
  const [location, setLocation] = useState('Talatona, Luanda');
  const [occupation, setOccupation] = useState('Estudante de Arquitetura & Design (UAN)');

  // Step 2 state
  const [bio, setBio] = useState(
    'Sempre com auscultadores nos ouvidos a ouvir Afrobeats ou Neo-Soul. Apaixonado por desenhar maquetes, encontrar bons spots para estudar e ver o pôr do sol na Ilha! 🎧✨'
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Música & Playlists 🎧',
    'Café & Estudos ☕',
    'Design & Criatividade 💻',
    'Fotografia 📸',
    'Basquetebol 🏀',
  ]);
  const [lookingFor, setLookingFor] = useState('Namoro Sério & Romance 💖');

  // Step 3 state
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 23]);
  const [maxDistance, setMaxDistance] = useState<number>(20);

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
    <div className="min-h-screen bg-[#FAF9FD] py-10 px-4 sm:px-6 flex flex-col justify-center items-center font-sans">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl shadow-purple-500/5 border border-purple-100 p-6 sm:p-9 relative overflow-hidden">
        
        {/* Step Indicator Header */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Etapa {currentStep} de 3</span>
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {currentStep === 1 && 'Fotos & Quem És'}
              {currentStep === 2 && 'Hobbies & Vibe'}
              {currentStep === 3 && 'O Teu Par Ideal'}
            </span>
          </div>
          {/* Progress bar in soft lilac/pink gradient */}
          <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-400 to-sky-400 transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: FOTOS E DADOS BÁSICOS */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-slate-900">
                Mostra a tua energia natural ✨
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Escolhe fotos espontâneas: a estudar, a ouvir música, passeios em Luanda ou a praticar desporto!
              </p>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-3 gap-3">
              {photos.map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-purple-400 shadow-xs group"
                >
                  <img
                    src={src}
                    alt={`Foto ${index + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-purple-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {index === 0 ? 'Principal 🌟' : `#${index + 1}`}
                  </div>
                </div>
              ))}

              {/* Add photo slot */}
              <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-purple-200 hover:border-purple-400 bg-purple-50/50 hover:bg-purple-50 transition-all flex flex-col items-center justify-center cursor-pointer text-purple-500 p-3 text-center">
                <Camera className="w-6 h-6 mb-1 text-purple-400" />
                <span className="text-[11px] font-bold">+ Adicionar Foto</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Como queres ser chamado?
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-purple-100 bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Idade
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-purple-100 bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Localização em Luanda
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-purple-100 bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Curso, Universidade ou Escola
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-purple-100 bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 text-slate-900"
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
              <h3 className="font-display text-2xl font-extrabold text-slate-900">
                A tua vibe e os teus hobbies 🎧
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Escolhe o que adoras fazer no teu tempo livre para encontrares pessoas com afinidade real.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                A tua bio curta e descontraída
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
                placeholder="Conta o que estás a ouvir no Spotify, as tuas séries favoritas..."
                className="w-full p-3 text-xs sm:text-sm rounded-2xl border border-purple-100 bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 text-slate-900 resize-none"
              />
              <div className="text-right text-[11px] text-slate-400">
                {bio.length}/300 caracteres
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700">
                  Os teus hobbies favoritos (escolhe 3 a 8)
                </label>
                <span className="text-[11px] font-bold text-purple-600">
                  {selectedInterests.length} selecionados
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto p-1.5 border border-purple-100 rounded-2xl bg-purple-50/30">
                {ALL_INTERESTS_LIST.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-purple-100 hover:border-purple-300'
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
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                O que estás à procura no Conecta Namoro?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Namoro Sério & Romance 💖',
                  'Conhecer Meu Crush & Paquera 💘',
                  'Dates & Momentos a Dois 🌹',
                  'Relacionamento Jovem & Leve ✨',
                ].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLookingFor(option)}
                    className={`p-2.5 rounded-2xl text-xs font-bold text-left border transition-all cursor-pointer ${
                      lookingFor === option
                        ? 'border-purple-500 bg-purple-50 text-purple-900'
                        : 'border-purple-100 hover:border-purple-200 text-slate-700 bg-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PREFERÊNCIAS DE BUSCA JOVEM */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-slate-900">
                Quem queres namorar? 💘
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Define a distância e a faixa etária para encontrares o teu crush e par ideal em Angola.
              </p>
            </div>

            {/* Distância */}
            <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Distância máxima em Luanda</span>
                <span className="text-xs font-extrabold text-purple-700 tabular-nums">Até {maxDistance} km</span>
              </div>
              <input
                type="range"
                min="3"
                max="50"
                step="1"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>3 km (mesmo bairro / campus)</span>
                <span>50 km (grande Luanda)</span>
              </div>
            </div>

            {/* Faixa etária jovem */}
            <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Faixa etária jovem</span>
                <span className="text-xs font-extrabold text-purple-700 tabular-nums">
                  {ageRange[0]} a {ageRange[1]} anos
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="18"
                  max="25"
                  value={ageRange[1]}
                  onChange={(e) => setAgeRange([18, Number(e.target.value)])}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Comunidade direcionada a estudantes e jovens adultos em Angola
              </span>
            </div>

            {/* Resumo de Sucesso */}
            <div className="p-4 bg-gradient-to-r from-purple-50 via-pink-50 to-sky-50 border border-purple-200/70 rounded-2xl text-center">
              <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-1.5" />
              <h4 className="text-xs font-extrabold text-slate-900">O teu perfil está 100% pronto! ✨</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Já encontrámos estudantes e criativos incríveis em Luanda à tua espera.
              </p>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-purple-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2.5 rounded-2xl border border-purple-200 text-slate-600 hover:text-slate-900 hover:bg-purple-50 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-bold shadow-md shadow-purple-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>{currentStep === 3 ? 'Bora Conectar! 💜' : 'Continuar'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
