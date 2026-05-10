import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen font-sans text-on-background flex antialiased">
      {/* Split Screen Layout */}
      <div className="flex w-full h-screen">
        {/* Left Content Area (Registration Form) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-10 overflow-y-auto relative z-10 bg-surface">
          {/* Logo / Branding */}
          <div className="absolute top-8 left-8 lg:top-10 lg:left-10 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
              <span className="text-2xl font-bold text-primary">TenantEase</span>
            </div>
          </div>

          <div className="w-full max-w-[28rem]">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[12px] font-semibold text-primary tracking-wider uppercase">Step 1 of 3</span>
              </div>
              <div className="flex gap-1 w-full h-1.5 rounded-full bg-surface-variant overflow-hidden">
                <div className="w-1/3 bg-primary rounded-full"></div>
                <div className="w-1/3"></div>
                <div className="w-1/3"></div>
              </div>
            </div>

            {/* Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">Create Account</h1>
              <p className="text-body-md text-on-surface-variant">Join TenantEase to streamline your property management experience.</p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/register-choice'); }}>
              {/* Full Name Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-on-surface ml-1" htmlFor="fullName">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">person</span>
                  <input 
                    className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-surface-container-high rounded-md text-on-surface focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" 
                    id="fullName" 
                    placeholder="Jane Doe" 
                    type="text" 
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-on-surface ml-1" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">mail</span>
                  <input 
                    className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-surface-container-high rounded-md text-on-surface focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" 
                    id="email" 
                    placeholder="jane@example.com" 
                    type="email" 
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-on-surface ml-1" htmlFor="password">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">lock</span>
                  <input 
                    className="w-full pl-10 pr-10 py-2 bg-surface-container-low border border-surface-container-high rounded-md text-on-surface focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password" 
                    required
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface" type="button">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
                <p className="mt-1 text-xs text-on-surface-variant ml-1">Must be at least 8 characters.</p>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 mt-4 ml-1">
                <div className="flex items-center h-5">
                  <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-low" id="terms" type="checkbox" required />
                </div>
                <div className="ml-2">
                  <label className="text-sm text-on-surface-variant" htmlFor="terms">
                    I agree to the <a className="text-primary hover:underline font-medium" href="#">Terms of Service</a> and <a className="text-primary hover:underline font-medium" href="#">Privacy Policy</a>.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary rounded-md text-on-primary font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-2 mt-8 text-xl" 
                type="submit"
              >
                Create Account
                <span className="material-symbols-outlined text-on-primary">arrow_forward</span>
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant">
                Already have an account? <button onClick={() => navigate('/auth-choice')} className="text-primary font-bold hover:underline">Log in</button>
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
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center p-16">
            {/* Floating Glass Card (Abstract UI Representation) */}
            <div className="w-full max-w-[32rem] bg-white/70 backdrop-blur-xl border border-white/40 rounded-xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div>
                  <div className="text-xl font-bold text-on-surface">Effortless Onboarding</div>
                  <div className="text-sm text-on-surface-variant">Get started in minutes, not days.</div>
                </div>
              </div>
              <div className="space-y-4">
                {/* Abstract List Items */}
                <div className="flex items-center gap-3 p-3 rounded-md bg-white/50">
                  <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <div className="h-2 w-32 bg-surface-variant rounded-full"></div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-md bg-white/50">
                  <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <div className="h-2 w-48 bg-surface-variant rounded-full"></div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-md bg-white/50">
                  <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <div className="h-2 w-24 bg-surface-variant rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Testimonial/Value Prop */}
            <div className="mt-16 max-w-[28rem] text-center">
              <p className="text-2xl font-bold text-on-surface mb-6 italic leading-snug">"TenantEase transformed how we handle our portfolio. Everything is transparent and fast."</p>
              <div className="flex items-center justify-center gap-3">
                <img 
                  alt="Sarah Jenkins" 
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH3vK8x5J7HTwP17XcQOKkU4NM4QQpV_4ZA3KkecEwvvP4C_VJWqIYQcr2_AJlZ-kbmrzAUlmDKMLIZZcdnMW7j_XHA3_CE8Kl_y7tsVPTJvE8pbW4zXazPh00EmsHHYPdfU1gLrxieOK-dElxBeVm4AJf-gHujyAwyHePx7gQBZme3Bnpf3SQ_ZlRaNinI-SUH5i49KCDBkfNMbDpxkfeh3z3SeFdtM-ogIPtncjpufEAGA4WJWT0RcA_GpfhJU_K94TUQ89NE1k"
                />
                <div className="text-left">
                  <div className="text-body-md font-bold text-on-surface">Sarah Jenkins</div>
                  <div className="text-sm text-on-surface-variant">Property Manager, Elevate Living</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
