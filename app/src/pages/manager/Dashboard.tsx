import { useNavigate } from 'react-router-dom';

export default function ManagerDashboard() {
  const navigate = useNavigate();
  return (
    <div className="max-w-container-max mx-auto flex flex-col gap-xl pb-xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface">Portfolio Overview</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-sm">Welcome back. Here's what's happening with your properties today.</p>
        </div>
        <div className="flex items-center gap-sm bg-surface-container rounded-lg p-1 shrink-0">
          <button className="px-4 py-1.5 rounded-md bg-surface-container-lowest shadow-sm text-primary font-body-sm text-body-sm font-semibold">30 Days</button>
          <button className="px-4 py-1.5 rounded-md text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">90 Days</button>
          <button className="px-4 py-1.5 rounded-md text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">YTD</button>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-lg soft-shadow flex flex-col justify-between min-h-[140px] group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start">
            <span className="font-body-sm text-body-sm font-semibold text-outline tracking-wide uppercase">Total Revenue</span>
            <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
          </div>
          <div className="flex items-baseline gap-sm mt-auto pt-4">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-sm">
                <h2 className="font-h2 text-h2 text-on-surface">₹1,24,500</h2>
                <div className="flex items-center text-tertiary-fixed-dim bg-tertiary-fixed-dim/10 px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  <span className="font-label-caps text-label-caps ml-1">+12.5%</span>
                </div>
              </div>
              <div className="mt-1 text-outline font-body-sm text-xs">
                Projected: <span className="font-semibold text-on-surface-variant">₹1,32,000</span>
              </div>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-lg soft-shadow flex flex-col justify-between min-h-[140px] group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start">
            <span className="font-body-sm text-body-sm font-semibold text-outline tracking-wide uppercase">Occupancy Rate</span>
            <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary-container group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">apartment</span>
            </div>
          </div>
          <div className="flex items-baseline gap-sm mt-auto pt-4">
            <div className="flex flex-col w-full">
              <div className="flex items-baseline gap-sm mb-2">
                <h2 className="font-h2 text-h2 text-on-surface">94.2%</h2>
                <div className="flex items-center text-tertiary-fixed-dim bg-tertiary-fixed-dim/10 px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  <span className="font-label-caps text-label-caps ml-1">+2.1%</span>
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <div className="bg-surface-container-low px-2 py-1 rounded text-[10px] font-semibold text-secondary">
                  4 Renewals Pending
                </div>
                <div className="bg-error-container px-2 py-1 rounded text-[10px] font-semibold text-error">
                  2 Vacancies (30d)
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-lg soft-shadow flex flex-col justify-between min-h-[140px] group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start">
            <span className="font-body-sm text-body-sm font-semibold text-outline tracking-wide uppercase">Maintenance</span>
            <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">build</span>
            </div>
          </div>
          <div className="flex flex-col mt-auto pt-4">
            <div className="flex items-baseline gap-sm mb-2">
              <h2 className="font-h2 text-h2 text-on-surface">14</h2>
              <span className="font-body-sm text-outline">Open Tickets</span>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="text-[10px] font-bold">3 High</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="text-[10px] font-bold">6 Med</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
                <span className="text-[10px] font-bold">5 Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid for Charts & Complex Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-lg soft-shadow flex flex-col border border-outline-variant/30 relative overflow-hidden min-h-[380px]">
          <div className="flex justify-between items-center mb-lg relative z-10">
            <div>
              <h3 className="font-h3 text-h3 text-on-surface">Revenue Growth</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Monthly collected vs projected</p>
            </div>
            <button className="p-2 hover:bg-surface-container rounded-full text-outline transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div className="flex-1 relative w-full h-full chart-grid-bg mt-sm rounded-lg overflow-hidden flex items-end">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-outline font-label-caps text-label-caps py-4 pr-2 bg-surface-container-lowest/80 backdrop-blur-sm"><span>₹150k</span><span>₹100k</span><span>₹50k</span><span>₹0</span></div>
            <div className="absolute bottom-0 left-12 right-0 flex justify-between text-outline font-label-caps text-label-caps pt-2 border-t border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-sm">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
            <div className="absolute inset-0 left-12 bottom-6 z-0">
              <svg preserveAspectRatio="none" viewBox="0 0 300 100" width="100%" height="100%">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0 80 Q 50 20 100 60 T 200 40 T 300 20 L 300 100 L 0 100 Z" fill="url(#chartGradient)"/>
                <path d="M0 80 Q 50 20 100 60 T 200 40 T 300 20" fill="none" stroke="var(--color-primary)" strokeWidth="3"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Side Column: Donut Chart & Action List */}
        <div className="col-span-1 flex flex-col gap-lg">
          <div className="bg-surface-container-lowest rounded-xl p-lg soft-shadow border border-outline-variant/30 flex-1 flex flex-col">
            <h3 className="font-h3 text-h3 text-on-surface mb-md">Portfolio Distribution</h3>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4"></path>
                  <path className="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="60, 100" stroke-width="4"></path>
                  <path className="text-tertiary-fixed-dim" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="25, 100" stroke-dashoffset="-60" stroke-width="4"></path>
                  <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="15, 100" stroke-dashoffset="-85" stroke-width="4"></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-h2 text-h2 text-on-surface leading-none">32</span>
                  <span className="font-label-caps text-label-caps text-outline">Units</span>
                </div>
              </div>
              <div className="w-full flex justify-center gap-md mt-lg flex-wrap text-center">
                <div className="flex items-center gap-xs">
                  <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">Residential (60%)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-lg soft-shadow border border-outline-variant/30 flex-1 flex flex-col">
            <h3 className="font-h3 text-h3 text-on-surface mb-md">Recent Activity</h3>
            <div className="flex flex-col gap-md">
              <div className="flex gap-sm border-l-2 border-primary pl-3 py-1">
                <div className="flex-1">
                  <p className="font-body-sm text-xs font-semibold text-on-surface">Sarah Jenkins paid rent</p>
                  <p className="text-[10px] text-outline">10 mins ago • Apt 4B, The Highland</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-surface-container-lowest rounded-xl soft-shadow border border-outline-variant/30 overflow-hidden flex flex-col">
        <div className="p-lg border-b border-surface-container-highest flex justify-between items-center bg-surface/50">
          <h3 className="font-h3 text-h3 text-on-surface">Recent Payments</h3>
          <button 
            className="text-primary font-body-sm text-body-sm font-semibold hover:underline"
            onClick={() => navigate('/manager/payments')}
          >
            View All
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-3 px-4 font-label-caps text-label-caps text-outline border-b border-surface-container-highest font-semibold">Tenant</th>
                <th className="pb-3 px-4 font-label-caps text-label-caps text-outline border-b border-surface-container-highest font-semibold">Property</th>
                <th className="pb-3 px-4 font-label-caps text-label-caps text-outline border-b border-surface-container-highest font-semibold">Date</th>
                <th className="pb-3 px-4 font-label-caps text-label-caps text-outline border-b border-surface-container-highest font-semibold">Amount</th>
                <th className="pb-3 px-4 font-label-caps text-label-caps text-outline border-b border-surface-container-highest font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm">
              <tr className="hover:bg-[#F5F3FF] transition-colors group cursor-pointer border-b border-surface-container-highest last:border-0">
                <td className="py-3 px-4 font-medium text-on-surface">Sarah Jenkins</td>
                <td className="py-3 px-4 text-on-surface-variant">Apt 4B, The Highland</td>
                <td className="py-3 px-4 text-outline">Today, 09:41 AM</td>
                <td className="py-3 px-4 font-semibold text-on-surface">₹1,450.00</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#065F46]">Paid</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
