import { useNavigate } from 'react-router-dom';

export default function LandlordRegister() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen font-body-md text-on-background flex antialiased">
      {/* Split Screen Layout */}
      <div className="flex w-full h-screen">
        {/* Left Content Area (Registration Form) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-gutter lg:p-xl overflow-y-auto relative z-10 bg-surface">
          {/* Logo / Branding */}
          <div className="absolute top-8 left-8 lg:top-xl lg:left-xl">
            <div className="flex items-center gap-sm cursor-pointer" onClick={() => navigate('/')}>
              <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
              <span className="font-h2 text-h2 text-primary">TenantEase</span>
            </div>
          </div>
          <div className="w-full max-w-md">
            {/* Progress Indicator */}
            <div className="mb-lg">
              <div className="flex items-center gap-2 mb-sm">
                <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase">Step 1 of 3</span>
              </div>
              <div className="flex gap-xs w-full h-1.5 rounded-full bg-surface-variant overflow-hidden">
                <div className="w-1/3 bg-primary rounded-full"></div>
                <div className="w-1/3"></div>
                <div className="w-1/3"></div>
              </div>
            </div>
            {/* Header */}
            <div className="mb-xl">
              <h1 className="font-h1 text-h1 text-on-surface mb-sm">Create Account</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Join TenantEase to streamline your property management experience.</p>
            </div>
            {/* Form */}
            <form className="space-y-lg" onSubmit={(e) => { e.preventDefault(); navigate('/verify-identity'); }}>
              {/* Full Name Field */}
              <div>
                <label className="block font-body-sm text-body-sm text-on-surface mb-xs" htmlFor="fullName">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline-variant">person</span>
                  <input className="w-full pl-xl pr-md py-sm bg-surface-container-low border border-surface-container-high rounded-DEFAULT text-on-surface focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md outline-none" id="fullName" placeholder="Jane Doe" type="text" required />
                </div>
              </div>
              {/* Email Field */}
              <div>
                <label className="block font-body-sm text-body-sm text-on-surface mb-xs" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline-variant">mail</span>
                  <input className="w-full pl-xl pr-md py-sm bg-surface-container-low border border-surface-container-high rounded-DEFAULT text-on-surface focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md outline-none" id="email" placeholder="jane@example.com" type="email" required />
                </div>
              </div>
              {/* Password Field */}
              <div>
                <label className="block font-body-sm text-body-sm text-on-surface mb-xs" htmlFor="password">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline-variant">lock</span>
                  <input className="w-full pl-xl pr-md py-sm bg-surface-container-low border border-surface-container-high rounded-DEFAULT text-on-surface focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md outline-none" id="password" placeholder="••••••••" type="password" required />
                  <button className="absolute right-sm top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface" type="button">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
                <p className="mt-xs font-body-sm text-body-sm text-on-surface-variant text-sm">Must be at least 8 characters.</p>
              </div>
              {/* Terms Checkbox */}
              <div className="flex items-start gap-sm mt-md">
                <div className="flex items-center h-5">
                  <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-low" id="terms" type="checkbox" required />
                </div>
                <div className="ml-2">
                  <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="terms">
                    I agree to the <a className="text-primary hover:underline font-medium" href="#">Terms of Service</a> and <a className="text-primary hover:underline font-medium" href="#">Privacy Policy</a>.
                  </label>
                </div>
              </div>
              {/* Submit Button */}
              <button className="w-full py-md px-lg bg-gradient-to-r from-primary to-secondary rounded-DEFAULT text-on-primary font-h3 text-h3 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-sm mt-xl" type="submit">
                Create Account
                <span className="material-symbols-outlined text-on-primary">arrow_forward</span>
              </button>
            </form>
            {/* Footer Links */}
            <div className="mt-xl text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Already have an account? <a className="text-primary font-medium hover:underline cursor-pointer" onClick={() => navigate('/login/landlord')}>Log in</a>
              </p>
            </div>
          </div>
        </div>
        {/* Right Visual Area (Hidden on Mobile) */}
        <div className="hidden lg:block lg:w-1/2 relative bg-surface-container-low overflow-hidden">
          {/* Ambient Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low to-surface-variant opacity-80 z-0"></div>
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-[120px] z-0"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-secondary/5 blur-[120px] z-0"></div>
          {/* Content Container */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center p-xl">
            {/* Floating Glass Card (Abstract UI Representation) */}
            <div className="w-full max-w-lg bg-white/70 backdrop-blur-xl border border-white/40 rounded-xl shadow-[0_32px_64px_-16px_rgba(53,37,205,0.1)] p-lg transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="flex items-center gap-md mb-lg">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
                </div>
                <div>
                  <div className="font-h3 text-h3 text-on-surface">Effortless Onboarding</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Get started in minutes, not days.</div>
                </div>
              </div>
              <div className="space-y-sm">
                <div className="flex items-center gap-sm p-sm rounded-DEFAULT bg-white/50">
                  <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                  <div className="h-2 w-32 bg-surface-variant rounded-full"></div>
                </div>
                <div className="flex items-center gap-sm p-sm rounded-DEFAULT bg-white/50">
                  <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                  <div className="h-2 w-48 bg-surface-variant rounded-full"></div>
                </div>
                <div className="flex items-center gap-sm p-sm rounded-DEFAULT bg-white/50">
                  <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                  <div className="h-2 w-24 bg-surface-variant rounded-full"></div>
                </div>
              </div>
            </div>
            {/* Testimonial/Value Prop */}
            <div className="mt-xl max-w-md text-center">
              <p className="font-h2 text-h2 text-on-surface mb-md">"TenantEase transformed how we handle our portfolio. Everything is transparent and fast."</p>
              <div className="flex items-center justify-center gap-sm">
                <img alt="Sarah Jenkins" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://i.pravatar.cc/150?u=sarah" />
                <div className="text-left">
                  <div className="font-body-md text-body-md text-on-surface">Sarah Jenkins</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Property Manager, Elevate Living</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
