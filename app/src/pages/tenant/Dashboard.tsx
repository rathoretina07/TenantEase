import { useNavigate } from 'react-router-dom';

export default function TenantDashboard() {
  const navigate = useNavigate();
  return (
    <div className="max-w-container-max mx-auto flex flex-col gap-xl pb-xl">
      {/* Page Header (Handled by DashboardLayout partially, but we can customize) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md mb-lg">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface">Welcome home, Sarah</h1>
          <div className="flex items-center gap-sm text-on-surface-variant font-body-md text-body-md">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <p>Apt 4B, 123 Main St, Springfield</p>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Rent Due Card (Prominent) */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(53,37,205,0.06)] p-lg flex flex-col justify-between relative overflow-hidden border border-outline-variant/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-lg">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-sm">Current Balance</p>
                <h3 className="font-h1 text-h1 text-on-surface tracking-tight">₹1,450.00</h3>
              </div>
              <div className="bg-error-container text-on-error-container font-label-caps text-label-caps px-3 py-1.5 rounded-full flex items-center gap-xs">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                Due in 3 days
              </div>
            </div>
            <div className="space-y-xs mb-xl">
              <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant py-2 border-b border-surface-variant/50">
                <span>Base Rent</span>
                <span className="font-medium text-on-surface">₹1,400.00</span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant py-2 border-b border-surface-variant/50">
                <span>Utilities (Water/Trash)</span>
                <span className="font-medium text-on-surface">₹50.00</span>
              </div>
            </div>
          </div>
          <button 
            className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-primary to-secondary text-on-primary font-body-md text-body-md font-semibold py-4 px-6 flex items-center justify-center gap-sm shadow-md transition-transform active:scale-[0.98] z-10 group"
            onClick={() => navigate('/tenant/payments')}
          >
            <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">payment</span>
            Pay Now
          </button>
        </div>

        {/* Maintenance Card */}
        <div className="bg-surface-container-low rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-lg flex flex-col items-center justify-center text-center border border-surface-variant/50">
          <div className="w-16 h-16 rounded-full bg-secondary-fixed/50 flex items-center justify-center mb-md shadow-inner">
            <span className="material-symbols-outlined text-[32px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>build</span>
          </div>
          <h3 className="font-h3 text-h3 text-on-surface mb-xs">Maintenance</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">Need a repair? Submit a request and track its progress.</p>
          <button className="w-full bg-surface-container-lowest border border-outline-variant text-primary font-body-md text-body-md font-medium py-3 px-4 rounded-lg hover:bg-surface-variant transition-colors flex items-center justify-center gap-sm">
            <span className="material-symbols-outlined text-[20px]">add_task</span>
            Report an Issue
          </button>
        </div>

        {/* Recent Payments */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/30 flex flex-col">
          <div className="p-lg border-b border-surface-variant flex justify-between items-center">
            <h3 className="font-h3 text-h3 text-on-surface">Recent Payments</h3>
            <button 
              className="font-body-sm text-body-sm text-primary hover:underline flex items-center gap-xs"
              onClick={() => navigate('/tenant/payments')}
            >
              View All
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          <div className="p-4 flex-1">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr className="text-on-surface-variant border-b border-surface-variant">
                  <th className="pb-3 pl-4 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 pr-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-on-surface">
                <tr className="hover:bg-primary-fixed/10 transition-colors group">
                  <td className="py-4 pl-4 rounded-l-lg">Oct 1, 2023</td>
                  <td className="py-4">October Rent + Utilities</td>
                  <td className="py-4 font-medium">₹1,450.00</td>
                  <td className="py-4 pr-4 rounded-r-lg text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full font-label-caps text-label-caps bg-tertiary/10 text-tertiary">Paid</span>
                  </td>
                </tr>
                <tr className="hover:bg-primary-fixed/10 transition-colors group">
                  <td className="py-4 pl-4 rounded-l-lg">Sep 1, 2023</td>
                  <td className="py-4">September Rent + Utilities</td>
                  <td className="py-4 font-medium">₹1,450.00</td>
                  <td className="py-4 pr-4 rounded-r-lg text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full font-label-caps text-label-caps bg-tertiary/10 text-tertiary">Paid</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* My Documents */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/30 flex flex-col">
          <div className="p-lg border-b border-surface-variant">
            <h3 className="font-h3 text-h3 text-on-surface">My Documents</h3>
          </div>
          <div className="p-lg flex-1 flex flex-col gap-md">
            <a className="flex items-center p-md rounded-lg border border-outline-variant/50 hover:bg-surface-container-low hover:border-primary/30 transition-all group" href="#">
              <div className="w-10 h-10 rounded bg-primary-fixed flex items-center justify-center mr-md text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
              </div>
              <div className="flex-1">
                <h4 className="font-body-md text-body-md font-medium text-on-surface group-hover:text-primary transition-colors">Lease Agreement</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">PDF • 2.4 MB</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">download</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
