import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface font-body-md antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-lg py-md max-w-container-max mx-auto bg-surface/80 dark:bg-on-background/80 backdrop-blur-lg border-b border-white/20 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-md">
          <span className="text-h2 font-h2 text-primary dark:text-primary-fixed cursor-pointer" onClick={() => navigate('/')}>TenantEase</span>
          <div className="hidden md:flex gap-lg ml-xl">
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Features</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">How it Works</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Testimonials</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Pricing</a>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <button className="px-md py-sm text-primary font-bold active:scale-95 transition-all duration-150" onClick={() => navigate('/auth-choice')}>Login</button>
          <button 
            className="px-lg py-sm primary-gradient text-on-primary rounded-xl font-bold active:scale-95 transition-all duration-150 inner-glow shadow-sm"
            onClick={() => navigate('/register-choice')}
          >
            Sign Up
          </button>
        </div>
      </nav>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="max-w-container-max mx-auto px-lg mb-32">
          <div className="text-center max-w-[48rem] mx-auto mb-xl">
            <h1 className="font-h1 text-[48px] md:text-[64px] leading-tight mb-md text-on-background">Manage your properties with functional elegance</h1>
            <p className="font-body-md text-on-surface-variant mb-xl leading-relaxed">
              The technical precision of a high-performance tool combined with the warmth of hospitality. Streamline your portfolio, payments, and tenant relations in one beautiful interface.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-md">
              <button 
                className="px-xl py-md primary-gradient text-on-primary rounded-xl font-bold text-h3 inner-glow soft-shadow transition-transform hover:-translate-y-1"
                onClick={() => navigate('/register-choice')}
              >
                Get Started for Free
              </button>
              <button className="px-xl py-md bg-surface-container-lowest border border-outline-variant text-on-surface rounded-xl font-bold text-h3 transition-all hover:bg-surface-container">Watch Demo</button>
            </div>
          </div>

          {/* UI Mockup (Glassmorphic Dashboard Preview) */}
          <div className="relative mt-20 max-w-[64rem] mx-auto rounded-xl overflow-hidden soft-shadow bg-surface-container-low border border-outline-variant">
            <div className="flex">
              {/* Sidebar Mockup */}
              <div className="w-16 md:w-64 bg-surface-container border-r border-outline-variant h-[500px] p-md flex flex-col gap-sm">
                <div className="w-10 h-10 primary-gradient rounded-lg mb-md"></div>
                <div className="h-10 bg-surface-container-lowest rounded-lg flex items-center px-sm gap-sm border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary">dashboard</span>
                  <span className="hidden md:block font-body-sm text-on-surface">Dashboard</span>
                </div>
                <div className="h-10 rounded-lg flex items-center px-sm gap-sm">
                  <span className="material-symbols-outlined text-on-surface-variant">apartment</span>
                  <span className="hidden md:block font-body-sm text-on-surface-variant">Properties</span>
                </div>
                <div className="h-10 rounded-lg flex items-center px-sm gap-sm">
                  <span className="material-symbols-outlined text-on-surface-variant">payments</span>
                  <span className="hidden md:block font-body-sm text-on-surface-variant">Rentals</span>
                </div>
              </div>

              {/* Main Content Mockup */}
              <div className="flex-1 p-xl">
                <div className="flex justify-between items-end mb-xl">
                  <div>
                    <h2 className="font-h2 text-on-background">Portfolio Performance</h2>
                    <p className="text-body-sm text-on-surface-variant">Overview for June 2024</p>
                  </div>
                  <div className="flex gap-sm">
                    <div className="w-32 h-10 bg-surface-container-lowest border border-outline-variant rounded-lg"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
                  <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant soft-shadow">
                    <p className="text-label-caps text-on-surface-variant">TOTAL REVENUE</p>
                    <div className="flex items-baseline gap-xs mt-xs">
                      <h2 className="font-h1 text-primary">₹8,45,200</h2>
                      <span className="text-body-sm text-tertiary font-bold">+12%</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant soft-shadow">
                    <p className="text-label-caps text-on-surface-variant">OCCUPANCY</p>
                    <div className="flex items-baseline gap-xs mt-xs">
                      <h2 className="font-h1 text-on-background">94.2%</h2>
                      <span className="text-body-sm text-tertiary font-bold">+2.1%</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant soft-shadow">
                    <p className="text-label-caps text-on-surface-variant">MAINTENANCE</p>
                    <div className="flex items-baseline gap-xs mt-xs">
                      <h2 className="font-h1 text-on-background">3 Open</h2>
                      <span className="text-body-sm text-error font-bold">Alert</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
                  <div className="p-md bg-surface-container-low border-b border-outline-variant flex justify-between">
                    <span className="font-bold">Recent Payments</span>
                    <span className="text-primary font-bold text-body-sm">View All</span>
                  </div>
                  <div className="p-lg">
                    <div className="space-y-md">
                      <div className="flex items-center justify-between py-xs border-b border-outline-variant/30">
                        <div className="flex items-center gap-md">
                          <div className="w-10 h-10 rounded-full bg-surface-container-high"></div>
                          <div>
                            <p className="font-bold">Ananya Sharma</p>
                            <p className="text-body-sm text-on-surface-variant">Flat 402, Skyview</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹45,000</p>
                          <span className="px-sm py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-full uppercase">Paid</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-xs">
                        <div className="flex items-center gap-md">
                          <div className="w-10 h-10 rounded-full bg-surface-container-high"></div>
                          <div>
                            <p className="font-bold">Rahul Verma</p>
                            <p className="text-body-sm text-on-surface-variant">Flat 101, Oak Ridge</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹32,500</p>
                          <span className="px-sm py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase">Processing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Image Overlay for visual interest */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 primary-gradient rounded-full blur-[100px] opacity-20"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-surface-container-low py-32">
          <div className="max-w-container-max mx-auto px-lg">
            <div className="text-center mb-24">
              <span className="text-primary font-bold text-label-caps uppercase tracking-widest">Capabilities</span>
              <h2 className="font-h1 text-[40px] text-on-background mt-sm">Built for high-performance management</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
              <div className="bg-surface-container-lowest p-xl rounded-xl soft-shadow border border-white hover:-translate-y-2 transition-transform">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-lg">
                  <span className="material-symbols-outlined text-primary text-[32px]">account_balance_wallet</span>
                </div>
                <h3 className="font-h3 text-on-background mb-md">Portfolio Overview</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  A centralized command center for your entire property asset portfolio. Track occupancy rates, net yields, and market valuations in real-time.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-xl rounded-xl soft-shadow border border-white hover:-translate-y-2 transition-transform">
                <div className="w-14 h-14 bg-tertiary/10 rounded-xl flex items-center justify-center mb-lg">
                  <span className="material-symbols-outlined text-tertiary text-[32px]">payments</span>
                </div>
                <h3 className="font-h3 text-on-background mb-md">Automated Payments (₹)</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Eliminate the hassle of chasing rent. Our system automates invoicing, receipt generation, and UPI/Bank transfers with instant notifications.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-xl rounded-xl soft-shadow border border-white hover:-translate-y-2 transition-transform">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-lg">
                  <span className="material-symbols-outlined text-secondary text-[32px]">build</span>
                </div>
                <h3 className="font-h3 text-on-background mb-md">Maintenance Triage</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Smart request handling that categorizes issues and assigns local vendors automatically. Keep tenants happy with transparent progress tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 max-w-container-max mx-auto px-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="font-h1 text-[40px] text-on-background mb-xl">Seamlessly transition to modern management</h2>
              <div className="space-y-xl">
                <div className="flex gap-lg">
                  <div className="w-12 h-12 rounded-full primary-gradient text-on-primary flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-h3 text-on-background">Add your properties</h4>
                    <p className="text-on-surface-variant mt-xs">Bulk upload your portfolio details or add them individually. Our intelligent parser extracts data from your existing spreadsheets.</p>
                  </div>
                </div>
                <div className="flex gap-lg">
                  <div className="w-12 h-12 rounded-full primary-gradient text-on-primary flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-h3 text-on-background">Invite your tenants</h4>
                    <p className="text-on-surface-variant mt-xs">Send personalized invitations to your tenants. They get access to a sleek portal for payments and communication.</p>
                  </div>
                </div>
                <div className="flex gap-lg">
                  <div className="w-12 h-12 rounded-full primary-gradient text-on-primary flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-h3 text-on-background">Automate your workflow</h4>
                    <p className="text-on-surface-variant mt-xs">Set your rules for late fees, auto-replies, and vendor assignments. Relax as TenantEase handles the operational heavy lifting.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-surface-container-high rounded-3xl aspect-square overflow-hidden soft-shadow">
                <img 
                  alt="Managing properties effortlessly" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
                />
              </div>
              <div className="absolute -top-12 -left-12 w-48 h-48 glass-effect rounded-2xl p-lg soft-shadow flex flex-col justify-center">
                <span className="material-symbols-outlined text-primary text-[40px] mb-xs">verified</span>
                <p className="font-bold text-on-background">100% Secure</p>
                <p className="text-body-sm text-on-surface-variant">Enterprise Grade</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-32 bg-primary text-on-primary overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <span className="material-symbols-outlined text-[400px] absolute -right-20 -top-20">format_quote</span>
          </div>
          <div className="max-w-container-max mx-auto px-lg relative z-10">
            <div className="max-w-[56rem] mx-auto text-center">
              <div className="flex justify-center gap-xs mb-lg">
                <span className="material-symbols-outlined text-secondary-fixed">star</span>
                <span className="material-symbols-outlined text-secondary-fixed">star</span>
                <span className="material-symbols-outlined text-secondary-fixed">star</span>
                <span className="material-symbols-outlined text-secondary-fixed">star</span>
                <span className="material-symbols-outlined text-secondary-fixed">star</span>
              </div>
              <p className="font-h1 text-[32px] md:text-[40px] leading-snug mb-xl italic">
                "Switching to TenantEase was like moving from a ledger book to a flight deck. We've seen a 40% reduction in late payments and reclaimed hours of administrative time every week."
              </p>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-on-primary mb-md overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=vikas" alt="Vikas Mehta" className="w-full h-full object-cover" />
                </div>
                <p className="font-bold text-h3">Vikas Mehta</p>
                <p className="text-primary-fixed opacity-80 uppercase tracking-widest text-label-caps mt-xs">Operations Director, Elite Residences</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32">
          <div className="max-w-container-max mx-auto px-lg">
            <div className="primary-gradient p-20 rounded-[40px] text-center text-on-primary soft-shadow overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="font-h1 text-[48px] mb-md">Ready to elevate your management experience?</h2>
                <p className="text-h3 opacity-90 mb-xl max-w-[42rem] mx-auto">Join over 500+ property managers who have transformed their portfolio operations with functional elegance.</p>
                <div className="flex flex-col md:flex-row justify-center gap-md">
                  <button 
                    className="px-xl py-md bg-white text-primary rounded-xl font-bold text-h3 soft-shadow transition-transform hover:scale-105"
                    onClick={() => navigate('/register-choice')}
                  >
                    Get Started for Free
                  </button>
                  <button className="px-xl py-md border-2 border-white/30 hover:bg-white/10 rounded-xl font-bold text-h3 transition-all">Talk to Sales</button>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-xl px-lg bg-surface-container-lowest dark:bg-on-background border-t border-outline-variant dark:border-outline">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex flex-col items-center md:items-start gap-xs">
            <span className="text-h3 font-h3 text-primary dark:text-primary-fixed">TenantEase</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant">© 2024 TenantEase. All rights reserved.</p>
          </div>
          <div className="flex gap-lg">
            <a className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed underline transition-all duration-200" href="#">Privacy Policy</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed underline transition-all duration-200" href="#">Terms of Service</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed underline transition-all duration-200" href="#">Contact Us</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed underline transition-all duration-200" href="#">Support</a>
          </div>
          <div className="flex gap-md">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">social_leaderboard</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">alternate_email</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">share</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
