import React from 'react';
import { AppNotification, AppScreen } from '../types';
import { 
  X, 
  Bell, 
  Heart, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  CheckCheck,
  ChevronRight
} from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onNotificationClick: (notif: AppNotification) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'match':
        return <Sparkles className="w-4 h-4 text-purple-600 fill-purple-600" />;
      case 'like':
        return <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />;
      case 'message':
        return <MessageCircle className="w-4 h-4 text-sky-500" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="font-display text-base font-bold text-slate-900">
              Notificações
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] font-bold text-purple-600 hover:text-purple-700 transition-colors cursor-pointer"
            >
              Marcar como lidas
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto divide-y divide-purple-50">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onNotificationClick(notif)}
                className={`p-4 flex items-start gap-3 transition-colors cursor-pointer hover:bg-purple-50/40 ${
                  notif.read ? 'bg-white opacity-75' : 'bg-purple-50/20'
                }`}
              >
                <div className="relative shrink-0">
                  {notif.avatar ? (
                    <img
                      src={notif.avatar}
                      alt="Avatar"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-2xl object-cover ring-1 ring-purple-100"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center">
                      {getIcon(notif.type)}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center ring-1 ring-purple-100">
                    {getIcon(notif.type)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-purple-400 font-medium shrink-0">
                      {notif.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 self-center" />
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              Nenhuma notificação nova no momento.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-purple-50/40 border-t border-purple-50 text-center">
          <span className="text-[11px] text-purple-600 font-semibold">
            Conecta Angola · Boas vibes e amizades reais 🇦🇴
          </span>
        </div>

      </div>
    </div>
  );
};
