import { useNavigate } from 'react-router-dom';

export default function TenantLogin() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen">
      <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full font-body-md">
        {/* Left Panel: Architectural Photo */}
        <div className="hidden md:block relative h-full w-full bg-surface-variant overflow-hidden">
          <img alt="" className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" />
          {/* Subtle Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent flex flex-col justify-end p-xl">
            <div className="max-w-[28rem]">
              <h2 className="font-h2 text-h2 text-on-primary mb-sm">Your Home, Managed Effortlessly.</h2>
              <p className="font-body-md text-body-md text-on-primary/80">Access your lease details, submit maintenance requests, and pay rent securely—all from one elegant dashboard.</p>
            </div>
          </div>
        </div>
        {/* Right Panel: Login Form */}
        <div className="flex flex-col justify-center items-center px-lg py-xl sm:px-xl h-full w-full bg-surface">
          <div className="w-full max-w-[24rem] flex flex-col gap-lg">
            {/* Header */}
            <div className="text-center flex flex-col items-center gap-sm">
              <div className="flex items-center gap-sm mb-xs cursor-pointer" onClick={() => navigate('/')}>
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>apartment</span>
                <h1 className="font-h3 text-h3 text-primary">TenantEase</h1>
              </div>
              <h2 className="font-h1 text-h1 text-on-surface">Welcome back</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Please enter your details to sign in to your tenant portal.</p>
            </div>
            {/* Social Logins */}
            <div className="flex flex-col gap-sm">
              <button className="w-full flex items-center justify-center gap-sm py-sm px-md rounded-lg border border-outline-variant bg-surface hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" type="button">
                {/* Simulated Google Icon */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="font-body-md text-body-md text-on-surface">Log in with Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-sm py-sm px-md rounded-lg border border-outline-variant bg-surface hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" type="button">
                {/* Simulated Apple Icon */}
                <span className="material-symbols-outlined text-on-surface" style={{ fontVariationSettings: "'FILL' 1" }}>laptop_mac</span>
                <span className="font-body-md text-body-md text-on-surface">Log in with Apple</span>
              </button>
            </div>
            {/* Divider */}
            <div className="flex items-center gap-md">
              <div className="h-px bg-outline-variant flex-1"></div>
              <span className="font-label-caps text-label-caps text-outline">OR</span>
              <div className="h-px bg-outline-variant flex-1"></div>
            </div>
            {/* Form */}
            <form className="flex flex-col gap-md" onSubmit={(e) => { e.preventDefault(); navigate('/tenant/dashboard'); }}>
              {/* Email Field */}
              <div className="flex flex-col gap-xs">
                <label className="font-body-sm text-body-sm font-medium text-on-surface" htmlFor="email">Email</label>
                <input className="w-full px-md py-sm rounded-lg bg-surface-container-low border-transparent focus:bg-surface focus:border-transparent focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline transition-all font-body-md text-body-md outline-none" id="email" placeholder="Enter your email" required type="email" />
              </div>
              {/* Password Field */}
              <div className="flex flex-col gap-xs">
                <label className="font-body-sm text-body-sm font-medium text-on-surface" htmlFor="password">Password</label>
                <input className="w-full px-md py-sm rounded-lg bg-surface-container-low border-transparent focus:bg-surface focus:border-transparent focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline transition-all font-body-md text-body-md outline-none" id="password" placeholder="••••••••" required type="password" />
              </div>
              {/* Options Row */}
              <div className="flex items-center justify-between mt-xs">
                <label className="flex items-center gap-sm cursor-pointer group">
                  <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-background bg-surface-container-low cursor-pointer" type="checkbox" />
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Remember me</span>
                </label>
                <a className="font-body-sm text-body-sm font-medium text-primary hover:text-primary-container transition-colors" href="#">Forgot password?</a>
              </div>
              {/* Submit Button */}
              <button className="w-full mt-sm py-sm px-lg rounded-lg bg-gradient-to-r from-primary to-secondary text-on-primary font-body-md text-body-md font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" type="submit">
                Sign In
              </button>
            </form>
            {/* Footer */}
            <div className="text-center mt-sm">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Don't have an account? 
                <a className="font-medium text-primary hover:text-primary-container transition-colors cursor-pointer" onClick={() => navigate('/register/tenant')}>Sign up as a tenant</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
