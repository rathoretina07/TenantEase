import { useNavigate } from 'react-router-dom';
import { Building2, Info, MapPin, CircleDollarSign, Image, Upload, Trash2, Plus, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function JoinProperty() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // After property registration completion, route back to the create account page
    navigate('/register-choice');
  };

  return (
    <div className="bg-background font-sans text-on-surface min-h-screen antialiased">
      {/* Marketing Header */}
      <header className="sticky top-0 z-40 flex justify-between items-center px-8 py-4 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center">
            <Building2 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="font-black text-indigo-600 text-lg leading-none">TenantEase</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Landlord Pro</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold"
          >
            Back to Site
          </button>
          <button 
            onClick={() => navigate('/auth-choice')}
            className="bg-slate-100 text-on-surface px-6 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors"
          >
            Log In
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="min-h-screen py-16 px-4">
        <div className="max-w-[1000px] mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <span className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">
              Onboarding Step 1
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight mb-4">Register Your Estate</h1>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              Get started by listing your first property. This will serve as the foundation of your landlord profile.
            </p>
          </div>

          {/* Multi-step Form Content */}
          <form onSubmit={handleSubmit} className="grid gap-6 items-start">
            {/* Left Column: Form Sections */}
            <div className="space-y-6">
              {/* Section 1: Core Information */}
              <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Info className="text-primary-container" size={24} />
                  <h2 className="text-2xl font-bold text-on-surface">Basic Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase">PROPERTY NAME</label>
                    <input 
                      className="w-full bg-slate-50 border-none rounded-lg p-4 text-base focus:ring-2 focus:ring-primary outline-none" 
                      placeholder="e.g. Sunset Heights Apartment" 
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase">PROPERTY TYPE</label>
                    <select className="w-full bg-slate-50 border-none rounded-lg p-4 text-base appearance-none focus:ring-2 focus:ring-primary outline-none">
                      <option>Multi-family Residential</option>
                      <option>Single-family Home</option>
                      <option>Apartment Complex</option>
                      <option>Commercial Plaza</option>
                      <option>Industrial Space</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase">STREET ADDRESS</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
                      <input 
                        className="w-full bg-slate-50 border-none rounded-lg pl-12 p-4 text-base focus:ring-2 focus:ring-primary outline-none" 
                        placeholder="123 Property Lane, Real Estate District" 
                        type="text"
                        required
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Financials & Units */}
              <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CircleDollarSign className="text-primary-container" size={24} />
                  <h2 className="text-2xl font-bold text-on-surface">Configuration & Finance</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase">TOTAL UNITS</label>
                    <input 
                      className="w-full bg-slate-50 border-none rounded-lg p-4 text-base focus:ring-2 focus:ring-primary outline-none" 
                      placeholder="0" 
                      type="number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase">RENT PER UNIT</label>
                    <div className="relative">
                      <span className="absolute left-4 top-4 text-slate-500 font-bold">$</span>
                      <input 
                        className="w-full bg-slate-50 border-none rounded-lg pl-8 p-4 text-base focus:ring-2 focus:ring-primary outline-none" 
                        placeholder="0.00" 
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase">BILLING CYCLE</label>
                    <select className="w-full bg-slate-50 border-none rounded-lg p-4 text-base appearance-none focus:ring-2 focus:ring-primary outline-none">
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Annually</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Section 3: Visual Assets */}
              <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Image className="text-primary-container" size={24} />
                  <h2 className="text-2xl font-bold text-on-surface">Property Photos</h2>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center hover:border-indigo-300 transition-colors cursor-pointer group bg-slate-50/50 relative">
                  <Upload className="mx-auto text-indigo-400 text-5xl mb-4 group-hover:scale-110 transition-transform block" size={48} />
                  <p className="text-xl font-semibold text-on-surface mb-2">Drag and drop images here</p>
                  <p className="text-on-surface-variant text-sm">Or click to browse files from your computer. Max 5MB per image.</p>
                  <input className="absolute inset-0 opacity-0 cursor-pointer" multiple type="file" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="aspect-square bg-slate-100 rounded-lg relative overflow-hidden group">
                    <img 
                      alt="Property Preview" 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9RrEOMKmiuhYoIzfAj87DeHyvXO-4Hk6OpV1Xj8PTl35OGp808CKyKGv_7ydaMM2dwhaSqfL_dIrABmbqh1UoqmOq8Zac9cNagPijTi18rxpPYAfNaniZ2kDnj040mpLsN8ZnnB5hcaFIByWIXxj6Db5O_1jAb9lwfVYuNOO-rzxSmfSqRZb4Maw7l5pQXwfo4qOWwIburcjl8SG-r8cFYYSY6G6Lhbjy0ZChEfAXcBrUYSscXM2-L92psFOpt80ZZlQrZTB1_ac" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Trash2 className="text-white cursor-pointer" size={24} />
                    </div>
                  </div>
                  <div className="aspect-square border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50">
                    <Plus size={32} />
                  </div>
                </div>
              </section>

              {/* Submit Button Section */}
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit"
                  className="px-10 py-4 text-lg font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  Complete Registration
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-container-max mx-auto px-8 text-center text-slate-400 text-sm">
          <p>© 2024 TenantEase Landlord Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
