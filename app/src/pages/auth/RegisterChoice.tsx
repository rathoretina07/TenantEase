import { useNavigate } from 'react-router-dom';
import { Building2, UserRound, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function RegisterChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-sans text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed overflow-hidden relative flex items-center justify-center p-md md:p-xl">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] right-[-5%] w-128 h-128 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-container-max grid grid-cols-1 lg:grid-cols-2 gap-xl items-center relative z-10 mx-auto px-lg">
        {/* Left Branding Column */}
        <div className="hidden lg:flex flex-col justify-center space-y-xl pr-xl">
          <div className="space-y-lg max-w-[36rem]">
            <div className="flex items-center gap-sm cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center">
                <Building2 className="text-primary" size={32} />
              </div>
              <span className="text-3xl font-bold text-primary">TenantEase</span>
            </div>
            
            <div className="space-y-lg">
              <h1 className="text-6xl font-bold text-on-background leading-[1.1] tracking-tight">
                Start your journey with <span className="text-primary">TenantEase.</span>
              </h1>
              <div className="w-full">
                <p className="text-xl text-on-surface-variant leading-relaxed max-w-[28rem]">
                  Choose the account type that fits your needs and join a community of modern property managers and happy residents.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-lg pt-md max-w-[32rem]">
            <div className="flex items-start gap-md">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                <ShieldCheck className="text-primary" size={24} />
              </div>
              <div>
                <p className="font-bold text-lg text-on-surface">Verified Properties</p>
                <p className="text-on-surface-variant leading-relaxed">Every listing and landlord on our platform undergoes a rigorous verification process.</p>
              </div>
            </div>
            <div className="flex items-start gap-md">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                <Zap className="text-primary" size={24} />
              </div>
              <div>
                <p className="font-bold text-lg text-on-surface">Instant Onboarding</p>
                <p className="text-on-surface-variant leading-relaxed">Get your account set up and start managing or paying rent in under 5 minutes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Authentication Column */}
        <div className="flex flex-col items-center w-full">
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 w-full max-w-[520px] rounded-[24px] shadow-2xl p-lg md:p-xl flex flex-col space-y-xl">
            <div className="text-center space-y-xs">
              <h2 className="text-4xl font-bold text-on-background tracking-tight">Create Account</h2>
              <p className="text-lg text-on-surface-variant">Select your role to get started</p>
            </div>

            {/* Role Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {/* Landlord Card */}
              <button 
                onClick={() => navigate('/register/landlord')}
                className="group flex flex-col items-center p-lg rounded-xl border border-outline-variant bg-surface hover:border-primary hover:bg-surface-container-low transition-all duration-300 active:scale-[0.98]"
              >
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                  <Building2 className="text-primary" size={32} />
                </div>
                <span className="text-xl font-bold text-on-background">As Landlord</span>
                <span className="text-body-sm text-on-surface-variant text-center mt-xs">List properties and collect rent</span>
              </button>

              {/* Tenant Card */}
              <button 
                onClick={() => navigate('/register/tenant')}
                className="group flex flex-col items-center p-lg rounded-xl border border-outline-variant bg-surface hover:border-primary hover:bg-surface-container-low transition-all duration-300 active:scale-[0.98]"
              >
                <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                  <UserRound className="text-secondary" size={32} />
                </div>
                <span className="text-xl font-bold text-on-background">As Tenant</span>
                <span className="text-body-sm text-on-surface-variant text-center mt-xs">Rent properties and pay online</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative py-md">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative flex justify-center text-label-caps bg-white/0 px-md uppercase text-outline font-semibold">
                Invited by a Landlord?
              </div>
            </div>

            {/* Quick Find */}
            <div className="space-y-md">
              <div className="space-y-xs text-center">
                <p className="text-body-md text-on-surface-variant">Enter your unique property code to join an existing building.</p>
              </div>
              <div className="relative">
                <input 
                  className="w-full pl-md pr-md py-md bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-body-md outline-none" 
                  placeholder="Enter building code (e.g. SKY-102)" 
                  type="text"
                />
              </div>
              <Button 
                className="w-full py-4 rounded-xl gap-sm" 
                onClick={() => navigate('/register/tenant')}
              >
                Join Property
                <ArrowRight size={20} />
              </Button>
            </div>

            {/* Footer */}
            <div className="text-center pt-md">
              <p className="text-body-sm text-on-surface-variant">
                Already have an account? 
                <button 
                  onClick={() => navigate('/auth-choice')}
                  className="ml-1 font-bold text-primary hover:underline"
                >
                  Log in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
