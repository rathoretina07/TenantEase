export default function Properties() {
  return (
    <div className="max-w-container-max mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-1">Properties</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Manage your portfolio and track occupancy.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-lg border border-outline-variant/30 text-on-surface hover:bg-surface-variant transition-colors shadow-sm">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            <span className="font-body-sm text-body-sm font-medium">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-medium shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
            <span className="material-symbols-outlined text-sm">add</span>
            <span className="font-body-sm text-body-sm">Add Property</span>
          </button>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter pb-12">
        {/* Property Card 1 */}
        <article className="group bg-surface-container-lowest rounded-xl flex flex-col border border-outline-variant/20 shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] hover:shadow-[0_12px_30px_-8px_rgba(53,37,205,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="relative h-48 w-full overflow-hidden">
            <img alt="Modern home exterior" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" />
            <div className="absolute top-3 left-3">
              <span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface border border-outline-variant/20 rounded-full px-3 py-1 font-label-caps text-label-caps shadow-sm">Multi-Family</span>
            </div>
          </div>
          <div className="p-md flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="font-h3 text-h3 text-on-surface leading-tight mb-1">1248 Oakwood Ave</h2>
                <p className="font-body-sm text-body-sm text-outline">Portland, OR 97204</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">bed</span> 4
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">bathtub</span> 2.5
              </div>
            </div>
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-surface-variant">
              <div>
                <span className="font-h2 text-h2 text-primary tracking-tight">₹3,200</span>
                <span className="font-body-sm text-body-sm text-outline">/mo</span>
              </div>
              <span className="bg-tertiary-container text-on-tertiary-container rounded-full px-3 py-1 font-label-caps text-label-caps flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span> Occupied
              </span>
            </div>
          </div>
        </article>
        
        {/* Property Card 2 */}
        <article className="group bg-surface-container-lowest rounded-xl flex flex-col border border-outline-variant/20 shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] hover:shadow-[0_12px_30px_-8px_rgba(53,37,205,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="relative h-48 w-full overflow-hidden">
            <img alt="Luxury mansion exterior" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" />
            <div className="absolute top-3 left-3">
              <span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface border border-outline-variant/20 rounded-full px-3 py-1 font-label-caps text-label-caps shadow-sm">Single Family</span>
            </div>
          </div>
          <div className="p-md flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="font-h3 text-h3 text-on-surface leading-tight mb-1">890 Highland Dr</h2>
                <p className="font-body-sm text-body-sm text-outline">Austin, TX 78701</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">bed</span> 5
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">bathtub</span> 4
              </div>
            </div>
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-surface-variant">
              <div>
                <span className="font-h2 text-h2 text-primary tracking-tight">₹5,500</span>
                <span className="font-body-sm text-body-sm text-outline">/mo</span>
              </div>
              <span className="bg-surface-variant text-on-surface-variant rounded-full px-3 py-1 font-label-caps text-label-caps flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Vacant
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
