import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  type: 'manager' | 'tenant';
  userName: string;
  profileImg?: string;
}

export function DashboardLayout({ type, profileImg }: DashboardLayoutProps) {
  const navigate = useNavigate();
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

  return (
    <div className="bg-background text-on-background font-body-sm h-screen w-full overflow-hidden flex selection:bg-primary-container selection:text-on-primary-container">
      <Sidebar items={items} type={type} />
      
      <main className="flex-1 flex flex-col h-full relative md:ml-64 w-full">
        {/* TopNavBar */}
        <header className="sticky top-0 z-40 flex justify-between items-center px-6 py-3 w-full border-b border-white/20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm">
          {/* Mobile Menu Trigger */}
          <button className="md:hidden p-2 -ml-2 text-on-surface rounded-lg hover:bg-surface-container active:scale-95 duration-200">
            <span className="material-symbols-outlined">menu</span>
          </button>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-[28rem] hidden sm:flex">
            <div className="relative w-full group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
              <input className="w-full bg-[#F3F4F6] focus:bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg pl-10 pr-4 py-2 border-transparent focus:border-transparent focus:ring-2 focus:ring-primary-container transition-all placeholder:text-outline placeholder:font-body-sm outline-none" placeholder="Search..." type="text"/>
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
          <div className="flex items-center gap-sm ml-auto">
            <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors rounded-full relative active:scale-95 duration-200">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error border-2 border-white rounded-full"></span>
            </button>
            <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors rounded-full hidden sm:block active:scale-95 duration-200">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="h-8 w-px bg-surface-container-highest mx-2 hidden sm:block"></div>
            <button className="w-9 h-9 rounded-full overflow-hidden border-2 border-surface-container-highest hover:border-primary-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2">
              <img 
                src={profileImg || "https://i.pravatar.cc/150?u=manager1"} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-lg md:p-xl scroll-smooth relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
