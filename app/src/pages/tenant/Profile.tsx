export default function TenantProfile() {
  return (
    <div className="max-w-container-max mx-auto w-full space-y-xl pb-xl">
      {/* Page Header / Profile Quick Look */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-lg bg-surface-container-lowest p-lg rounded-xl shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] border border-outline-variant/20">
        <div className="flex items-center gap-lg">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-container relative">
            <img alt="Tenant Avatar" className="w-full h-full object-cover" src="https://i.pravatar.cc/150?u=sarah" />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#10b981] border-2 border-white rounded-full flex items-center justify-center" title="Active"></div>
          </div>
          <div>
            <h1 className="font-h1 text-h1 text-on-surface">Sarah Jenkins</h1>
            <div className="flex items-center gap-sm mt-1 text-on-surface-variant font-body-md text-body-md">
              <span className="material-symbols-outlined text-outline text-lg">location_on</span>
              Unit 4B, The Grandville
            </div>
          </div>
        </div>
        <div className="flex gap-md w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-lg py-2 rounded-lg bg-surface border border-outline-variant text-on-surface font-body-md text-body-md font-medium hover:bg-surface-variant transition-colors flex items-center justify-center gap-sm">
            <span className="material-symbols-outlined text-lg">mail</span> Message
          </button>
          <button className="flex-1 sm:flex-none px-lg py-2 rounded-lg bg-primary-container text-on-primary font-body-md text-body-md font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-sm">
            <span className="material-symbols-outlined text-lg">edit</span> Edit Profile
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Personal Info Card */}
        <div className="col-span-1 lg:col-span-4 bg-surface-container-lowest rounded-xl p-lg shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] border border-outline-variant/20 flex flex-col gap-lg">
          <h2 className="font-h3 text-h3 text-on-surface flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary">person</span> Personal Details
          </h2>
          <div className="space-y-md">
            <div>
              <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Email Address</div>
              <div className="font-body-md text-body-md text-on-surface flex items-center gap-sm">
                sarah.j.design@example.com
                <span className="material-symbols-outlined text-primary cursor-pointer text-sm hover:opacity-70">content_copy</span>
              </div>
            </div>
            <div className="h-px w-full bg-outline-variant/20"></div>
            <div>
              <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Phone Number</div>
              <div className="font-body-md text-body-md text-on-surface">(555) 123-4567</div>
            </div>
            <div className="h-px w-full bg-outline-variant/20"></div>
            <div>
              <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Emergency Contact</div>
              <div className="font-body-md text-body-md text-on-surface">Michael Jenkins (Brother)</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">(555) 987-6543</div>
            </div>
          </div>
        </div>

        {/* Lease Details & Stats */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-lg">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-lg">
            <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] border border-outline-variant/20">
              <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-2">Monthly Rent</div>
              <div className="font-h2 text-h2 text-on-surface">₹1,850</div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] border border-outline-variant/20">
              <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-2">Security Deposit</div>
              <div className="font-h2 text-h2 text-on-surface">₹2,000 <span className="font-body-sm text-body-sm text-tertiary-container ml-1 bg-tertiary-fixed px-2 py-1 rounded-full">Held</span></div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] border border-outline-variant/20">
              <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-2">Lease Status</div>
              <div className="font-h2 text-h2 text-[#059669]">Active</div>
            </div>
          </div>

          {/* Lease Details Card */}
          <div className="flex-1 bg-surface-container-lowest rounded-xl p-lg shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] border border-outline-variant/20">
            <div className="flex justify-between items-center mb-lg">
              <h2 className="font-h3 text-h3 text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">description</span> Lease Agreement
              </h2>
              <button className="text-primary font-body-sm text-body-sm font-medium hover:underline flex items-center gap-xs">
                View Document <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-lg gap-x-xl">
              <div>
                <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Start Date</div>
                <div className="font-body-md text-body-md text-on-surface">September 1, 2023</div>
              </div>
              <div>
                <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">End Date</div>
                <div className="font-body-md text-body-md text-on-surface">August 31, 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
