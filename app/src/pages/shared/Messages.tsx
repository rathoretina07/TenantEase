import { useState } from 'react';
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Image as ImageIcon } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

// Mock Contacts
const contacts = [
  { id: '1', name: 'John Doe', lastMessage: 'The plumbing issue is fixed.', time: '10:42 AM', unread: 2, online: true },
  { id: '2', name: 'Emily Davis', lastMessage: 'When is the rent due?', time: 'Yesterday', unread: 0, online: false },
  { id: '3', name: 'Maintenance Team', lastMessage: 'We will be there by 4 PM.', time: 'Mon', unread: 0, online: true },
];

export default function Messages() {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="h-[calc(100vh-120px)] flex gap-4 max-w-7xl mx-auto">
      {/* Sidebar / Contact List */}
      <Card className="w-full sm:w-80 flex flex-col p-0 overflow-hidden shrink-0 hidden sm:flex">
        <div className="p-4 border-b border-surface-container-highest">
          <h2 className="text-xl font-bold text-on-surface mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <Input placeholder="Search conversations..." className="pl-9 h-10" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div 
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`p-4 border-b border-surface-container-highest cursor-pointer transition-colors flex gap-3
                ${activeContact.id === contact.id ? 'bg-primary-container/10' : 'hover:bg-surface-container-lowest'}`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg">
                  {contact.name.charAt(0)}
                </div>
                {contact.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-on-surface truncate pr-2">{contact.name}</h4>
                  <span className="text-xs text-on-surface-variant whitespace-nowrap">{contact.time}</span>
                </div>
                <p className="text-sm text-on-surface-variant truncate">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-1">
                  {contact.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-surface-container-highest flex justify-between items-center bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg sm:hidden">
              {activeContact.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-on-surface">{activeContact.name}</h3>
              <p className="text-xs text-on-surface-variant flex items-center gap-1">
                {activeContact.online ? (
                  <><span className="w-2 h-2 rounded-full bg-success inline-block"></span> Online</>
                ) : (
                  'Offline'
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-2 text-on-surface-variant">
            <Button variant="ghost" className="p-2 w-10 h-10 rounded-full">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="p-2 w-10 h-10 rounded-full hidden sm:flex">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="p-2 w-10 h-10 rounded-full">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-low/20">
          <div className="text-center my-4">
            <span className="text-xs bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full">Today</span>
          </div>
          
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shrink-0">
              {activeContact.name.charAt(0)}
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl rounded-tl-none p-3 shadow-sm">
              <p className="text-on-surface">{activeContact.lastMessage}</p>
              <p className="text-[10px] text-on-surface-variant text-right mt-1">{activeContact.time}</p>
            </div>
          </div>

          <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
            <div className="bg-primary text-white rounded-2xl rounded-tr-none p-3 shadow-sm">
              <p>Great! Thanks for letting me know.</p>
              <p className="text-[10px] text-white/70 text-right mt-1">10:45 AM</p>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-surface-container-highest bg-surface-container-lowest">
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="p-2 w-10 h-10 rounded-full shrink-0 text-on-surface-variant">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="p-2 w-10 h-10 rounded-full shrink-0 text-on-surface-variant hidden sm:flex">
              <ImageIcon className="w-5 h-5" />
            </Button>
            <Input 
              placeholder="Type a message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-full border-outline-variant focus-visible:ring-1 focus-visible:ring-primary-container h-12 px-4"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setMessage('');
                  // TODO: Send message
                }
              }}
            />
            <Button className="w-12 h-12 rounded-full p-0 shrink-0 flex items-center justify-center">
              <Send className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
