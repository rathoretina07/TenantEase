export default function Analytics() {
  return (
    <div className="max-w-container-max mx-auto w-full flex flex-col gap-lg pb-xl">
      <div className="flex justify-between items-end mb-sm">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-xs">Performance Analytics</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Track your portfolio health and revenue metrics.</p>
        </div>
        <div className="flex bg-surface-container-high rounded-lg p-1 shadow-inner">
          <button className="px-4 py-1.5 rounded-md font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-variant transition-colors">30 Days</button>
          <button className="px-4 py-1.5 rounded-md font-body-sm text-body-sm bg-surface-container-lowest text-primary shadow-sm font-semibold">This Quarter</button>
          <button className="px-4 py-1.5 rounded-md font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-variant transition-colors">YTD</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <div className="bg-surface-container-lowest rounded-xl soft-shadow p-md flex flex-col relative overflow-hidden border border-outline-variant/20">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-primary">
            <span className="material-symbols-outlined text-[64px]">payments</span>
          </div>
          <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-sm">Gross Revenue</span>
          <div className="flex items-baseline gap-sm mb-1">
            <span className="font-h1 text-h1 text-on-surface">₹124,500</span>
            <span className="font-body-sm text-body-sm text-tertiary-container flex items-center bg-tertiary-fixed/30 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> 12.5%
            </span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">vs. previous quarter</span>
        </div>
        <div className="bg-surface-container-lowest rounded-xl soft-shadow p-md flex flex-col relative overflow-hidden border border-outline-variant/20">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-secondary">
            <span className="material-symbols-outlined text-[64px]">domain</span>
          </div>
          <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-sm">Portfolio Occupancy</span>
          <div className="flex items-baseline gap-sm mb-1">
            <span className="font-h1 text-h1 text-on-surface">94.2%</span>
            <span className="font-body-sm text-body-sm text-tertiary-container flex items-center bg-tertiary-fixed/30 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> 2.1%
            </span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">3 units currently vacant</span>
        </div>
        <div className="bg-surface-container-lowest rounded-xl soft-shadow p-md flex flex-col relative overflow-hidden border border-outline-variant/20">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-error">
            <span className="material-symbols-outlined text-[64px]">warning</span>
          </div>
          <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-sm">Outstanding Balances</span>
          <div className="flex items-baseline gap-sm mb-1">
            <span className="font-h1 text-h1 text-on-surface">₹4,250</span>
            <span className="font-body-sm text-body-sm text-error flex items-center bg-error-container/50 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">trending_down</span> 5.4%
            </span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Across 4 active leases</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl soft-shadow p-md border border-outline-variant/20 flex flex-col">
          <div className="flex justify-between items-center mb-lg">
            <h2 className="font-h3 text-h3 text-on-surface">Revenue Trend</h2>
            <button className="w-8 h-8 rounded flex items-center justify-center text-outline hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div className="flex-1 flex items-end gap-2 h-64 mt-auto">
            {[40, 45, 60, 75, 50, 65].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-2 group cursor-pointer">
                <div 
                  className={`w-full ${i === 3 ? 'bg-primary' : 'bg-primary-fixed'} rounded-t-sm group-hover:bg-primary transition-colors relative`}
                  style={{ height: `${height}%` }}
                >
                  {i === 3 && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-caps px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">₹42k</div>
                  )}
                </div>
                <span className={`text-center font-label-caps text-label-caps ${i === 3 ? 'text-on-surface font-semibold' : 'text-outline'}`}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl soft-shadow p-md border border-outline-variant/20 flex flex-col">
          <div className="flex justify-between items-center mb-lg">
            <h2 className="font-h3 text-h3 text-on-surface">Expenses by Category</h2>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-md">
            {[
              { label: 'Maintenance', value: 45, color: 'bg-primary' },
              { label: 'Taxes & Insurance', value: 30, color: 'bg-secondary' },
              { label: 'Utilities', value: 15, color: 'bg-tertiary' },
              { label: 'Other', value: 10, color: 'bg-outline-variant' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-md">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-body-sm text-body-sm text-on-surface">{item.label}</span>
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">{item.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
