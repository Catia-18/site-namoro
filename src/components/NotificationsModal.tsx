import React from 'react';
import { AppNotification, AppScreen } from '../types';
import { 
  X, 
  Bell, 
  Heart, 
  Flame, 
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
        return <Flame className="w-4 h-4 text-purple-600 fill-purple-600" />;
      case 'like':
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />;
      case 'message':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-rose-600" />
            <h3 className="font-serif-display text-lg font-bold text-slate-900">
              Notificações
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
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

        {/* List */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onNotificationClick(notif)}
                className={`p-3 rounded-2xl flex items-start gap-3 transition-colors cursor-pointer pt-3 ${
                  !notif.read ? 'bg-rose-50/50' : 'hover:bg-slate-50'
                }`}
              >
                {/* Icon or Avatar */}
                <div className="relative shrink-0 mt-0.5">
                  {notif.avatar ? (
                    <img
                      src={notif.avatar}
                      alt="Avatar"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      {getIcon(notif.type)}
                    </div>
                  )}
                  {!notif.read && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {notif.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug line-clamp-2">
                    {notif.message}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 self-center" />
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              Nenhuma notificação no momento.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <span className="text-[11px] text-slate-400">
            Você será notificado sempre que houver novas interações.
          </span>
        </div>

      </div>
    </div>
  );
};
