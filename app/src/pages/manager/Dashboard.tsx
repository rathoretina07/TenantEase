import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

interface Analytics {
  totalProperties: number;
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  occupancyRate: number;
  totalTenants: number;
  totalRevenue: number;
  pendingPayments: number;
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  dueDate: string;
  paidDate?: string;
  tenant: { profile: { firstName: string; lastName: string } };
  lease: { unit: { unitNumber: string; property: { name: string } } };
}

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, paymentsRes] = await Promise.all([
          api.get('/analytics'),
          api.get('/payments'),
        ]);
        setAnalytics(analyticsRes.data);
        setPayments(paymentsRes.data.slice(0, 5));
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const occupancyPct = analytics?.occupancyRate ?? 0;

  return (
    <div className="max-w-container-max mx-auto flex flex-col gap-xl pb-xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface">Portfolio Overview</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-sm">Welcome back. Here's what's happening with your properties today.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-xl">
          <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            <div className="bg-surface-container-lowest rounded-xl p-lg soft-shadow flex flex-col justify-between min-h-[140px] group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <span className="font-body-sm text-body-sm font-semibold text-outline tracking-wide uppercase">Total Revenue</span>
                <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <h2 className="font-h2 text-h2 text-on-surface">₹{Number(analytics?.totalRevenue ?? 0).toLocaleString('en-IN')}</h2>
                <p className="text-xs text-outline mt-1">From {analytics?.totalTenants} active tenants</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-lg soft-shadow flex flex-col justify-between min-h-[140px] group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <span className="font-body-sm text-body-sm font-semibold text-outline tracking-wide uppercase">Occupancy Rate</span>
                <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">apartment</span>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <h2 className="font-h2 text-h2 text-on-surface">{occupancyPct}%</h2>
                <div className="w-full bg-surface-variant rounded-full h-1.5 mt-2">
                  <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${occupancyPct}%` }}></div>
                </div>
                <p className="text-xs text-outline mt-1">{analytics?.occupiedUnits} occupied / {analytics?.totalUnits} total</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-lg soft-shadow flex flex-col justify-between min-h-[140px] group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <span className="font-body-sm text-body-sm font-semibold text-outline tracking-wide uppercase">Properties</span>
                <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">domain</span>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <h2 className="font-h2 text-h2 text-on-surface">{analytics?.totalProperties}</h2>
                <p className="text-xs text-outline mt-1">{analytics?.vacantUnits} vacant units</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-lg soft-shadow flex flex-col justify-between min-h-[140px] group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <span className="font-body-sm text-body-sm font-semibold text-outline tracking-wide uppercase">Pending Payments</span>
                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">payments</span>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <h2 className="font-h2 text-h2 text-on-surface">{analytics?.pendingPayments}</h2>
                <p className="text-xs text-outline mt-1">Awaiting collection</p>
              </div>
            </div>
          </div>

          {/* Recent Payments Table */}
          <div className="bg-surface-container-lowest rounded-xl soft-shadow border border-outline-variant/30 overflow-hidden flex flex-col">
            <div className="p-lg border-b border-surface-container-highest flex justify-between items-center bg-surface/50">
              <h3 className="font-h3 text-h3 text-on-surface">Recent Payments</h3>
              <button className="text-primary font-body-sm text-body-sm font-semibold hover:underline" onClick={() => navigate('/manager/payments')}>
                View All
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              {payments.length === 0 ? (
                <div className="text-center py-lg text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-sm block">receipt_long</span>
                  No payments yet. Seed the database or add tenants to see data here.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="pb-3 px-4 font-label-caps text-label-caps text-outline border-b border-surface-container-highest">Tenant</th>
                      <th className="pb-3 px-4 font-label-caps text-label-caps text-outline border-b border-surface-container-highest">Property / Unit</th>
                      <th className="pb-3 px-4 font-label-caps text-label-caps text-outline border-b border-surface-container-highest">Due Date</th>
                      <th className="pb-3 px-4 font-label-caps text-label-caps text-outline border-b border-surface-container-highest">Amount</th>
                      <th className="pb-3 px-4 font-label-caps text-label-caps text-outline border-b border-surface-container-highest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-sm text-body-sm">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-surface-container transition-colors border-b border-surface-container-highest last:border-0">
                        <td className="py-3 px-4 font-medium text-on-surface">
                          {p.tenant?.profile?.firstName} {p.tenant?.profile?.lastName}
                        </td>
                        <td className="py-3 px-4 text-on-surface-variant">
                          Unit {p.lease?.unit?.unitNumber} – {p.lease?.unit?.property?.name}
                        </td>
                        <td className="py-3 px-4 text-outline">
                          {new Date(p.dueDate).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3 px-4 font-semibold text-on-surface">
                          ₹{Number(p.amount).toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                            p.status === 'COMPLETED' ? 'bg-green-50 text-green-700' :
                            p.status === 'OVERDUE' ? 'bg-red-50 text-red-700' :
                            'bg-amber-50 text-amber-700'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
