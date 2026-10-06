import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Heart
} from 'lucide-react';

interface AuthScreenProps {
  initialMode?: 'login' | 'register';
  onSuccess: (isNewUser: boolean) => void;
  onBackToLanding: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'register',
  onSuccess,
  onBackToLanding,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);

  // Form State
  const [name, setName] = useState('Adilson Manuel');
  const [email, setEmail] = useState('adilson.manuel@exemplo.ao');
  const [password, setPassword] = useState('vibes2026');
  const [birthDate, setBirthDate] = useState('2005-05-14');
  const [gender, setGender] = useState<'feminino' | 'masculino' | 'nao-binario'>('masculino');
  const [relationshipGoal, setRelationshipGoal] = useState<string>('namoro-serio');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'register') {
      if (!name.trim()) {
        setErrorMessage('Por favor, indica o teu nome.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Por favor, indica um e-mail válido.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('A palavra-passe deve ter pelo menos 6 caracteres.');
        return;
      }
      if (!termsAccepted) {
        setErrorMessage('Precisas de aceitar as diretrizes da comunidade.');
        return;
      }
      onSuccess(true); // Goes to Onboarding
    } else {
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Por favor, indica o teu e-mail.');
        return;
      }
      if (!password) {
        setErrorMessage('Por favor, introduz a tua palavra-passe.');
        return;
      }
      onSuccess(false); // Goes to Discover
    }
  };

  const handleForgotPassword = () => {
    setForgotPasswordSent(true);
    setTimeout(() => setForgotPasswordSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FD] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative font-sans">
      {/* Background glow in soft lavender and pink */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header with logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 group cursor-pointer mb-4"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-400 to-sky-400 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-white text-white" />
          </div>
          <span className="font-display text-3xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 bg-clip-text text-transparent">
            Conecta
          </span>
        </button>

        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">
          {mode === 'register' ? 'Entra no Conecta Namoro 💕' : 'Bem-vindo de volta! 💖'}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          {mode === 'register'
            ? 'Cria o teu perfil e encontra o teu crush ideal em Angola'
            : 'Acede às tuas conversas, crushes e matches românticos'}
        </p>

        {/* Tab switch */}
        <div className="mt-5 p-1 bg-purple-100/60 rounded-2xl max-w-xs mx-auto flex items-center border border-purple-200/40">
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(''); }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'register' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Criar Perfil ✨
          </button>
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(''); }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'login' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Já tenho Conta
          </button>
        </div>
      </div>

      {/* Main card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl shadow-purple-500/5 rounded-3xl border border-purple-100 sm:px-9">
          
          {errorMessage && (
            <div className="mb-4 p-3 bg-pink-50 border border-pink-200 rounded-2xl text-pink-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {forgotPasswordSent && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Link de recuperação enviado para o teu e-mail com sucesso!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'register' && (
              <>
                {/* Nome visível */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Como queres ser chamado? (Nome ou Apelido)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Adilson Manuel"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-purple-100 bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 transition-all text-slate-900"
                    />
                  </div>
                </div>

                {/* Data de nascimento & Gênero */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Data de nascimento
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="date"
                        required
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-2xl border border-purple-100 bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 transition-all text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Identifico-me como
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-2xl border border-purple-100 bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 transition-all text-slate-900"
                    >
                      <option value="masculino">Rapaz / Homem</option>
                      <option value="feminino">Rapariga / Mulher</option>
                      <option value="nao-binario">Não-binário</option>
                    </select>
                  </div>
                </div>

                {/* O que procuras no Conecta */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Qual é o teu objetivo no Conecta Namoro?
                  </label>
                  <select
                    value={relationshipGoal}
                    onChange={(e) => setRelationshipGoal(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-2xl border border-purple-100 bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 transition-all text-slate-900"
                  >
                    <option value="namoro-serio">Namoro Sério & Romance 💖</option>
                    <option value="romance-encontros">Romance & Conexão Romântica 💕</option>
                    <option value="conhecer-crush">Conhecer Meu Crush & Namorar 💘</option>
                    <option value="aberto-ao-amor">Aberto ao Amor & Química 🌹</option>
                  </select>
                </div>
              </>
            )}

            {/* E-mail */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="o.teu.email@exemplo.ao"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-purple-100 bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 transition-all text-slate-900"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Palavra-passe
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-purple-600 hover:text-purple-700 font-semibold cursor-pointer"
                  >
                    Esqueci a palavra-passe
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-2xl border border-purple-100 bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 transition-all text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-purple-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Termos de Convivência Segura */}
            {mode === 'register' && (
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-600">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded-md text-purple-600 focus:ring-purple-500 border-purple-200"
                  />
                  <span>
                    Concordo com as <span className="text-purple-600 font-semibold underline">Diretrizes da Comunidade</span> do Conecta e comprometo-me a manter um espaço respeitoso e livre de assédio.
                  </span>
                </label>
              </div>
            )}

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-md shadow-purple-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>{mode === 'register' ? 'Criar meu perfil e continuar ✨' : 'Entrar na minha conta 💜'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Social login divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-100" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase">
                <span className="bg-white px-3 text-slate-400 font-bold">Ou acede com</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onSuccess(mode === 'register')}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-purple-100 rounded-2xl text-xs font-bold text-slate-700 hover:bg-purple-50/50 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => onSuccess(mode === 'register')}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-purple-100 rounded-2xl text-xs font-bold text-slate-700 hover:bg-purple-50/50 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-slate-900" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.78 1.05-1.87.93-2.97-1 .04-2.14.67-2.8 1.44-.58.67-1.09 1.77-.96 2.84 1.12.09 2.2-.53 2.83-1.31z"/>
                </svg>
                <span>Apple</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            {mode === 'register' ? (
              <p>
                Já tens uma conta?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-purple-600 hover:text-purple-700 underline cursor-pointer"
                >
                  Entrar aqui
                </button>
              </p>
            ) : (
              <p>
                Ainda não fazes parte?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-purple-600 hover:text-purple-700 underline cursor-pointer"
                >
                  Cria o teu perfil grátis
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
