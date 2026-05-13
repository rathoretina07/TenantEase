import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../../store/authStore';

interface DashboardLayoutProps {
  type: 'manager' | 'tenant';
  userName?: string;
  profileImg?: string;
}

const mockNotifications = [
  { id: 1, icon: 'payments', color: 'text-green-500', title: 'Payment Received', body: 'Rent payment from Unit 2A was received.', time: '2m ago', unread: true },
  { id: 2, icon: 'warning', color: 'text-amber-500', title: 'Payment Overdue', body: 'Unit 3B rent is 5 days overdue.', time: '1h ago', unread: true },
  { id: 3, icon: 'person_add', color: 'text-blue-500', title: 'New Tenant Joined', body: 'A new tenant joined Sunset Apartments.', time: '3h ago', unread: false },
  { id: 4, icon: 'mail', color: 'text-purple-500', title: 'New Message', body: 'You have a new message from Sarah.', time: '1d ago', unread: false },
];

export function DashboardLayout({ type }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const managerItems = [
    { icon: 'dashboard', label: 'Dashboard', href: '/manager/dashboard' },
    { icon: 'domain', label: 'Properties', href: '/manager/properties' },
    { icon: 'group', label: 'Tenants', href: '/manager/tenants' },
    { icon: 'payments', label: 'Payments', href: '/manager/payments' },
    { icon: 'leaderboard', label: 'Analytics', href: '/manager/analytics' },
    { icon: 'chat', label: 'Messages', href: '/manager/messages' },
  ];

  const tenantItems = [
    { icon: 'dashboard', label: 'Dashboard', href: '/tenant/dashboard' },
    { icon: 'payments', label: 'My Payments', href: '/tenant/payments' },
    { icon: 'chat', label: 'Messages', href: '/tenant/messages' },
    { icon: 'person', label: 'Profile', href: '/tenant/profile' },
  ];

  const items = type === 'manager' ? managerItems : tenantItems;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(mockNotifications);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Focus search input when shown
  useEffect(() => {
    if (showSearch) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [showSearch]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Search quick links
  const allLinks = type === 'manager' ? managerItems : tenantItems;
  const searchResults = searchQuery.trim()
    ? allLinks.filter(l => l.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const displayName = user?.name || (type === 'manager' ? 'Manager' : 'Tenant');
  const avatarUrl = user?.profileImg || `https://i.pravatar.cc/150?u=${user?.id || 'default'}`;
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="bg-background text-on-background font-body-sm h-screen w-full overflow-hidden flex selection:bg-primary-container selection:text-on-primary-container">
      <Sidebar items={items} type={type} isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <main className="flex-1 flex flex-col h-full relative md:ml-64 w-full">
        {/* TopNavBar */}
        <header className="sticky top-0 z-40 flex justify-between items-center px-4 sm:px-6 py-3 w-full border-b border-surface-container-highest dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm transition-colors">
          {/* Mobile Menu Trigger */}
          <button 
            className="md:hidden p-2 -ml-2 text-on-surface rounded-lg hover:bg-surface-container active:scale-95 duration-200"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-[28rem] hidden sm:flex">
            <div className="relative w-full group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
              <input 
                className="w-full bg-surface-container dark:bg-slate-800 focus:bg-surface-container-lowest dark:focus:bg-slate-700 text-on-surface dark:text-slate-200 font-body-sm text-body-sm rounded-lg pl-10 pr-4 py-2 border border-transparent focus:border-primary/30 focus:ring-2 focus:ring-primary-container transition-all placeholder:text-outline outline-none cursor-pointer" 
                placeholder="Search pages…" 
                type="text"
                readOnly
                onClick={() => setShowSearch(true)}
              />
            </div>
          </div>
          
          <div className="flex-1 sm:hidden flex justify-center">
            <span 
              className="font-h3 text-h3 text-indigo-600 dark:text-indigo-400 font-bold tracking-tight cursor-pointer"
              onClick={() => navigate('/')}
            >
              TenantEase
            </span>
          </div>

          {/* Trailing Actions */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Search (mobile) */}
            <button
              className="sm:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors rounded-full active:scale-95 duration-200"
              onClick={() => setShowSearch(true)}
            >
              <span className="material-symbols-outlined">search</span>
            </button>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button 
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors rounded-full relative active:scale-95 duration-200"
                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
              >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center">
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-outline-variant/30 dark:border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/20 dark:border-slate-700">
                    <h3 className="font-semibold text-on-surface dark:text-slate-200">Notifications</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors cursor-pointer ${n.unread ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
                        <div className={`w-9 h-9 rounded-full bg-surface-container dark:bg-slate-800 flex items-center justify-center shrink-0 ${n.color}`}>
                          <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-on-surface dark:text-slate-200">{n.title}</p>
                          <p className="text-xs text-on-surface-variant dark:text-slate-400 truncate">{n.body}</p>
                          <p className="text-[10px] text-outline mt-0.5">{n.time}</p>
                        </div>
                        {n.unread && <div className="w-2 h-2 rounded-full bg-primary mt-1 shrink-0" />}
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-outline-variant/20 dark:border-slate-700 text-center">
                    <button className="text-xs text-primary hover:underline">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-surface-container-highest dark:bg-slate-700 mx-1 hidden sm:block"></div>

            {/* Profile Avatar Dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-surface-container-highest dark:border-slate-700 hover:border-primary-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2"
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
              >
                {user?.profileImg ? (
                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                    {initials}
                  </div>
                )}
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-outline-variant/30 dark:border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-outline-variant/20 dark:border-slate-700">
                    <p className="font-semibold text-sm text-on-surface dark:text-slate-200">{displayName}</p>
                    <p className="text-xs text-outline truncate">{user?.email}</p>
                    <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase">
                      {type === 'manager' ? 'Manager' : 'Tenant'}
                    </span>
                  </div>
                  <div className="py-1">
                    {type === 'tenant' && (
                      <button
                        onClick={() => { navigate('/tenant/profile'); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">person</span>
                        My Profile
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const isDark = document.documentElement.classList.contains('dark');
                        if (isDark) {
                          document.documentElement.classList.remove('dark');
                          localStorage.setItem('tenantease_theme', 'light');
                        } else {
                          document.documentElement.classList.add('dark');
                          localStorage.setItem('tenantease_theme', 'dark');
                        }
                        setShowProfileMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                      Toggle Dark Mode
                    </button>
                    <button
                      onClick={() => { navigate('/contact'); setShowProfileMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">help</span>
                      Help & Support
                    </button>
                    <div className="my-1 border-t border-outline-variant/20 dark:border-slate-700" />
                    <button
                      onClick={() => { logout(); navigate('/'); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error-container/30 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 scroll-smooth relative">
          <Outlet />
        </div>
      </main>

      {/* Search Modal Overlay */}
      {showSearch && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-start justify-center pt-20 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowSearch(false); }}
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-outline-variant/30 dark:border-slate-700">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-outline-variant/20 dark:border-slate-700">
              <span className="material-symbols-outlined text-outline">search</span>
              <input
                ref={searchRef}
                className="flex-1 bg-transparent text-on-surface dark:text-slate-200 outline-none font-body-md text-body-md placeholder:text-outline"
                placeholder="Search pages…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Escape') setShowSearch(false);
                  if (e.key === 'Enter' && searchResults.length > 0) {
                    navigate(searchResults[0].href);
                    setShowSearch(false);
                    setSearchQuery('');
                  }
                }}
              />
              <button onClick={() => setShowSearch(false)} className="text-outline hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto py-2">
              {searchQuery.trim() === '' ? (
                <div>
                  <p className="px-4 py-2 text-xs text-outline font-semibold uppercase tracking-wider">Quick Links</p>
                  {allLinks.map(link => (
                    <button
                      key={link.href}
                      onClick={() => { navigate(link.href); setShowSearch(false); setSearchQuery(''); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-on-surface dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="material-symbols-outlined text-primary text-[20px]">{link.icon}</span>
                      <span className="font-body-md text-body-md">{link.label}</span>
                    </button>
                  ))}
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map(link => (
                  <button
                    key={link.href}
                    onClick={() => { navigate(link.href); setShowSearch(false); setSearchQuery(''); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-on-surface dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="material-symbols-outlined text-primary text-[20px]">{link.icon}</span>
                    <span className="font-body-md text-body-md">{link.label}</span>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-outline">
                  <span className="material-symbols-outlined text-4xl mb-2 block">search_off</span>
                  <p className="text-sm">No pages found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
