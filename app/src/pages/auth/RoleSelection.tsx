import { useNavigate } from 'react-router-dom';

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="bg-background font-body-md text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <main className="min-h-screen flex items-center justify-center p-md md:p-xl overflow-hidden relative">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="w-full max-w-container-max grid grid-cols-1 lg:grid-cols-2 gap-lg items-center relative z-10">
          {/* Left Branding Column */}
          <div className="hidden lg:flex flex-col space-y-lg pr-xl">
            <div className="flex items-center gap-sm cursor-pointer" onClick={() => navigate('/')}>
              <span className="material-symbols-outlined text-[40px] text-primary">real_estate_agent</span>
              <span className="font-h2 text-h2 text-primary">TenantEase</span>
            </div>
            <h1 className="font-h1 text-h1 text-on-background max-w-[28rem]">
              Seamless property management for the <span className="text-primary">modern world.</span>
            </h1>
            <p className="text-on-surface-variant font-body-md max-w-[24rem]">
              A unified platform designed to bridge the gap between landlords and tenants with transparency and efficiency.
            </p>
            <div className="flex flex-col gap-md pt-md">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                </div>
                <div>
                  <p className="font-h3 text-body-md font-bold">Secure Infrastructure</p>
                  <p className="text-body-sm text-on-surface-variant">Bank-grade encryption for all transactions.</p>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">bolt</span>
                </div>
                <div>
                  <p className="font-h3 text-body-md font-bold">Real-time Operations</p>
                  <p className="text-body-sm text-on-surface-variant">Instant notifications and automated workflows.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Authentication Column */}
          <div className="flex flex-col items-center">
            <div className="glass-panel w-full max-w-[520px] rounded-[24px] shadow-2xl p-lg md:p-xl flex flex-col space-y-xl">
              {/* Header Mobile Only */}
              <div className="flex lg:hidden flex-col items-center gap-sm mb-md">
                <span className="material-symbols-outlined text-[48px] text-primary">real_estate_agent</span>
                <span className="font-h2 text-h2 text-primary">TenantEase</span>
              </div>
              <div className="text-center space-y-xs">
                <h2 className="font-h2 text-h2 text-on-background">Welcome Back</h2>
                <p className="text-body-md text-on-surface-variant">Please select your portal to continue</p>
              </div>

              {/* Role Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {/* Landlord Card */}
                <button 
                  className="group flex flex-col items-center p-lg rounded-xl border border-outline-variant bg-surface hover:border-primary hover:bg-surface-container-low transition-all duration-300 active:scale-[0.98]"
                  onClick={() => navigate('/login/landlord')}
                >
                  <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-[32px]">apartment</span>
                  </div>
                  <span className="font-h3 text-body-md font-bold text-on-background">Login as Landlord</span>
                  <span className="text-body-sm text-on-surface-variant text-center mt-xs">Manage properties and rent collection</span>
                </button>
                {/* Tenant Card */}
                <button 
                  className="group flex flex-col items-center p-lg rounded-xl border border-outline-variant bg-surface hover:border-primary hover:bg-surface-container-low transition-all duration-300 active:scale-[0.98]"
                  onClick={() => navigate('/login/tenant')}
                >
                  <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-secondary text-[32px]">person_pin_circle</span>
                  </div>
                  <span className="font-h3 text-body-md font-bold text-on-background">Login as Tenant</span>
                  <span className="text-body-sm text-on-surface-variant text-center mt-xs">Pay rent and request maintenance</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative py-md">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant"></div>
                </div>
                <div className="relative flex justify-center text-label-caps bg-surface px-md uppercase text-outline">
                  New to a property?
                </div>
              </div>

              {/* Sign Up Path */}
              <div className="space-y-lg">
                <div className="text-center">
                  <h3 className="font-h3 text-body-md font-bold text-on-background">Sign Up under a Property</h3>
                  <p className="text-body-sm text-on-surface-variant mt-xs">Enter your invitation details provided by your manager.</p>
                </div>
                <form className="space-y-md" onSubmit={(e) => { e.preventDefault(); navigate('/register/tenant'); }}>
                  <div className="space-y-xs">
                    <label className="text-label-caps text-on-surface-variant ml-sm">Building Name or Landlord Code</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">pin_drop</span>
                      <input className="w-full pl-xl pr-md py-md bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-body-md outline-none" placeholder="e.g. SKY-102-L" type="text"/>
                    </div>
                  </div>
                  <button className="w-full primary-gradient inner-glow py-md rounded-xl text-white font-bold text-body-md hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97] transition-all flex items-center justify-center gap-sm" type="submit">
                    Find Property
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </form>
              </div>

              {/* Footer Help Links */}
              <div className="flex flex-col items-center gap-md pt-md">
                <p className="text-body-sm text-on-surface-variant">
                  New to TenantEase? 
                  <button onClick={() => navigate('/register-choice')} className="ml-1 text-primary hover:underline font-bold">Create Account</button>
                </p>
                <div className="flex justify-center gap-lg">
                  <a className="text-body-sm text-primary hover:underline font-medium" href="#">Need help?</a>
                  <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
                </div>
              </div>
            </div>

            {/* Testimonial / Social Proof Mini Card */}
            <div className="mt-lg w-full max-w-[520px] bg-white/40 rounded-xl p-md border border-white/20 flex items-center gap-md">
              <img 
                alt="User Avatar" 
                className="w-12 h-12 rounded-full border-2 border-white" 
                src="https://i.pravatar.cc/150?u=manager1" 
              />
              <p className="text-body-sm text-on-surface-variant italic">
                "TenantEase reduced our payment processing time by 60% in the first month. Highly recommended."
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <footer className="w-full py-xl px-lg flex flex-col md:flex-row justify-between items-center gap-md max-w-container-max mx-auto bg-surface-container-lowest dark:bg-on-background border-t border-outline-variant">
        <div className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-primary">real_estate_agent</span>
          <span className="font-h3 text-h3 text-primary">TenantEase</span>
        </div>
        <div className="flex flex-wrap justify-center gap-lg">
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary underline transition-all duration-200" href="#">Privacy Policy</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary underline transition-all duration-200" href="#">Terms of Service</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary underline transition-all duration-200" href="#">Contact Us</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary underline transition-all duration-200" href="#">Support</a>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 TenantEase. All rights reserved.</p>
      </footer>
    </div>
  );
}
