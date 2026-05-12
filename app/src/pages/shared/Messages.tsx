import { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface Message {
  id: string;
  content: string;
  createdAt: string;
  readAt?: string;
  sender: { id: string; profile?: { firstName: string; lastName: string } };
  receiver: { id: string; profile?: { firstName: string; lastName: string } };
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMsg, setNewMsg] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const fetchMessages = () => {
    api.get('/messages')
      .then(r => setMessages(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !receiverId.trim()) return;
    setSending(true);
    setError('');
    try {
      await api.post('/messages', { receiverId, content: newMsg });
      setNewMsg('');
      fetchMessages();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-container-max mx-auto w-full">
      <div className="mb-8">
        <h1 className="font-h1 text-h1 text-on-surface mb-1">Messages</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Communicate with tenants and managers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Message Thread */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant/30 flex flex-col overflow-hidden" style={{ minHeight: 400 }}>
          <div className="p-md border-b border-outline-variant/30">
            <h3 className="font-h3 text-h3 text-on-surface">Conversation</h3>
          </div>
          <div className="flex-1 p-md overflow-y-auto space-y-md" style={{ maxHeight: 400 }}>
            {loading ? (
              <div className="flex items-center justify-center py-xl">
                <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-xl text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl mb-sm block text-outline">chat_bubble</span>
                <p>No messages yet. Send the first one!</p>
              </div>
            ) : (
              messages.map(m => (
                <div key={m.id} className="flex gap-sm">
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary text-sm font-semibold shrink-0">
                    {m.sender?.profile?.firstName?.[0] ?? '?'}
                  </div>
                  <div className="flex-1 bg-surface-container rounded-xl px-md py-sm">
                    <p className="text-xs font-semibold text-primary mb-1">
                      {m.sender?.profile?.firstName} {m.sender?.profile?.lastName}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface">{m.content}</p>
                    <p className="text-[10px] text-outline mt-1">{new Date(m.createdAt).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Send Message */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg flex flex-col gap-md">
          <h3 className="font-h3 text-h3 text-on-surface">Send Message</h3>
          {error && <div className="p-sm rounded-lg bg-error-container text-on-error-container text-sm">{error}</div>}
          <form onSubmit={handleSend} className="flex flex-col gap-md">
            <div>
              <label className="block font-body-sm text-body-sm text-on-surface mb-xs">Recipient Email or User ID</label>
              <input
                className="w-full px-md py-sm rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary outline-none font-body-sm text-body-sm"
                placeholder="e.g. tenant@example.com or user UUID"
                value={receiverId}
                onChange={e => setReceiverId(e.target.value)}
              />
              <p className="text-xs text-outline mt-1">Enter the recipient's email address or User ID from the Tenants section.</p>
            </div>
            <div>
              <label className="block font-body-sm text-body-sm text-on-surface mb-xs">Message</label>
              <textarea
                rows={4}
                className="w-full px-md py-sm rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary outline-none font-body-sm text-body-sm resize-none"
                placeholder="Type your message…"
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={sending || !newMsg.trim() || !receiverId.trim()}
              className="w-full py-sm bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-sm"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              {sending ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
