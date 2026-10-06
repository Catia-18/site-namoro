import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Bell, 
  Shield, 
  EyeOff, 
  LogOut, 
  FileText, 
  ChevronRight, 
  ArrowLeft, 
  Sliders, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [hideDistance, setHideDistance] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<'termos' | 'privacidade' | 'diretrizes' | null>(null);

  const [blockedUsers, setBlockedUsers] = useState([
    { id: 'b1', name: 'Perfil Inapropriado Oculto', date: 'Bloqueado em 14/08/2026' },
  ]);

  if (!isOpen) return null;

  const handleUnblock = (id: string) => {
    setBlockedUsers(blockedUsers.filter((u) => u.id !== id));
    showToast();
  };

  const showToast = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeLegalDoc && (
              <button
                onClick={() => setActiveLegalDoc(null)}
                className="p-1 -ml-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h3 className="font-display text-base font-bold text-slate-900">
              {activeLegalDoc === 'termos' && 'Termos da Comunidade'}
              {activeLegalDoc === 'privacidade' && 'Política de Privacidade & Dados'}
              {activeLegalDoc === 'diretrizes' && 'Diretrizes de Convivência Jovem'}
              {!activeLegalDoc && 'Definições & Privacidade'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved Toast */}
        {savedFeedback && (
          <div className="bg-purple-50 text-purple-800 text-xs px-4 py-2 flex items-center justify-center gap-1.5 font-bold border-b border-purple-100 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Definições atualizadas com sucesso! ✨</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {activeLegalDoc === 'termos' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-sm">1. Termos de Utilização do Conecta Angola</h4>
              <p>O Conecta é uma rede social acolhedora para jovens em Angola descobrirem amizades saudáveis, formarem grupos de estudo e partilharem hobbies criativos.</p>
              <h5 className="font-semibold text-slate-800">2. Conduta e Proteção do Utilizador</h5>
              <p>É estritamente proibido o uso de fotos que não te pertençam, partilha de conteúdo adulto ou sexualizado, bullying ou qualquer tipo de desrespeito. Violações resultam em expulsão definitiva.</p>
              <h5 className="font-semibold text-slate-800">3. Encontros Saudáveis</h5>
              <p>Incentivamos que amizades presenciais comecem sempre em locais públicos conhecidos, como cafés perto da universidade ou passeios na Marginal em grupo.</p>
              <button
                onClick={() => setActiveLegalDoc(null)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Voltar às definições
              </button>
            </div>
          )}

          {activeLegalDoc === 'privacidade' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-sm">Privacidade e Proteção de Dados</h4>
              <p>A tua segurança é prioridade máxima. O Conecta protege o teu e-mail, fotos e conversas com encriptação padrão de mercado.</p>
              <h5 className="font-semibold text-slate-800">Localização e Distância</h5>
              <p>Não mostramos a tua morada exata. Podes ocultar a contagem de quilómetros a qualquer momento com o seletor de privacidade.</p>
              <h5 className="font-semibold text-slate-800">Controlo da Conta</h5>
              <p>Tens controlo total para editar ou apagar o teu perfil quando desejares.</p>
              <button
                onClick={() => setActiveLegalDoc(null)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Voltar às definições
              </button>
            </div>
          )}

          {activeLegalDoc === 'diretrizes' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-sm">Diretrizes da Comunidade Conecta 💜</h4>
              <p>Aqui cultivamos conexões autênticas, diversão e respeito mútuo:</p>
              <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
                <li><strong>Empatia e Boa Vibe:</strong> Trata toda a gente com simpatia e gentileza.</li>
                <li><strong>Autenticidade:</strong> Usa fotografias naturais do teu dia a dia saudável.</li>
                <li><strong>Zero Conteúdo Inapropriado:</strong> Nada de poses ou conversas de cariz sexual ou adulto.</li>
                <li><strong>Respeito pelos Limites:</strong> Se alguém não responder ou recusar conversar, respeita a decisão.</li>
              </ul>
              <button
                onClick={() => setActiveLegalDoc(null)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Voltar às definições
              </button>
            </div>
          )}

          {!activeLegalDoc && (
            <>
              {/* Section: Conta */}
              <div>
                <h4 className="text-xs font-bold text-purple-900/60 uppercase tracking-wider mb-3">
                  A Minha Conta
                </h4>
                <div className="bg-purple-50/30 rounded-2xl p-4 border border-purple-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">E-mail registado</div>
                      <div className="text-[11px] text-slate-500">adilson.manuel@exemplo.ao</div>
                    </div>
                    <button
                      onClick={showToast}
                      className="text-xs text-purple-600 font-bold hover:underline cursor-pointer"
                    >
                      Alterar
                    </button>
                  </div>

                  <div className="pt-2 border-t border-purple-100/60 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Telemóvel verificado</div>
                      <div className="text-[11px] text-slate-500">+244 923 456 789</div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold">
                      Confirmado 🇦🇴
                    </span>
                  </div>
                </div>
              </div>

              {/* Section: Privacidade */}
              <div>
                <h4 className="text-xs font-bold text-purple-900/60 uppercase tracking-wider mb-3">
                  Privacidade & Visibilidade
                </h4>
                <div className="space-y-3">
                  
                  <div className="p-3.5 bg-purple-50/20 rounded-2xl border border-purple-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <EyeOff className="w-3.5 h-3.5 text-purple-600" />
                        <span>Modo Discreto (Invisível)</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Apenas pessoas a quem enviaste vibe verão o teu perfil
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={incognitoMode}
                      onChange={(e) => { setIncognitoMode(e.target.checked); showToast(); }}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 bg-purple-50/20 rounded-2xl border border-purple-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Ocultar distância exata</div>
                      <div className="text-[11px] text-slate-500">Mostra apenas o bairro em Luanda sem os quilómetros</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={hideDistance}
                      onChange={(e) => { setHideDistance(e.target.checked); showToast(); }}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 bg-purple-50/20 rounded-2xl border border-purple-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Mostrar estado Online</div>
                      <div className="text-[11px] text-slate-500">Exibir indicador verde quando estiveres na aplicação</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={showOnlineStatus}
                      onChange={(e) => { setShowOnlineStatus(e.target.checked); showToast(); }}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 bg-purple-50/20 rounded-2xl border border-purple-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Confirmação de leitura no chat</div>
                      <div className="text-[11px] text-slate-500">Exibir tique de mensagem visualizada</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={readReceipts}
                      onChange={(e) => { setReadReceipts(e.target.checked); showToast(); }}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                  </div>

                </div>
              </div>

              {/* Section: Notificações */}
              <div>
                <h4 className="text-xs font-bold text-purple-900/60 uppercase tracking-wider mb-3">
                  Notificações
                </h4>
                <div className="space-y-2">
                  <div className="p-3 bg-purple-50/20 rounded-2xl border border-purple-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800">Notificações de novas conexões e mensagens</span>
                    <input
                      type="checkbox"
                      checked={pushNotifications}
                      onChange={(e) => { setPushNotifications(e.target.checked); showToast(); }}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-purple-50/20 rounded-2xl border border-purple-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800">Resumo de boas vibes por e-mail</span>
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => { setEmailNotifications(e.target.checked); showToast(); }}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Bloqueados */}
              <div>
                <h4 className="text-xs font-bold text-purple-900/60 uppercase tracking-wider mb-3">
                  Perfis Bloqueados ({blockedUsers.length})
                </h4>
                {blockedUsers.length > 0 ? (
                  <div className="space-y-2">
                    {blockedUsers.map((b) => (
                      <div
                        key={b.id}
                        className="p-3 bg-purple-50/20 rounded-2xl border border-purple-100 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{b.name}</div>
                          <div className="text-[10px] text-slate-400">{b.date}</div>
                        </div>
                        <button
                          onClick={() => handleUnblock(b.id)}
                          className="text-xs text-purple-600 hover:text-purple-700 font-bold cursor-pointer"
                        >
                          Desbloquear
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Nenhum utilizador bloqueado.</p>
                )}
              </div>

              {/* Section: Legal */}
              <div className="pt-2 border-t border-purple-50 space-y-1.5 text-xs text-slate-600">
                <button
                  type="button"
                  onClick={() => setActiveLegalDoc('termos')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50/40 transition-colors text-left cursor-pointer"
                >
                  <span className="font-semibold text-slate-800">Termos da Comunidade</span>
                  <ChevronRight className="w-4 h-4 text-purple-400" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLegalDoc('privacidade')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50/40 transition-colors text-left cursor-pointer"
                >
                  <span className="font-semibold text-slate-800">Política de Privacidade</span>
                  <ChevronRight className="w-4 h-4 text-purple-400" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLegalDoc('diretrizes')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50/40 transition-colors text-left cursor-pointer"
                >
                  <span className="font-semibold text-slate-800">Diretrizes de Convivência Positiva</span>
                  <ChevronRight className="w-4 h-4 text-purple-400" />
                </button>
              </div>

              {/* Logout */}
              <div className="pt-4 border-t border-purple-50">
                <button
                  onClick={onLogout}
                  className="w-full py-3 px-4 rounded-2xl border border-purple-200 text-purple-700 hover:bg-purple-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair da minha conta</span>
                </button>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
