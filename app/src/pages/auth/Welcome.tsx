import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="font-body-md text-body-md min-h-screen flex flex-col justify-center items-center p-gutter bg-background relative overflow-hidden">
      {/* Main Container */}
      <main className="w-full max-w-[800px] mx-auto bg-surface-container-lowest rounded-[24px] soft-shadow overflow-hidden flex flex-col md:flex-row relative z-10 border border-outline-variant/30">
        {/* Left Side: Image/Celebration */}
        <div className="w-full md:w-5/12 bg-surface-container relative overflow-hidden flex flex-col justify-between p-lg min-h-[300px] md:min-h-full">
          <img 
            alt="Celebratory building" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay" 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/20 mix-blend-multiply"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md mb-md border border-white/30">
              <span className="material-symbols-outlined text-on-primary text-[24px]">verified</span>
            </div>
          </div>
          <div className="relative z-10 mt-auto">
            <h2 className="font-h2 text-h2 text-on-primary mb-sm">Verification Complete!</h2>
            <p className="font-body-sm text-body-sm text-on-primary/90">Your account is fully verified and ready to go. You're now part of the TenantEase community.</p>
          </div>
        </div>

        {/* Right Side: Content & Tasks */}
        <div className="w-full md:w-7/12 p-xl flex flex-col justify-center bg-surface-container-lowest">
          {/* Header */}
          <div className="mb-lg">
            <div className="flex items-center gap-2 mb-xs">
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Step 3 of 3</span>
              <div className="flex-1 h-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full gradient-bg w-full rounded-full"></div>
              </div>
            </div>
            <h1 className="font-h1 text-h1 text-on-surface mb-sm">Welcome aboard</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Just a few quick steps to get your dashboard set up perfectly.</p>
          </div>

          {/* Task List */}
          <div className="space-y-md mb-xl">
            {/* Task 1: Complete Profile */}
            <div className="group flex items-center gap-md p-md rounded-xl hover:bg-surface-container-low transition-colors duration-200 border border-transparent hover:border-outline-variant/30 cursor-pointer">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-[18px]">person</span>
              </div>
              <div>
                <h3 className="font-h3 text-h3 text-on-surface text-[16px]">Complete Profile</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Add your contact details and company information to personalize your account.</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant ml-auto group-hover:text-primary transition-colors">chevron_right</span>
            </div>
            {/* Task 2: Add Property */}
            <div className="group flex items-center gap-md p-md rounded-xl hover:bg-surface-container-low transition-colors duration-200 border border-transparent hover:border-outline-variant/30 cursor-pointer" onClick={() => navigate('/manager/properties')}>
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tertiary-container/10 flex items-center justify-center group-hover:bg-tertiary-container/20 transition-colors">
                <span className="material-symbols-outlined text-tertiary text-[18px]">domain</span>
              </div>
              <div>
                <h3 className="font-h3 text-h3 text-on-surface text-[16px]">Add Your First Property</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Set up your first rental unit to start managing leases and collecting payments.</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant ml-auto group-hover:text-tertiary transition-colors">chevron_right</span>
            </div>
            {/* Task 3: Invite Tenant */}
            <div className="group flex items-center gap-md p-md rounded-xl hover:bg-surface-container-low transition-colors duration-200 border border-transparent hover:border-outline-variant/30 cursor-pointer">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary-container/10 flex items-center justify-center group-hover:bg-secondary-container/20 transition-colors">
                <span className="material-symbols-outlined text-secondary text-[18px]">group_add</span>
              </div>
              <div>
                <h3 className="font-h3 text-h3 text-on-surface text-[16px]">Invite a Tenant</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Send an invitation to your tenant so they can access their dedicated portal.</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant ml-auto group-hover:text-secondary transition-colors">chevron_right</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-lg border-t border-outline-variant/20 flex flex-col sm:flex-row gap-md items-center">
            <button 
              className="w-full sm:w-auto gradient-bg text-on-primary font-body-md text-body-md py-3 px-6 rounded-lg shadow-sm hover:opacity-90 transition-opacity border border-white/10 flex items-center justify-center gap-2"
              onClick={() => navigate('/manager/dashboard')}
            >
              Enter Dashboard
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <button 
              className="w-full sm:w-auto text-primary font-body-sm text-body-sm py-3 px-6 rounded-lg hover:bg-primary/5 transition-colors"
              onClick={() => navigate('/manager/dashboard')}
            >
              Skip for now
            </button>
          </div>
        </div>
      </main>

      {/* Background Decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-secondary/5 blur-3xl"></div>
      </div>
    </div>
  );
}
