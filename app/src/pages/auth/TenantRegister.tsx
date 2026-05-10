import { useNavigate } from 'react-router-dom';

export default function TenantRegister() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen flex text-on-background font-body-md antialiased">
      {/* Left Column: Form Area */}
      <div className="flex-1 flex flex-col justify-center px-lg py-xl sm:px-xl lg:flex-none lg:w-1/2 xl:w-5/12 z-10 bg-surface">
        <div className="mx-auto w-full max-w-md">
          {/* Brand & Header */}
          <div className="mb-xl">
            <div className="flex items-center gap-sm mb-lg cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-body-md" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
              </div>
              <span className="font-h3 text-h3 text-primary tracking-tight">TenantEase</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps mb-md">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Step 1 of 3
            </div>
            <h1 className="font-h1 text-h1 text-on-background mb-sm">Account Creation</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Enter your details to begin setting up your tenant portal.</p>
          </div>
          {/* Registration Form */}
          <form className="space-y-lg" onSubmit={(e) => { e.preventDefault(); navigate('/verify-identity'); }}>
            {/* Full Name */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs ml-1" htmlFor="fullName">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline-variant text-body-md">person</span>
                </div>
                <input className="block w-full pl-10 pr-3 py-3 bg-surface-container-low border-0 text-on-surface rounded-lg shadow-sm ring-1 ring-inset ring-outline-variant focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-surface sm:text-body-sm transition-all outline-none" id="fullName" name="fullName" placeholder="Jane Doe" required type="text" />
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs ml-1" htmlFor="email">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline-variant text-body-md">mail</span>
                </div>
                <input autoComplete="email" className="block w-full pl-10 pr-3 py-3 bg-surface-container-low border-0 text-on-surface rounded-lg shadow-sm ring-1 ring-inset ring-outline-variant focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-surface sm:text-body-sm transition-all outline-none" id="email" name="email" placeholder="jane@example.com" required type="email" />
              </div>
            </div>
            {/* Phone Number */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs ml-1" htmlFor="phone">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline-variant text-body-md">call</span>
                </div>
                <input autoComplete="tel" className="block w-full pl-10 pr-3 py-3 bg-surface-container-low border-0 text-on-surface rounded-lg shadow-sm ring-1 ring-inset ring-outline-variant focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-surface sm:text-body-sm transition-all outline-none" id="phone" name="phone" placeholder="(555) 000-0000" required type="tel" />
              </div>
            </div>
            {/* Password */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs ml-1" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline-variant text-body-md">lock</span>
                </div>
                <input autoComplete="new-password" className="block w-full pl-10 pr-3 py-3 bg-surface-container-low border-0 text-on-surface rounded-lg shadow-sm ring-1 ring-inset ring-outline-variant focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-surface sm:text-body-sm transition-all outline-none" id="password" name="password" placeholder="••••••••" required type="password" />
              </div>
            </div>
            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input className="focus:ring-primary h-4 w-4 text-primary border-outline-variant rounded bg-surface-container-low" id="terms" name="terms" required type="checkbox" />
              </div>
              <div className="ml-3 text-body-sm">
                <label className="font-body-sm text-on-surface-variant" htmlFor="terms">
                  I agree to the <a className="text-primary hover:text-secondary font-medium" href="#">Terms and Conditions</a> and <a className="text-primary hover:text-secondary font-medium" href="#">Privacy Policy</a>.
                </label>
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <button className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-body-md font-semibold text-on-primary bg-gradient-to-r from-primary to-secondary shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 transition-all duration-200 ring-1 ring-inset ring-white/20" type="submit">
                Create Tenant Account
                <span className="material-symbols-outlined text-body-sm">arrow_forward</span>
              </button>
            </div>
          </form>
          <p className="mt-lg text-center font-body-sm text-body-sm text-on-surface-variant">
            Already have an account? <a className="font-semibold text-primary hover:text-secondary transition-colors cursor-pointer" onClick={() => navigate('/login/tenant')}>Log in</a>
          </p>
        </div>
      </div>
      {/* Right Column: Testimonial Visual */}
      <div className="hidden lg:block relative w-0 flex-1 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-surface-container-high">
          <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-multiply" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
          <div className="absolute inset-0 bg-primary/5"></div>
        </div>
        {/* Glassmorphism Testimonial Card */}
        <div className="absolute bottom-xl right-xl left-xl max-w-lg ml-auto">
          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 rounded-2xl p-xl shadow-2xl shadow-primary/10">
            <div className="flex items-center gap-md mb-md">
              <div className="flex text-amber-400">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <p className="font-h3 text-h3 text-on-surface mb-lg relative z-10">
              "TenantEase completely transformed how I manage my lease. Paying rent and submitting maintenance requests is now incredibly smooth and transparent. It's the standard every property should use."
            </p>
            <div className="flex items-center gap-md">
              <img alt="" className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm" src="https://i.pravatar.cc/150?u=sarah" />
              <div>
                <div className="font-body-md font-semibold text-on-surface">Sarah Jenkins</div>
                <div className="font-body-sm text-on-surface-variant">Resident at The Highland</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
