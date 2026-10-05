import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, ShieldAlert, Ban, Flag, CheckCircle2, AlertTriangle } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200/80 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h3 className="font-serif-display text-lg font-bold text-slate-900">
              Segurança & Moderação
            </h3>
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
              {activeTab === 'report' ? 'Denúncia enviada com sucesso' : 'Usuário bloqueado'}
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Obrigado por manter o Conecta um ambiente seguro e respeitoso. Nossa equipe de moderação humana analisará o caso em até 1 hora.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-5 text-sm">
            
            {/* Target profile preview */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
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
            <div className="flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('report')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'report' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Denunciar Usuário</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('block')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'block' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
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
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-slate-800 bg-white"
                >
                  <option value="comportamento_inadequado">Comportamento desrespeitoso ou ofensivo</option>
                  <option value="perfil_falso">Perfil falso, fotos roubadas ou bot</option>
                  <option value="assedio">Assédio ou mensagens indesejadas</option>
                  <option value="golpe">Tentativa de golpe financeiro ou spam</option>
                  <option value="menor_idade">Suspeita de menor de idade</option>
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
                    placeholder="Nos ajude com contexto sobre o ocorrido..."
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-slate-800 resize-none"
                  />
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>
                    Sua denúncia é 100% anônima. A pessoa não saberá quem denunciou e será imediatamente bloqueada para você.
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-2">
                <p>Ao bloquear <strong>{targetUser.name}</strong>:</p>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>Você não verá mais este perfil no Descobrir.</li>
                  <li>Essa pessoa não poderá ver seu perfil nem enviar mensagens.</li>
                  <li>Se já houver uma conversa, ela será arquivada e silenciada.</li>
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
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
                className={`px-5 py-2 rounded-xl text-xs font-semibold text-white shadow-md transition-all cursor-pointer ${
                  activeTab === 'report'
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/25'
                    : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'
                }`}
              >
                {activeTab === 'report' ? 'Enviar denúncia e bloquear' : 'Confirmar bloqueio'}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
