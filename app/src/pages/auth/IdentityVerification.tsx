import { useNavigate } from 'react-router-dom';

export default function IdentityVerification() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-gutter font-body-md text-on-background relative overflow-hidden bg-surface-container">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full bg-primary-fixed/20 blur-[100px] -translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-secondary-fixed/20 blur-[100px] translate-x-1/4 translate-y-1/4"></div>
      </div>

      <main className="w-full max-w-[640px] bg-surface-container-lowest rounded-[24px] shadow-2xl shadow-primary/5 overflow-hidden border border-outline-variant/30 flex flex-col relative z-10">
        {/* Subtle Top Decoration Line */}
        <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary"></div>
        <div className="p-xl flex flex-col gap-lg">
          {/* Header Section */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
              <span className="font-h3 text-h3 text-primary font-bold tracking-tight">TenantEase</span>
            </div>
            <div className="bg-surface-variant px-md py-sm rounded-full flex items-center gap-xs">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Step 2 of 3</span>
            </div>
          </header>
          {/* Title & Context */}
          <div className="flex flex-col gap-sm mt-sm">
            <h1 className="font-h2 text-h2 text-on-surface">Verify your Identity</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              To maintain a secure environment for all property managers and landlords, we require a quick Aadhaar verification. Your data is encrypted and never shared.
            </p>
          </div>
          {/* Aadhaar Number Input */}
          <div className="flex flex-col gap-sm">
            <label className="font-label-caps text-label-caps text-on-surface uppercase" htmlFor="aadhaar-number">12-Digit Aadhaar Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline">badge</span>
              </div>
              <input className="w-full pl-[48px] pr-md py-md bg-surface border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant tracking-widest outline-none" id="aadhaar-number" maxLength={14} placeholder="0000 0000 0000" type="text" />
            </div>
          </div>
          {/* Drag & Drop Upload Grid */}
          <div className="flex flex-col gap-sm">
            <label className="font-label-caps text-label-caps text-on-surface uppercase">Upload Aadhaar Card</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {/* Front Upload Dropzone */}
              <div className="relative group cursor-pointer h-[160px] border-2 border-dashed border-outline-variant bg-surface rounded-xl flex flex-col items-center justify-center p-md text-center hover:border-primary hover:bg-surface-container-low transition-colors">
                <input accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" type="file" />
                <div className="flex flex-col items-center gap-xs text-outline group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[32px] mb-xs">contact_page</span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">Upload Front</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Drag & drop or browse</span>
                </div>
              </div>
              {/* Back Upload Dropzone */}
              <div className="relative group cursor-pointer h-[160px] border-2 border-dashed border-outline-variant bg-surface rounded-xl flex flex-col items-center justify-center p-md text-center hover:border-primary hover:bg-surface-container-low transition-colors">
                <input accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" type="file" />
                <div className="flex flex-col items-center gap-xs text-outline group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[32px] mb-xs">contact_page</span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">Upload Back</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Drag & drop or browse</span>
                </div>
              </div>
            </div>
          </div>
          {/* Trust & Security Notice */}
          <div className="bg-surface-container-low rounded-lg p-md flex items-start gap-md border border-outline-variant/30">
            <span className="material-symbols-outlined text-secondary-container mt-[2px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <div className="flex flex-col gap-xs">
              <span className="font-body-md text-body-md font-semibold text-on-surface">UIDAI Compliant Security</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-xs leading-relaxed">Your documents are processed with bank-level 256-bit encryption. We do not store your physical document images after verification is complete.</span>
            </div>
          </div>
          {/* Action Area */}
          <div className="mt-sm pt-md border-t border-outline-variant/30 flex flex-col gap-md">
            <button 
              className="w-full bg-gradient-to-r from-primary to-secondary text-on-primary py-[16px] rounded-lg font-body-md text-body-md font-bold shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 active:scale-[0.99] transition-all flex items-center justify-center gap-sm group"
              onClick={() => navigate('/welcome')}
            >
              <span>Verify Identity</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <div className="text-center">
              <a className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors" href="#">I need help with verification</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
