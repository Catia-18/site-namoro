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
  CheckCircle2
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
    { id: 'b1', name: 'Rodrigo M.', date: 'Bloqueado em 14/08/2026' },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeLegalDoc && (
              <button
                onClick={() => setActiveLegalDoc(null)}
                className="p-1 -ml-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h3 className="font-serif-display text-lg font-bold text-slate-900">
              {activeLegalDoc === 'termos' && 'Termos de Uso'}
              {activeLegalDoc === 'privacidade' && 'Política de Privacidade'}
              {activeLegalDoc === 'diretrizes' && 'Diretrizes da Comunidade'}
              {!activeLegalDoc && 'Configurações & Privacidade'}
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
          <div className="bg-emerald-50 text-emerald-800 text-xs px-4 py-2 flex items-center justify-center gap-1.5 font-medium border-b border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Configurações atualizadas com sucesso!</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {activeLegalDoc === 'termos' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-sm">1. Termos de Uso do Conecta</h4>
              <p>O Conecta é uma plataforma dedicada a conexões autênticas e relacionamentos respeitosos entre adultos. Ao utilizar a plataforma, você concorda em cumprir todas as diretrizes de integridade e honestidade.</p>
              <h5 className="font-semibold text-slate-800">2. Conduta do Usuário</h5>
              <p>É estritamente proibido o uso de fotos falsas, difamação, envio de conteúdo explícito não consentido, solicitação de dinheiro ou qualquer forma de conduta fraudulenta. Contas que violarem estas regras serão permanentemente banidas.</p>
              <h5 className="font-semibold text-slate-800">3. Segurança dos Encontros</h5>
              <p>Recomendamos sempre marcar primeiros encontros em locais públicos, informar amigos e manter a comunicação através do aplicativo até que haja plena confiança mútua.</p>
              <button
                onClick={() => setActiveLegalDoc(null)}
                className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Voltar às configurações
              </button>
            </div>
          )}

          {activeLegalDoc === 'privacidade' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-sm">Política de Privacidade e Dados</h4>
              <p>Sua privacidade é inviolável. O Conecta adota os mais rigorosos padrões de criptografia para proteger suas fotos, conversas e preferências.</p>
              <h5 className="font-semibold text-slate-800">Uso de Dados</h5>
              <p>Seus dados pessoais nunca são comercializados com terceiros. As coordenadas geográficas são utilizadas unicamente para cálculo aproximado de proximidade no app e você pode ocultá-las ativando o modo "Ocultar distância exata".</p>
              <h5 className="font-semibold text-slate-800">Exclusão de Conta</h5>
              <p>Você pode excluir sua conta e todos os dados associados a qualquer momento no painel de configurações.</p>
              <button
                onClick={() => setActiveLegalDoc(null)}
                className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Voltar às configurações
              </button>
            </div>
          )}

          {activeLegalDoc === 'diretrizes' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-sm">Diretrizes da Comunidade Conecta</h4>
              <p>Construímos uma comunidade acolhedora, inclusiva e segura. Aqui estão os princípios que todos os membros devem seguir:</p>
              <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
                <li><strong>Respeito Mútuo:</strong> Trate cada pessoa com dignidade, cordialidade e simpatia.</li>
                <li><strong>Autenticidade:</strong> Seja quem você é. Perfis com fotos roubadas ou descrições falsas são banidos sumariamente.</li>
                <li><strong>Consentimento:</strong> Respeite os limites da outra pessoa. Não insista caso alguém não queira conversar.</li>
                <li><strong>Tolerância Zero para Discriminação:</strong> Racismo, machismo, homofobia ou qualquer preconceito resultam em banimento imediato.</li>
              </ul>
              <button
                onClick={() => setActiveLegalDoc(null)}
                className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Voltar às configurações
              </button>
            </div>
          )}

          {!activeLegalDoc && (
            <>
              {/* Section: Conta */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Conta
                </h4>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">E-mail cadastrado</div>
                      <div className="text-[11px] text-slate-500">gabriel.souza@exemplo.com.br</div>
                    </div>
                    <button
                      onClick={showToast}
                      className="text-xs text-rose-600 font-semibold hover:underline cursor-pointer"
                    >
                      Alterar
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Telefone verificado</div>
                      <div className="text-[11px] text-slate-500">+55 (11) 98765-4321</div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                      Confirmado
                    </span>
                  </div>
                </div>
              </div>

              {/* Section: Privacidade */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Privacidade & Discrição
                </h4>
                <div className="space-y-3">
                  
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <EyeOff className="w-3.5 h-3.5 text-purple-600" />
                        <span>Modo Invisível (Incógnito)</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Apenas pessoas que você curtiu verão seu perfil no feed
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={incognitoMode}
                      onChange={(e) => { setIncognitoMode(e.target.checked); showToast(); }}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500 border-slate-300 cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Ocultar minha distância exata</div>
                      <div className="text-[11px] text-slate-500">Mostra apenas a cidade, sem a contagem de km</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={hideDistance}
                      onChange={(e) => { setHideDistance(e.target.checked); showToast(); }}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500 border-slate-300 cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Mostrar status Online</div>
                      <div className="text-[11px] text-slate-500">Exibir bolinha verde quando você estiver no app</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={showOnlineStatus}
                      onChange={(e) => { setShowOnlineStatus(e.target.checked); showToast(); }}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500 border-slate-300 cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Confirmação de leitura no chat</div>
                      <div className="text-[11px] text-slate-500">Exibir tique duplo azul ao visualizar mensagens</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={readReceipts}
                      onChange={(e) => { setReadReceipts(e.target.checked); showToast(); }}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500 border-slate-300 cursor-pointer"
                    />
                  </div>

                </div>
              </div>

              {/* Section: Notificações */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Notificações
                </h4>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-800">Notificações Push (Matches e Mensagens)</span>
                    <input
                      type="checkbox"
                      checked={pushNotifications}
                      onChange={(e) => { setPushNotifications(e.target.checked); showToast(); }}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500 border-slate-300 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-800">Resumo semanal por e-mail</span>
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => { setEmailNotifications(e.target.checked); showToast(); }}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500 border-slate-300 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Bloqueados */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Usuários Bloqueados ({blockedUsers.length})
                </h4>
                {blockedUsers.length > 0 ? (
                  <div className="space-y-2">
                    {blockedUsers.map((b) => (
                      <div
                        key={b.id}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{b.name}</div>
                          <div className="text-[10px] text-slate-400">{b.date}</div>
                        </div>
                        <button
                          onClick={() => handleUnblock(b.id)}
                          className="text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                        >
                          Desbloquear
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Nenhum usuário bloqueado.</p>
                )}
              </div>

              {/* Section: Legal */}
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <button
                  type="button"
                  onClick={() => setActiveLegalDoc('termos')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <span className="font-medium">Termos de Uso</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLegalDoc('privacidade')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <span className="font-medium">Política de Privacidade</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLegalDoc('diretrizes')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <span className="font-medium">Diretrizes da Comunidade</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Logout */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={onLogout}
                  className="w-full py-3 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
