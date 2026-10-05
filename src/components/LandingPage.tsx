import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  MessageSquare, 
  CheckCircle, 
  Lock, 
  ArrowRight,
  Flame,
  ChevronRight,
  Users
} from 'lucide-react';

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
    <div className="min-h-screen bg-[#FAFAFB] text-slate-900 pb-20 sm:pb-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200/60">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 via-purple-50/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 mb-6 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100">
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>O novo padrão para encontros autênticos</span>
              </div>

              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.12] mb-6 max-w-2xl">
                Conexões reais para pessoas que buscam algo <span className="italic bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">verdadeiro.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                Chega de superficialidade e conversas que não saem do lugar. No Conecta, adultos encontram parceiros compatíveis com base em valores de vida, estilo pessoal e segurança verificada.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
                <button
                  onClick={onRegister}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium shadow-lg shadow-rose-500/25 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Criar minha conta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onExploreDemo}
                  className="px-5 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium transition-colors text-center flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Explorar protótipo interativo</span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-slate-200/80 w-full flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Perfis com Selfie Verificada</span>
                </div>
                <span className="hidden sm:inline text-slate-300">·</span>
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Lock className="w-4 h-4 text-rose-500" />
                  <span>Privacidade e Segurança Ativa 24/7</span>
                </div>
                <span className="hidden sm:inline text-slate-300">·</span>
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>+120.000 conexões realizadas</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative aura */}
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-rose-200/50 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

                {/* Hero Card Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                  <img
                    src="/src/assets/images/hero_dating_couple_1791225929622.jpg"
                    alt="Casal feliz conversando em um café ao ar livre"
                    referrerPolicy="no-referrer"
                    className="w-full h-[380px] sm:h-[440px] object-cover object-center"
                  />

                  {/* Gradient Scrim & Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/90 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Match de Alta Afinidade · 96%
                      </span>
                    </div>
                    <h3 className="font-serif-display text-xl sm:text-2xl font-bold">
                      Mateus & Ana
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1">
                      Conectados há 8 meses por afinidade em arquitetura, arte contemporânea e gastronomia artesanal.
                    </p>
                  </div>
                </div>

                {/* Floating Social Proof Card */}
                <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-3.5 max-w-[260px]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-rose-500/20">
                    <Heart className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Novo Match mútuo!</div>
                    <div className="text-[11px] text-slate-500">Ambos amam café especial e trilhas</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-rose-600 tracking-wide uppercase">
              Processo Simples e Transparente
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Como funciona o Conecta
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Desenvolvemos uma experiência pensada para valorizar sua individualidade e respeitar seu tempo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-[#FAFAFB] border border-slate-200/70 hover:border-rose-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 font-serif-display font-bold text-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Perfil autêntico e detalhado
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Compartilhe fotos reais, seus gostos culturais, hábitos e o tipo de relacionamento que você realmente busca. Sem filtros enganosos.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-[#FAFAFB] border border-slate-200/70 hover:border-purple-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 font-serif-display font-bold text-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Compatibilidade profunda
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nosso sistema calcula índices de afinidade com base em valores essenciais de vida, estilo no dia a dia e objetivos compartilhados.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-[#FAFAFB] border border-slate-200/70 hover:border-emerald-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 font-serif-display font-bold text-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Match e conversas estimulantes
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dê match quando a atração for mútua e inicie um bate-papo sem pressão com sugestões de quebra-gelo personalizadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais / Benefícios */}
      <section id="beneficios" className="py-20 bg-[#FAFAFB] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-rose-600 tracking-wide uppercase">
              Por que somos diferentes
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Criado para quem cansou do superficial
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Privacidade, segurança e afinidade real no centro de cada detalhe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Identidade Verificada</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verificação biométrica de selfies e checagem contínua para manter a comunidade 100% humana e sem bots.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Afinidade com Significado</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Descubra não apenas fotos, mas hábitos, preferências de vida e visões de futuro antes de curtir.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Quebra-Gelos Inteligentes</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sugestões contextuais para começar o diálogo de forma natural, sem o incômodo "oi, tudo bem?".
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Privacidade Total</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Controle quem vê sua distância, oculte seu perfil com modo invisível e desfrute de denúncia ágil com moderação 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos / Histórias Reais */}
      <section id="depoimentos" className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-rose-600 tracking-wide uppercase">
              Histórias de Sucesso
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Quem encontrou conexões verdadeiras
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Centenas de novos casais começam suas histórias todos os meses no Conecta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFAFB] border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  "Depois de anos frustrada com apps em que ninguém queria nada com nada, no Conecta dei match com o Marcelo. Desde o primeiro café percebemos que queríamos construir um futuro com os mesmos valores."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-200 text-rose-700 font-bold flex items-center justify-center text-sm">
                  J&M
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Juliana & Marcelo</h5>
                  <p className="text-[11px] text-slate-500">Namorando há 1 ano e 3 meses · São Paulo</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFAFB] border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  "O índice de compatibilidade parecia bom demais pra ser verdade, mas foi 100% preciso. Gostamos dos mesmos livros, mesmos restaurantes e o senso de humor bateu na primeira piada."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-200 text-purple-700 font-bold flex items-center justify-center text-sm">
                  C&R
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Camila & Rodrigo</h5>
                  <p className="text-[11px] text-slate-500">Noivos há 5 meses · Curitiba</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFAFB] border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  "A tranquilidade de saber que todas as pessoas ali são verificadas muda completamente a postura. A conversa flui com respeito, sem joguinhos infantis."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-700 font-bold flex items-center justify-center text-sm">
                  T&F
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Thiago & Fernando</h5>
                  <p className="text-[11px] text-slate-500">Morando juntos há 2 anos · Rio de Janeiro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-rose-500/20">
            <Heart className="w-6 h-6 fill-white text-white" />
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Pronto para encontrar alguém que fale a sua língua?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Crie sua conta gratuitamente em menos de 2 minutos e comece a descobrir pessoas compatíveis hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onRegister}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold shadow-lg shadow-rose-500/30 active:scale-95 transition-all cursor-pointer"
            >
              Criar minha conta gratuita
            </button>
            <button
              onClick={onLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium backdrop-blur-sm transition-colors cursor-pointer"
            >
              Já tenho uma conta
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="seguranca" className="bg-slate-950 text-slate-400 py-14 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                </div>
                <span className="font-serif-display text-xl font-bold text-white tracking-tight">
                  Conecta
                </span>
              </div>
              <p className="text-slate-400 max-w-sm mb-4 leading-relaxed">
                Plataforma de relacionamentos sérios e conexões autênticas para pessoas adultas. Segurança, afinidade e transparência em primeiro lugar.
              </p>
              <div className="text-slate-500">
                © {new Date().getFullYear()} Conecta Tecnologia Ltda. Todos os direitos reservados.
              </div>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-3">Produto</h5>
              <ul className="space-y-2">
                <li><button onClick={onExploreDemo} className="hover:text-white transition-colors cursor-pointer">Descobrir</button></li>
                <li><a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a></li>
                <li><a href="#beneficios" className="hover:text-white transition-colors">Afinidade & IA</a></li>
                <li><a href="#depoimentos" className="hover:text-white transition-colors">Histórias de Casais</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-3">Segurança</h5>
              <ul className="space-y-2">
                <li><span className="text-slate-400">Verificação de Selfie</span></li>
                <li><span className="text-slate-400">Diretrizes da Comunidade</span></li>
                <li><span className="text-slate-400">Central de Ajuda</span></li>
                <li><span className="text-slate-400">Denúncia de Golpes</span></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-3">Legal</h5>
              <ul className="space-y-2">
                <li><span className="text-slate-400">Termos de Uso</span></li>
                <li><span className="text-slate-400">Política de Privacidade</span></li>
                <li><span className="text-slate-400">Preferências de Cookies</span></li>
                <li><span className="text-slate-400">Contato & Suporte</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
            <p>Conecta é um produto digital fictício desenvolvido como demonstração de alta fidelidade para apresentações.</p>
            <div className="flex items-center gap-4">
              <span>Português (Brasil)</span>
              <span>·</span>
              <span>São Paulo, Brasil</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
