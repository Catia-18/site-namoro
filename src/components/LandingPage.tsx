import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  MessageSquare, 
  CheckCircle, 
  Lock, 
  ArrowRight, 
  Users,
  Compass,
  Smile,
  Music,
  BookOpen,
  Coffee,
  Check,
  Flame,
  Star
} from 'lucide-react';
import { heroYouthFriendsImg } from '../data/mockData';

interface LandingPageProps {
  onRegister: () => void;
  onLogin: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onRegister,
  onLogin,
  onExploreDemo,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF9FD] text-slate-900 pb-20 sm:pb-0 font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-purple-100/70">
        {/* Soft romantic background aura */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/45 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-200/35 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Romance & Dating Proposition */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 mb-5 bg-gradient-to-r from-purple-100 to-pink-100 px-3.5 py-1.5 rounded-full border border-purple-200/60 shadow-xs">
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                <span>O site de namoro #1 para jovens em Angola 🇦🇴</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-5 max-w-2xl">
                Encontra o teu <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">par perfeito.</span> Conecta com o teu crush.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-7 max-w-xl">
                O Conecta é o site de namoro moderno para jovens e solteiros em Angola. Descobre alguém com a tua química, marca dates românticos ao pôr do sol na Ilha de Luanda e constrói um namoro verdadeiro com carinho, respeito e cumplicidade.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
                <button
                  onClick={onRegister}
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg shadow-purple-500/25 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Criar perfil de namoro grátis</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>

                <button
                  onClick={onExploreDemo}
                  className="px-5 py-3.5 rounded-2xl bg-white/90 border border-purple-200 hover:bg-purple-50 text-slate-700 font-semibold transition-colors text-center flex items-center justify-center gap-2 shadow-xs cursor-pointer text-sm"
                >
                  <Compass className="w-4 h-4 text-purple-500" />
                  <span>Ver demonstração interativa</span>
                </button>
              </div>

              {/* Friendly Trust markers */}
              <div className="pt-5 border-t border-purple-100/80 w-full flex flex-wrap items-center gap-y-2.5 gap-x-5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-semibold text-purple-900">
                  <span className="text-pink-500">💖</span>
                  <span>Namoro Sério & Romance</span>
                </div>
                <span className="hidden sm:inline text-purple-200">·</span>
                <div className="flex items-center gap-1.5 font-semibold text-purple-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Perfis Reais de Angola</span>
                </div>
                <span className="hidden sm:inline text-purple-200">·</span>
                <div className="flex items-center gap-1.5 font-semibold text-purple-900">
                  <span className="text-purple-600">✨</span>
                  <span>Química & Dates Seguros</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Hero Card Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src={heroYouthFriendsImg}
                    alt="Casal jovem angolano sorridente e apaixonado"
                    referrerPolicy="no-referrer"
                    className="w-full h-[380px] sm:h-[440px] object-cover object-center"
                  />

                  {/* Gradient Scrim & Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-xl bg-pink-500/90 text-white text-xs font-bold backdrop-blur-sm flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-white" />
                        Match Romântico · 98% Química
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold mb-1">
                      Kianda & Adilson
                    </h3>
                    <p className="text-xs text-purple-200 leading-relaxed mb-4">
                      "Demos match no Conecta pelo amor por pôr do sol na Ilha e Afrobeats. O nosso primeiro date foi inesquecível! 💕"
                    </p>

                    <div className="flex items-center gap-3 pt-3 border-t border-white/20 text-xs">
                      <span className="flex items-center gap-1 text-slate-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Verificados
                      </span>
                      <span>·</span>
                      <span className="text-slate-200">Luanda, Angola 🇦🇴</span>
                    </div>
                  </div>
                </div>

                {/* Floating Love Card */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-purple-100 flex items-center gap-3 animate-in fade-in">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center font-bold text-lg">
                    💖
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Novo Match Romântico!</div>
                    <div className="text-[10px] text-purple-600 font-semibold">Vocês têm química perfeita</div>
                  </div>
                </div>

                {/* Floating Date Invite Card */}
                <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-purple-100 flex items-center gap-2.5 animate-in fade-in">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">
                    🌅
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-slate-900">Date na Ilha de Luanda</div>
                    <div className="text-[10px] text-slate-500">Sábado ao pôr do sol 💕</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Como Funciona o Namoro no Conecta */}
      <section id="como-funciona" className="py-20 bg-white border-b border-purple-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-purple-600 tracking-wide uppercase bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              O Teu Caminho para o Amor
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
              Como funciona o namoro no Conecta
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Um fluxo simples e romântico feito para encontrares alguém especial em Angola.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-7 rounded-3xl bg-[#FAF9FD] border border-purple-100/90 hover:border-purple-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-purple-700 text-white font-black text-lg flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>Cria o teu perfil de namoro</span>
                <span>🌹</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Adiciona as tuas fotos naturais, o teu curso ou faculdade, a tua música romântica favorita e conta o que procuras num relacionamento.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-3xl bg-[#FAF9FD] border border-purple-100/90 hover:border-pink-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-pink-600 text-white font-black text-lg flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>Descobre o teu crush</span>
                <span>💘</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explora perfis de jovens e solteiros perto de ti em Luanda. Vê afinidades de estilo, química musical e intenções de namoro sério.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-3xl bg-[#FAF9FD] border border-purple-100/90 hover:border-rose-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white font-black text-lg flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>Dá Match e marca o date</span>
                <span>💬</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Quando ambos curtirem o perfil, é um match! Começa a conversa com quebra-gelos românticos e marca aquele primeiro encontro inesquecível.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios do Namoro */}
      <section id="beneficios" className="py-20 bg-[#FAF9FD] border-b border-purple-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-pink-600 tracking-wide uppercase bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
              O Amor em Angola
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
              Feito para quem procura namoro verdadeiro
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Aproximamos corações com carinho, confiança e segurança.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xs hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 text-xl">
                💖
              </div>
              <h4 className="font-bold text-slate-900 mb-2 text-sm">Namoro Sério & Real</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pessoas reais que buscam companheirismo, respeito e um namoro para valer, sem joguinhos ou falsas ilusões.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4 text-xl">
                🌅
              </div>
              <h4 className="font-bold text-slate-900 mb-2 text-sm">Dates Românticos</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ideias de encontros charmosos em Luanda: cafeterias intimistas no Miramar, pores do sol na Ilha e passeios na Marginal.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 text-xl">
                🎧
              </div>
              <h4 className="font-bold text-slate-900 mb-2 text-sm">Química Musical & Vibe</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nada conecta melhor do que o mesmo gosto musical. Descobre quem vibra com as mesmas canções de amor e Afrobeats.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 text-xl">
                🛡️
              </div>
              <h4 className="font-bold text-slate-900 mb-2 text-sm">Namoro Seguro</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Perfis verificados e moderação ativa para que mulheres e homens jovens possam namorar e conversar com total tranquilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Histórias de Casais Reais de Angola */}
      <section id="depoimentos" className="py-20 bg-white border-b border-purple-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-purple-600 tracking-wide uppercase bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              Histórias de Amor
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
              Casais que começaram a namorar no Conecta 💕
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Histórias reais de jovens angolanos que encontraram o amor da sua vida na nossa plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Casal 1 */}
            <div className="p-7 rounded-3xl bg-[#FAF9FD] border border-purple-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-pink-500 mb-3 text-sm">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                  "Demos match pelo amor em comum por arte e Afrobeats. O Adilson convidou-me para um café na Ilha de Luanda e o papo fluiu durante horas. Hoje somos namorados e não podíamos estar mais felizes!"
                </p>
              </div>
              <div className="pt-4 border-t border-purple-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-xs">
                  K & A
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Kianda & Adilson</h5>
                  <p className="text-[11px] text-purple-600 font-semibold">Namorando há 8 meses · Luanda</p>
                </div>
              </div>
            </div>

            {/* Casal 2 */}
            <div className="p-7 rounded-3xl bg-[#FAF9FD] border border-pink-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-pink-500 mb-3 text-sm">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                  "Eu tinha receio de apps de namoro, mas o Conecta tem uma vibe muito acolhedora e respeitosa. O Nilton compôs uma música ao violão para mim no nosso segundo date. Estamos apaixonadíssimos!"
                </p>
              </div>
              <div className="pt-4 border-t border-pink-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                  W & N
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Weza & Nilton</h5>
                  <p className="text-[11px] text-purple-600 font-semibold">Namorando há 5 meses · Alvalade</p>
                </div>
              </div>
            </div>

            {/* Casal 3 */}
            <div className="p-7 rounded-3xl bg-[#FAF9FD] border border-rose-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-pink-500 mb-3 text-sm">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                  "Eu procurava um namorado que curtisse o meu lado geek e gostasse de esportes. O Damião foi o match perfeito! Ele apoia todos os meus projetos e cuidamos muito um do outro."
                </p>
              </div>
              <div className="pt-4 border-t border-rose-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
                  E & D
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Esperança & Damião</h5>
                  <p className="text-[11px] text-purple-600 font-semibold">Namorando há 1 ano · Miramar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-tr from-purple-900 via-purple-950 to-pink-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-purple-500 via-pink-400 to-rose-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/30">
            <Heart className="w-7 h-7 text-white fill-white" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Pronto para encontrar o teu amor? 💖
          </h2>
          <p className="text-purple-200 text-sm sm:text-base mb-8 max-w-lg mx-auto">
            Cria o teu perfil de namoro em menos de 1 minuto, descobre quem tem química contigo e começa uma história linda a dois.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onRegister}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 hover:opacity-95 text-purple-950 font-extrabold shadow-lg shadow-purple-500/30 active:scale-95 transition-all cursor-pointer text-sm"
            >
              Começar a namorar grátis 💕
            </button>
            <button
              onClick={onLogin}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold backdrop-blur-sm transition-colors cursor-pointer text-sm"
            >
              Já tenho conta
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="seguranca" className="bg-slate-950 text-slate-400 py-12 border-t border-purple-900/40 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                </div>
                <span className="font-display text-xl font-black text-white tracking-tight">
                  Conecta
                </span>
                <span className="text-[10px] bg-pink-900/80 text-pink-300 px-2 py-0.5 rounded-md font-bold">
                  Namoro
                </span>
              </div>
              <p className="text-slate-400 max-w-sm mb-4 leading-relaxed text-xs">
                O site de namoro e relacionamentos autênticos para jovens em Angola. Focado em química real, respeito, carinho e encontros inesquecíveis.
              </p>
              <div className="text-slate-500 text-[11px]">
                © {new Date().getFullYear()} Conecta Namoro Angola. Luanda, Angola 🇦🇴
              </div>
            </div>

            <div>
              <h5 className="text-white font-bold mb-3 text-xs">Namoro</h5>
              <ul className="space-y-2">
                <li><button onClick={onExploreDemo} className="hover:text-purple-300 transition-colors cursor-pointer">Encontrar Par</button></li>
                <li><a href="#como-funciona" className="hover:text-purple-300 transition-colors">Como Funciona</a></li>
                <li><a href="#beneficios" className="hover:text-purple-300 transition-colors">Dates Românticos</a></li>
                <li><a href="#depoimentos" className="hover:text-purple-300 transition-colors">Casais Felizes</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-3 text-xs">Segurança no Amor</h5>
              <ul className="space-y-2">
                <li><span className="text-slate-400">Dicas para Primeiro Date</span></li>
                <li><span className="text-slate-400">Verificação de Solteiros</span></li>
                <li><span className="text-slate-400">Namoro com Respeito</span></li>
                <li><span className="text-slate-400">Canal de Ajuda</span></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-3 text-xs">Informações</h5>
              <ul className="space-y-2">
                <li><span className="text-slate-400">Termos de Namoro</span></li>
                <li><span className="text-slate-400">Privacidade de Casal</span></li>
                <li><span className="text-slate-400">Contacto</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-3 text-[11px]">
            <p>O teu amor está em Angola 🇦🇴 · Romance, Respeito & Conexões Verdadeiras</p>
            <div className="flex items-center gap-3">
              <span>Português (Angola)</span>
              <span>·</span>
              <span>Luanda, Angola</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
