import { useEffect, useState, useRef } from 'react';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  content: string;
  createdAt: string;
  readAt?: string;
  sender: { id: string; profile?: { firstName: string; lastName: string } };
  receiver: { id: string; profile?: { firstName: string; lastName: string } };
}

interface Tenant {
  id: string;
  email: string;
  profile?: { firstName: string; lastName: string };
}

export default function Messages() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMsg, setNewMsg] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = () => {
    api.get('/messages')
      .then(r => setMessages(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
    // If manager, also load tenants for dropdown
    if (user?.role === 'manager') {
      api.get('/tenants')
        .then(r => setTenants(r.data))
        .catch(console.error);
    }
  }, [user?.role]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !receiverId.trim()) return;
    setSending(true);
    try {
      await api.post('/messages', { receiverId, content: newMsg });
      setNewMsg('');
      fetchMessages();
      toast.success('Message sent!');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  // Group messages into "mine" vs "others" based on sender
  const myId = user?.id;

  const selectedTenantName = tenants.find(t => t.id === receiverId)
    ? `${tenants.find(t => t.id === receiverId)?.profile?.firstName ?? ''} ${tenants.find(t => t.id === receiverId)?.profile?.lastName ?? ''}`.trim()
    : '';

  return (
    <div className="max-w-container-max mx-auto w-full flex flex-col gap-lg h-full">
      <div>
        <h1 className="font-h1 text-h1 text-on-surface dark:text-white mb-1">Messages</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">Communicate with {user?.role === 'manager' ? 'tenants' : 'your manager'}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg" style={{ minHeight: 520 }}>
        {/* Message Thread */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-800/80 rounded-2xl border border-outline-variant/30 dark:border-slate-700 flex flex-col overflow-hidden shadow-sm">
          {/* Thread Header */}
          <div className="p-md border-b border-outline-variant/30 dark:border-slate-700 flex items-center gap-sm bg-surface/50 dark:bg-slate-900/50">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-sm">
              {selectedTenantName ? selectedTenantName[0] : <span className="material-symbols-outlined text-[18px]">chat</span>}
            </div>
            <div>
              <h3 className="font-semibold text-on-surface dark:text-white text-sm">
                {selectedTenantName || 'Conversation'}
              </h3>
              <p className="text-xs text-outline">{messages.length} messages</p>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-md space-y-sm" style={{ maxHeight: 380 }}>
            {loading ? (
              <div className="flex items-center justify-center py-xl">
                <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-xl text-on-surface-variant dark:text-slate-400 flex flex-col items-center">
                <span className="material-symbols-outlined text-6xl mb-sm text-outline">chat_bubble</span>
                <p className="font-body-md text-body-md">No messages yet</p>
                <p className="font-body-sm text-body-sm text-outline">Send the first message below</p>
              </div>
            ) : (
              <>
                {messages.map(m => {
                  const isMine = m.sender?.id === myId;
                  const senderName = m.sender?.profile
                    ? `${m.sender.profile.firstName} ${m.sender.profile.lastName}`
                    : 'Unknown';
                  const initial = senderName[0] ?? '?';
                  return (
                    <div key={m.id} className={`flex gap-sm ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                      {!isMine && (
                        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary text-sm font-semibold shrink-0">
                          {initial}
                        </div>
                      )}
                      <div className={`max-w-[70%] flex flex-col gap-0.5 ${isMine ? 'items-end' : 'items-start'}`}>
                        {!isMine && (
                          <p className="text-xs font-semibold text-primary px-1">{senderName}</p>
                        )}
                        <div className={`px-md py-sm rounded-2xl shadow-sm ${
                          isMine
                            ? 'bg-gradient-to-br from-primary to-secondary text-on-primary rounded-br-sm'
                            : 'bg-surface-container dark:bg-slate-700 text-on-surface dark:text-slate-200 rounded-bl-sm'
                        }`}>
                          <p className="font-body-sm text-body-sm leading-relaxed">{m.content}</p>
                        </div>
                        <p className={`text-[10px] text-outline px-1 ${isMine ? 'text-right' : 'text-left'}`}>
                          {new Date(m.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                          {' · '}
                          {new Date(m.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        {/* Send Message Panel */}
        <div className="bg-surface-container-lowest dark:bg-slate-800/80 rounded-2xl border border-outline-variant/30 dark:border-slate-700 p-lg flex flex-col gap-md shadow-sm">
          <h3 className="font-h3 text-h3 text-on-surface dark:text-white">New Message</h3>
          <form onSubmit={handleSend} className="flex flex-col gap-md flex-1">
            {/* Recipient */}
            <div>
              <label className="block font-body-sm text-body-sm text-on-surface dark:text-slate-200 mb-xs">
                {user?.role === 'manager' ? 'Send To (Tenant)' : 'Recipient ID'}
              </label>
              {user?.role === 'manager' && tenants.length > 0 ? (
                <select
                  className="w-full px-md py-sm rounded-lg bg-surface-container-low dark:bg-slate-700 border border-outline-variant dark:border-slate-600 focus:border-primary outline-none font-body-sm text-body-sm text-on-surface dark:text-slate-200"
                  value={receiverId}
                  onChange={e => setReceiverId(e.target.value)}
                  required
                >
                  <option value="">Select a tenant…</option>
                  {tenants.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.profile ? `${t.profile.firstName} ${t.profile.lastName}` : t.email}
                    </option>
                  ))}
                </select>
              ) : (
                <>
                  <input
                    className="w-full px-md py-sm rounded-lg bg-surface-container-low dark:bg-slate-700 border border-outline-variant dark:border-slate-600 focus:border-primary outline-none font-body-sm text-body-sm text-on-surface dark:text-slate-200"
                    placeholder="Recipient email or user ID"
                    value={receiverId}
                    onChange={e => setReceiverId(e.target.value)}
                  />
                  <p className="text-xs text-outline mt-1">Enter the recipient's email address or User ID.</p>
                </>
              )}
            </div>

            {/* Message */}
            <div className="flex-1 flex flex-col">
              <label className="block font-body-sm text-body-sm text-on-surface dark:text-slate-200 mb-xs">Message</label>
              <textarea
                rows={5}
                className="flex-1 w-full px-md py-sm rounded-lg bg-surface-container-low dark:bg-slate-700 border border-outline-variant dark:border-slate-600 focus:border-primary outline-none font-body-sm text-body-sm resize-none text-on-surface dark:text-slate-200"
                placeholder="Type your message…"
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handleSend(e as any);
                  }
                }}
              />
              <p className="text-xs text-outline mt-1">Press Ctrl+Enter to send quickly</p>
            </div>

            <button
              type="submit"
              disabled={sending || !newMsg.trim() || !receiverId.trim()}
              className="w-full py-sm bg-gradient-to-r from-primary to-secondary text-on-primary rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-sm shadow-md"
            >
              <span className="material-symbols-outlined text-sm">{sending ? 'progress_activity' : 'send'}</span>
              {sending ? 'Sending…' : 'Send Message'}
            </button>
          </form>

          {/* Refresh */}
          <button
            onClick={fetchMessages}
            className="w-full py-sm rounded-lg border border-outline-variant dark:border-slate-600 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-700 transition-colors font-body-sm text-body-sm flex items-center justify-center gap-sm"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Refresh Messages
          </button>
        </div>
      </div>
    </div>
  );
}
