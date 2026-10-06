import React, { useState, useEffect, useRef } from 'react';
import { Conversation, UserProfile, ChatMessage } from '../types';
import { 
  Send, 
  Smile, 
  CheckCheck, 
  Check, 
  Search, 
  Info, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck,
  Music,
  BookOpen
} from 'lucide-react';
import { ICEBREAKER_SUGGESTIONS } from '../data/mockData';

interface ChatViewProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string) => void;
  onOpenDetails: (user: UserProfile) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
  onOpenDetails,
}) => {
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    const messageText = inputText.trim();
    setInputText('');
    setShowEmojiPicker(false);
    onSendMessage(activeConversation.id, messageText);

    // Simulate conversational auto-reply after 1.8s
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const partnerName = activeConversation.partner.name.split(' ')[0];
      const replies = [
        `Com certeza, Adilson! Concordo totalmente contigo. Vamos marcar o nosso primeiro date esta semana? 💕`,
        `Que bom saber disso! Fiquei com um sorriso de orelha a orelha ao ler a tua mensagem. 🌹`,
        `Haha adorei! É uma excelente ideia para o nosso date. Que dia fica melhor para ti? ✨`,
        `Que fixe saber disso! O pôr do sol na Ilha é o cenário romântico perfeito para nós. 🌅💕`,
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      onSendMessage(activeConversation.id, `[${partnerName}]: ${randomReply}`);
    }, 1800);
  };

  const handleIcebreakerClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  const filteredConversations = conversations.filter((c) =>
    c.partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 h-[calc(100vh-5rem)] font-sans">
      <div className="bg-white rounded-3xl border border-purple-100 shadow-md overflow-hidden h-full flex flex-col md:flex-row">
        
        {/* Left Column: Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-purple-50 flex flex-col ${
          activeConversationId ? 'hidden md:flex' : 'flex'
        }`}>
          
          {/* Header */}
          <div className="p-4 border-b border-purple-50 bg-purple-50/20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>Conversas</span>
                <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">
                  {conversations.length}
                </span>
              </h2>
            </div>
            
            <div className="relative">
              <Search className="w-4 h-4 text-purple-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Procurar conversas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-2xl bg-purple-50/50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800"
              />
            </div>
          </div>

          {/* Conversations Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-purple-50">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => {
                const isActive = activeConversation?.id === conv.id;
                return (
                  <button
                    key={conv.id}
                    onClick={() => onSelectConversation(conv.id)}
                    className={`w-full p-3.5 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                      isActive ? 'bg-purple-100/60' : 'hover:bg-purple-50/30'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={conv.partner.photos[0]}
                        alt={conv.partner.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-2xl object-cover ring-1 ring-purple-100"
                      />
                      {conv.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                          {conv.partner.name}
                        </span>
                        <span className="text-[10px] text-purple-400 shrink-0 font-medium">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'text-purple-900 font-bold' : 'text-slate-500'}`}>
                        {conv.lastMessage}
                      </p>
                    </div>

                    {conv.unreadCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                Nenhuma conversa encontrada.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Chat Window */}
        {activeConversation ? (
          <div className={`flex-1 flex flex-col bg-[#FAF9FD]/50 ${
            activeConversationId ? 'flex' : 'hidden md:flex'
          }`}>
            
            {/* Header */}
            <div className="p-3.5 sm:px-6 bg-white border-b border-purple-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectConversation('')}
                  className="md:hidden p-1.5 -ml-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div
                  className="relative cursor-pointer shrink-0"
                  onClick={() => onOpenDetails(activeConversation.partner)}
                >
                  <img
                    src={activeConversation.partner.photos[0]}
                    alt={activeConversation.partner.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-2xl object-cover ring-1 ring-purple-100"
                  />
                  {activeConversation.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      onClick={() => onOpenDetails(activeConversation.partner)}
                      className="font-bold text-slate-900 text-sm hover:underline cursor-pointer"
                    >
                      {activeConversation.partner.name}
                    </span>
                    {activeConversation.partner.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                  </div>
                  <span className="text-[11px] text-purple-600 font-medium">
                    {isTyping ? (
                      <span className="text-purple-600 font-bold">a escrever...</span>
                    ) : activeConversation.isOnline ? (
                      'Online agora ✨'
                    ) : (
                      'Visto recentemente'
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onOpenDetails(activeConversation.partner)}
                  className="p-2 rounded-2xl text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
                  title="Ver perfil completo"
                >
                  <Info className="w-4 h-4" />
                  <span className="hidden sm:inline">Perfil</span>
                </button>
              </div>
            </div>

            {/* Icebreaker Suggestions Drawer */}
            <div className="bg-purple-50/60 border-b border-purple-100/60 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
              <span className="text-[11px] font-bold text-purple-700 shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-500" />
                <span>Quebra-gelo:</span>
              </span>
              {ICEBREAKER_SUGGESTIONS.slice(0, 3).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleIcebreakerClick(item)}
                  className="px-2.5 py-1 bg-white hover:bg-purple-100/80 text-purple-900 rounded-xl border border-purple-200/60 whitespace-nowrap transition-colors cursor-pointer text-[11px] font-medium shadow-xs"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeConversation.messages.map((msg) => {
                const isMe = msg.senderId === 'me' || !msg.text.startsWith('[');
                const textContent = msg.text.startsWith('[')
                  ? msg.text.replace(/^\[.*?\]:\s*/, '')
                  : msg.text;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isMe
                          ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-purple-100/80 rounded-bl-xs'
                      }`}
                    >
                      <p>{textContent}</p>
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 px-1 font-medium">
                      <span>{msg.timestamp}</span>
                      {isMe && (
                        <span>
                          {msg.read ? (
                            <CheckCheck className="w-3.5 h-3.5 text-purple-500 inline" />
                          ) : (
                            <Check className="w-3.5 h-3.5 inline" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator bubble */}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-purple-100 w-20 text-purple-400 shadow-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-purple-50 relative">
              {showEmojiPicker && (
                <div className="absolute bottom-full left-4 mb-2 bg-white rounded-2xl border border-purple-100 shadow-xl p-2.5 flex items-center gap-2 animate-in fade-in">
                  {['✨', '💜', '🎧', '⚡', '🛹', '🍕', '🎨', '🎵', '📚', '😊'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => { setInputText((prev) => prev + emoji); setShowEmojiPicker(false); }}
                      className="text-lg hover:scale-125 transition-transform p-1 cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSend} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 text-purple-400 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer"
                >
                  <Smile className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  placeholder="Escreve uma mensagem amigável..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 py-2.5 px-4 text-xs sm:text-sm bg-purple-50/40 rounded-2xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-900"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/20 hover:from-purple-600 hover:to-pink-600 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <p>Seleciona uma conversa para ver as mensagens.</p>
          </div>
        )}

      </div>
    </div>
  );
};
