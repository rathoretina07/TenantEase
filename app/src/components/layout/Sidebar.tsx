import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/authStore';

interface SidebarItem {
  icon: string;
  label: string;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
  type: 'manager' | 'tenant';
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ items, type, isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <aside className={cn(
        "fixed left-0 top-0 h-full flex-col p-4 w-64 border-r border-white/10 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-xl shadow-xl z-50 transition-transform duration-300",
        isOpen ? "translate-x-0 flex" : "-translate-x-full md:translate-x-0 md:flex hidden"
      )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-md mb-lg">
        <div className="flex items-center gap-sm cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>real_estate_agent</span>
          </div>
          <div className="flex flex-col">
            <span className="font-h3 text-h3 text-indigo-600 dark:text-indigo-400 font-black tracking-tight leading-none">TenantEase</span>
            <span className="font-label-caps text-label-caps text-outline mt-xs">
              {type === 'manager' ? 'Landlord Pro' : 'Tenant Portal'}
            </span>
          </div>
        </div>
        <button onClick={onClose} className="md:hidden p-1 text-on-surface-variant hover:bg-surface-container rounded-md">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 flex flex-col gap-xs overflow-y-auto pr-sm">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center gap-sm py-2 px-4 rounded-xl transition-all hover:translate-x-1 group",
              isActive 
                ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                : "text-slate-500 dark:text-slate-400 hover:bg-surface-container-low"
            )}
          >
            <span className={cn(
              "material-symbols-outlined transition-colors",
              "group-hover:text-primary"
            )} style={{ fontVariationSettings: items.indexOf(item) === 0 ? "'FILL' 1" : undefined }}>
              {item.icon}
            </span>
            <span className={cn(
              "font-body-md text-body-md transition-colors",
              "group-hover:text-on-surface"
            )}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* CTA & Footer */}
      <div className="mt-auto pt-lg flex flex-col gap-md">
        {type === 'manager' && (
          <button className="w-full bg-gradient-to-r from-primary to-secondary text-on-primary rounded-lg py-2 px-4 font-body-md text-body-md flex items-center justify-center gap-xs active:opacity-80 transition-all hover:-translate-y-0.5 shadow-md">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Record Payment
          </button>
        )}
        <div className="flex flex-col gap-xs pt-md border-t border-surface-container-highest">
          <a className="flex items-center gap-sm text-slate-500 dark:text-slate-400 py-2 px-4 hover:translate-x-1 transition-transform group rounded-xl hover:bg-surface-container-low" href="#">
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span className="font-body-sm text-body-sm">Help Center</span>
          </a>
          <button 
            className="flex items-center justify-between w-full text-slate-500 dark:text-slate-400 py-2 px-4 hover:translate-x-1 transition-transform group rounded-xl hover:bg-surface-container-low"
            onClick={toggleDarkMode}
          >
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
              <span className="font-body-sm text-body-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
          </button>
          <button 
            className="flex items-center gap-sm text-slate-500 dark:text-slate-400 py-2 px-4 hover:translate-x-1 transition-transform group rounded-xl hover:bg-error-container hover:text-error transition-colors"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="font-body-sm text-body-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
