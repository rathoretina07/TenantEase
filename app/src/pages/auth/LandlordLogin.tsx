import { useNavigate } from 'react-router-dom';

export default function LandlordLogin() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background min-h-screen flex font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      <div className="hidden lg:flex lg:w-1/2 relative bg-surface-variant overflow-hidden items-end p-xl">
        <img alt="Real estate interior" className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" />
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent mix-blend-multiply"></div>
        <div className="relative z-10 w-full max-w-[32rem]">
          <div className="flex items-center gap-sm mb-lg">
            <span className="material-symbols-outlined text-primary-fixed text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
            <span className="font-h2 text-h2 text-on-primary">TenantEase</span>
          </div>
          <p className="font-h1 text-h1 text-on-primary mb-md">Manage your properties with functional elegance.</p>
          <p className="font-body-md text-body-md text-surface-container-low/80">Experience the technical precision of a high-performance tool combined with the warmth of hospitality.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-gutter sm:p-xl bg-surface">
        <div className="w-full max-w-[28rem]">
          <div className="flex items-center justify-center gap-sm mb-xl lg:hidden cursor-pointer" onClick={() => navigate('/')}>
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
            <span className="font-h3 text-h3 text-on-surface">TenantEase</span>
          </div>
          <div className="mb-xl text-center flex flex-col items-center">
            <h1 className="font-h2 text-h2 text-on-surface mb-xs">Welcome back</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Please enter your details to sign in.</p>
          </div>
          <form className="flex flex-col gap-lg" onSubmit={(e) => { e.preventDefault(); navigate('/manager/dashboard'); }}>
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="email">Email address</label>
              <div className="relative">
                <span className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">mail</span>
                <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-md pl-[48px] pr-md font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow shadow-sm outline-none" id="email" placeholder="manager@teanantease.com" type="email" required />
              </div>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="password">Password</label>
              <div className="relative">
                <span className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">lock</span>
                <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-md pl-[48px] pr-md font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow shadow-sm outline-none" id="password" placeholder="••••••••" type="password" required />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-sm cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input className="peer appearance-none w-5 h-5 border-2 border-outline rounded-[4px] checked:bg-primary checked:border-primary transition-colors cursor-pointer focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface" type="checkbox" />
                  <span className="material-symbols-outlined absolute text-[16px] text-on-primary opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Remember for 30 days</span>
              </label>
              <a className="font-body-sm text-body-sm text-primary hover:text-primary-container font-semibold transition-colors" href="#">Forgot password?</a>
            </div>
            <button className="w-full bg-primary hover:bg-primary-container text-on-primary font-body-md text-body-md py-md rounded-lg shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-sm" type="submit">
              Sign in
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </form>
          <div className="mt-lg relative flex items-center">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="flex-shrink-0 mx-md font-body-sm text-body-sm text-on-surface-variant">Or continue with</span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>
          <div className="mt-lg grid grid-cols-2 gap-md">
            <button className="flex items-center justify-center gap-sm w-full bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant text-on-surface font-body-md text-body-md py-sm px-md rounded-lg transition-colors shadow-sm" type="button">
              <span className="material-symbols-outlined text-[20px]">language</span>
              Google
            </button>
            <button className="flex items-center justify-center gap-sm w-full bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant text-on-surface font-body-md text-body-md py-sm px-md rounded-lg transition-colors shadow-sm" type="button">
              <span className="material-symbols-outlined text-[20px]">devices</span>
              Apple
            </button>
          </div>
          <p className="mt-xl text-center font-body-sm text-body-sm text-on-surface-variant">
            Don't have an account? 
            <a className="text-primary hover:text-primary-container font-semibold transition-colors cursor-pointer" onClick={() => navigate('/register/landlord')}>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
