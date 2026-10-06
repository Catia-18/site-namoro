import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, ShieldAlert, Ban, Flag, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser?: UserProfile | null;
  onConfirmBlockOrReport: (action: 'block' | 'report', reason: string) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetUser,
  onConfirmBlockOrReport,
}) => {
  const [activeTab, setActiveTab] = useState<'report' | 'block'>('report');
  const [reason, setReason] = useState('comportamento_inadequado');
  const [details, setDetails] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !targetUser) return null;

  const handleAction = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onConfirmBlockOrReport(activeTab, reason);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-purple-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900">
                Segurança & Proteção Jovem
              </h3>
              <p className="text-[11px] text-purple-600 font-semibold">Comunidade segura e sem assédio 🛡️</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3 animate-in fade-in">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-base text-slate-900">
              {activeTab === 'report' ? 'Denúncia enviada com sucesso' : 'Utilizador bloqueado'}
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Obrigado por ajudares a manter o Conecta um ambiente amigável, seguro e acolhedor para jovens em Angola.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-5 text-sm">
            
            {/* Target profile preview */}
            <div className="flex items-center gap-3 p-3 bg-purple-50/40 rounded-2xl border border-purple-100">
              <img
                src={targetUser.photos[0]}
                alt={targetUser.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {targetUser.name}, {targetUser.age}
                </h4>
                <p className="text-xs text-slate-500">{targetUser.occupation}</p>
              </div>
            </div>

            {/* Tab switch between report and block */}
            <div className="flex p-1 bg-purple-50/60 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('report')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'report' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Denunciar Perfil</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('block')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'block' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Apenas Bloquear</span>
              </button>
            </div>

            {activeTab === 'report' ? (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Qual é o motivo da denúncia?
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 bg-white"
                >
                  <option value="comportamento_inadequado">Comportamento desrespeitoso ou inapropriado</option>
                  <option value="conteudo_adulto">Tentativa de partilhar conteúdo adulto não permitido</option>
                  <option value="perfil_falso">Perfil falso ou fotos de outra pessoa</option>
                  <option value="bullying">Bullying, provocação ou ofensas</option>
                  <option value="spam">Spam ou mensagens repetitivas</option>
                  <option value="outro">Outro motivo</option>
                </select>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Detalhes adicionais (opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Conta-nos o que aconteceu para intervirmos..."
                    className="w-full p-2.5 text-xs rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 resize-none bg-white"
                  />
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200/60 rounded-xl text-[11px] text-purple-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-purple-600 mt-0.5" />
                  <span>
                    A tua denúncia é 100% anónima. A outra pessoa não saberá e o perfil será imediatamente ocultado para ti.
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-purple-50/40 border border-purple-100 rounded-2xl text-xs text-slate-600 space-y-2">
                <p>Ao bloquear <strong>{targetUser.name}</strong>:</p>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>Não verás mais este utilizador no Descobrir.</li>
                  <li>Esta pessoa não poderá ver o teu perfil nem enviar mensagens.</li>
                  <li>Qualquer conversa existente será ocultada.</li>
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-purple-50">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAction}
                className={`px-5 py-2 rounded-2xl text-xs font-bold text-white shadow-md transition-all cursor-pointer ${
                  activeTab === 'report'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 shadow-purple-600/25'
                    : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'
                }`}
              >
                {activeTab === 'report' ? 'Enviar denúncia e proteger' : 'Confirmar bloqueio'}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
