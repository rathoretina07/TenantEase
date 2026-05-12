import { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface Payment {
  id: string;
  amount: number;
  status: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  tenant: { profile: { firstName: string; lastName: string } };
  lease: { unit: { unitNumber: string; property: { name: string } } };
}

export default function ManagerPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED' | 'OVERDUE'>('ALL');

  useEffect(() => {
    api.get('/payments')
      .then(r => setPayments(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'ALL' ? payments : payments.filter(p => p.status === filter);
  const total = payments.reduce((s, p) => s + Number(p.amount), 0);
  const collected = payments.filter(p => p.status === 'COMPLETED').reduce((s, p) => s + Number(p.amount), 0);
  const pending = payments.filter(p => p.status === 'PENDING').reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div className="max-w-container-max mx-auto w-full">
      <div className="mb-8">
        <h1 className="font-h1 text-h1 text-on-surface mb-1">Payments</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Track rent collections across all your properties.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-lg">
        {[
          { label: 'Total Billed', value: total, icon: 'receipt_long', color: 'text-primary' },
          { label: 'Collected', value: collected, icon: 'check_circle', color: 'text-green-600' },
          { label: 'Pending', value: pending, icon: 'pending', color: 'text-amber-600' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-surface-container-lowest rounded-xl p-lg soft-shadow flex items-center gap-md">
            <span className={`material-symbols-outlined text-3xl ${color}`}>{icon}</span>
            <div>
              <p className="font-body-sm text-body-sm text-outline">{label}</p>
              <p className="font-h2 text-h2 text-on-surface">₹{value.toLocaleString('en-IN')}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-lg">
        {(['ALL', 'PENDING', 'COMPLETED', 'OVERDUE'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full font-body-sm text-body-sm font-medium transition-colors ${
              filter === f ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
            }`}
          >{f}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-xl">
          <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-xl text-on-surface-variant">
          <span className="material-symbols-outlined text-6xl mb-md block text-outline">payments</span>
          <p>No payments found.</p>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container">
                <tr>
                  {['Tenant', 'Property / Unit', 'Due Date', 'Paid Date', 'Amount', 'Status'].map(h => (
                    <th key={h} className="pb-3 pt-3 px-4 font-label-caps text-label-caps text-outline">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-t border-surface-container hover:bg-surface-container/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-on-surface">
                      {p.tenant?.profile?.firstName} {p.tenant?.profile?.lastName}
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant text-sm">
                      Unit {p.lease?.unit?.unitNumber} – {p.lease?.unit?.property?.name}
                    </td>
                    <td className="py-3 px-4 text-outline text-sm">{new Date(p.dueDate).toLocaleDateString('en-IN')}</td>
                    <td className="py-3 px-4 text-outline text-sm">{p.paidDate ? new Date(p.paidDate).toLocaleDateString('en-IN') : '—'}</td>
                    <td className="py-3 px-4 font-semibold text-on-surface">₹{Number(p.amount).toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        p.status === 'COMPLETED' ? 'bg-green-50 text-green-700' :
                        p.status === 'OVERDUE' ? 'bg-red-50 text-red-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
