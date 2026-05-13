import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { toast } from 'react-hot-toast';

interface TenantPayment {
  id: string;
  amount: number;
  status: string;
  dueDate: string;
  paidDate?: string;
  lease?: { unit?: { unitNumber: string; property?: { name: string; address?: string } } };
}

export default function TenantDashboard() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<TenantPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState({ issue: '', description: '', urgency: 'NORMAL' });
  const [submittingMaintenance, setSubmittingMaintenance] = useState(false);

  useEffect(() => {
    api.get('/payments/my')
      .then(r => setPayments(r.data))
      .catch(() => api.get('/payments').then(r => setPayments(r.data)).catch(console.error))
      .finally(() => setLoading(false));
  }, []);

  const pendingPayment = payments.find(p => p.status === 'PENDING' || p.status === 'OVERDUE');
  const recentPayments = payments.slice(0, 3);

  const daysUntilDue = pendingPayment
    ? Math.ceil((new Date(pendingPayment.dueDate).getTime() - Date.now()) / 86400000)
    : null;

  const unitAddress = pendingPayment?.lease?.unit
    ? `Unit ${pendingPayment.lease.unit.unitNumber}, ${pendingPayment.lease.unit.property?.name ?? ''}`
    : 'Your Unit';

  const handleMaintenanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingMaintenance(true);
    await new Promise(r => setTimeout(r, 1000)); // Simulate API call
    setSubmittingMaintenance(false);
    setShowMaintenanceModal(false);
    setMaintenanceForm({ issue: '', description: '', urgency: 'NORMAL' });
    toast.success('Maintenance request submitted! We\'ll get back to you shortly.');
  };

  return (
    <div className="max-w-container-max mx-auto flex flex-col gap-xl pb-xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md mb-lg">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface">Welcome home</h1>
          <div className="flex items-center gap-sm text-on-surface-variant font-body-md text-body-md mt-xs">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <p>{unitAddress}</p>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Rent Due Card (Prominent) */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-800/80 rounded-xl shadow-[0_4px_24px_rgba(53,37,205,0.06)] p-lg flex flex-col justify-between relative overflow-hidden border border-outline-variant/30 dark:border-slate-700/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed/30 dark:bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-lg">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mb-sm">
                  {pendingPayment ? 'Current Balance Due' : 'No Pending Balance'}
                </p>
                {loading ? (
                  <div className="h-12 w-36 bg-surface-container dark:bg-slate-700 rounded-lg animate-pulse" />
                ) : (
                  <h3 className="font-h1 text-h1 text-on-surface dark:text-white tracking-tight">
                    ₹{Number(pendingPayment?.amount ?? 0).toLocaleString('en-IN')}
                  </h3>
                )}
              </div>
              {daysUntilDue !== null && (
                <div className={`font-label-caps text-label-caps px-3 py-1.5 rounded-full flex items-center gap-xs ${
                  daysUntilDue < 0
                    ? 'bg-error-container text-on-error-container'
                    : daysUntilDue <= 3
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-300'
                }`}>
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)}d overdue` : daysUntilDue === 0 ? 'Due today' : `Due in ${daysUntilDue} days`}
                </div>
              )}
            </div>
            {pendingPayment && (
              <div className="space-y-xs mb-xl">
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 py-2 border-b border-surface-variant/50 dark:border-slate-700/50">
                  <span>Rent</span>
                  <span className="font-medium text-on-surface dark:text-white">₹{Number(pendingPayment.amount).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 py-2 border-b border-surface-variant/50 dark:border-slate-700/50">
                  <span>Due Date</span>
                  <span className="font-medium text-on-surface dark:text-white">{new Date(pendingPayment.dueDate).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            )}
          </div>
          <button 
            className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-primary to-secondary text-on-primary font-body-md text-body-md font-semibold py-4 px-6 flex items-center justify-center gap-sm shadow-md transition-transform active:scale-[0.98] z-10 group hover:shadow-lg hover:opacity-95"
            onClick={() => navigate('/tenant/payments')}
          >
            <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">payment</span>
            {pendingPayment ? 'Pay Now' : 'View Payments'}
          </button>
        </div>

        {/* Maintenance Card */}
        <div className="bg-surface-container-low dark:bg-slate-800/50 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-lg flex flex-col items-center justify-center text-center border border-surface-variant/50 dark:border-slate-700/30">
          <div className="w-16 h-16 rounded-full bg-secondary-fixed/50 dark:bg-secondary/20 flex items-center justify-center mb-md shadow-inner">
            <span className="material-symbols-outlined text-[32px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>build</span>
          </div>
          <h3 className="font-h3 text-h3 text-on-surface dark:text-white mb-xs">Maintenance</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mb-lg">Need a repair? Submit a request and track its progress.</p>
          <button 
            className="w-full bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-600 text-primary font-body-md text-body-md font-medium py-3 px-4 rounded-lg hover:bg-surface-variant dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-sm"
            onClick={() => setShowMaintenanceModal(true)}
          >
            <span className="material-symbols-outlined text-[20px]">add_task</span>
            Report an Issue
          </button>
        </div>

        {/* Recent Payments */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-800/80 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/30 dark:border-slate-700/50 flex flex-col">
          <div className="p-lg border-b border-surface-variant dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-h3 text-h3 text-on-surface dark:text-white">Recent Payments</h3>
            <button 
              className="font-body-sm text-body-sm text-primary hover:underline flex items-center gap-xs"
              onClick={() => navigate('/tenant/payments')}
            >
              View All
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          <div className="p-4 flex-1">
            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-12 bg-surface-container dark:bg-slate-700 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : recentPayments.length === 0 ? (
              <div className="text-center py-lg text-on-surface-variant dark:text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-sm block text-outline">receipt_long</span>
                No payment history yet.
              </div>
            ) : (
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead>
                  <tr className="text-on-surface-variant dark:text-slate-400 border-b border-surface-variant dark:border-slate-700">
                    <th className="pb-3 pl-4 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 pr-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-on-surface dark:text-slate-300">
                  {recentPayments.map(p => (
                    <tr key={p.id} className="hover:bg-primary-fixed/10 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="py-3 pl-4 text-on-surface-variant dark:text-slate-400">{new Date(p.dueDate).toLocaleDateString('en-IN')}</td>
                      <td className="py-3 font-medium">₹{Number(p.amount).toLocaleString('en-IN')}</td>
                      <td className="py-3 pr-4 text-right">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-label-caps text-label-caps ${
                          p.status === 'COMPLETED' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                          p.status === 'OVERDUE' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                          'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                        }`}>
                          {p.status === 'COMPLETED' ? 'Paid' : p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* My Documents */}
        <div className="bg-surface-container-lowest dark:bg-slate-800/80 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/30 dark:border-slate-700/50 flex flex-col">
          <div className="p-lg border-b border-surface-variant dark:border-slate-700">
            <h3 className="font-h3 text-h3 text-on-surface dark:text-white">My Documents</h3>
          </div>
          <div className="p-lg flex-1 flex flex-col gap-md">
            <button
              className="flex items-center p-md rounded-lg border border-outline-variant/50 dark:border-slate-600 hover:bg-surface-container-low dark:hover:bg-slate-700 hover:border-primary/30 transition-all group text-left"
              onClick={() => toast.success('Document viewing coming soon!')}
            >
              <div className="w-10 h-10 rounded bg-primary-fixed dark:bg-primary/20 flex items-center justify-center mr-md text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
              </div>
              <div className="flex-1">
                <h4 className="font-body-md text-body-md font-medium text-on-surface dark:text-white group-hover:text-primary transition-colors">Lease Agreement</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">PDF • Tap to view</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">open_in_new</span>
            </button>
          </div>
        </div>
      </div>

      {/* Maintenance Modal */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface dark:bg-slate-900 rounded-2xl p-xl w-full max-w-md shadow-2xl border border-outline-variant/20 dark:border-slate-700">
            <div className="flex items-center justify-between mb-lg">
              <div>
                <h2 className="font-h2 text-h2 text-on-surface dark:text-white">Report an Issue</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">We'll get back to you as soon as possible.</p>
              </div>
              <button onClick={() => setShowMaintenanceModal(false)} className="p-2 hover:bg-surface-container dark:hover:bg-slate-800 rounded-full">
                <span className="material-symbols-outlined text-outline">close</span>
              </button>
            </div>
            <form onSubmit={handleMaintenanceSubmit} className="space-y-md">
              <div>
                <label className="block font-body-sm text-body-sm text-on-surface dark:text-slate-200 mb-xs">Issue Type</label>
                <select
                  className="w-full px-md py-sm rounded-lg bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface dark:text-slate-200"
                  value={maintenanceForm.issue}
                  onChange={e => setMaintenanceForm(f => ({ ...f, issue: e.target.value }))}
                  required
                >
                  <option value="">Select issue type…</option>
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>HVAC / Air Conditioning</option>
                  <option>Appliance Repair</option>
                  <option>Pest Control</option>
                  <option>Structural / Damage</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block font-body-sm text-body-sm text-on-surface dark:text-slate-200 mb-xs">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-md py-sm rounded-lg bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none text-on-surface dark:text-slate-200"
                  placeholder="Describe the issue in detail…"
                  value={maintenanceForm.description}
                  onChange={e => setMaintenanceForm(f => ({ ...f, description: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block font-body-sm text-body-sm text-on-surface dark:text-slate-200 mb-xs">Urgency</label>
                <div className="grid grid-cols-3 gap-sm">
                  {['LOW', 'NORMAL', 'URGENT'].map(u => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setMaintenanceForm(f => ({ ...f, urgency: u }))}
                      className={`py-2 rounded-lg font-body-sm text-body-sm font-medium border transition-colors ${
                        maintenanceForm.urgency === u
                          ? u === 'URGENT' ? 'bg-error text-on-error border-error' : 'bg-primary text-on-primary border-primary'
                          : 'border-outline-variant dark:border-slate-600 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={submittingMaintenance}
                className="w-full py-md bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-sm"
              >
                {submittingMaintenance ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    Submitting…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Submit Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
