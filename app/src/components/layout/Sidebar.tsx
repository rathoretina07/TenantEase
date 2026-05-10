import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface SidebarItem {
  icon: string;
  label: string;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
  type: 'manager' | 'tenant';
}

export function Sidebar({ items, type }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 h-full flex-col p-4 w-64 border-r border-white/10 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-xl shadow-xl hidden md:flex z-50">
      {/* Header */}
      <div className="flex items-center gap-sm px-4 py-md mb-lg cursor-pointer" onClick={() => navigate('/')}>
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
            className="flex items-center gap-sm text-slate-500 dark:text-slate-400 py-2 px-4 hover:translate-x-1 transition-transform group rounded-xl hover:bg-error-container hover:text-error transition-colors"
            onClick={() => navigate('/')}
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="font-body-sm text-body-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
