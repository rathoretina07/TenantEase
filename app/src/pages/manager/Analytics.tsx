import { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface MonthlyRevenue {
  month: string;
  revenue: number;
}

interface AnalyticsData {
  totalProperties: number;
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  occupancyRate: number;
  totalTenants: number;
  totalRevenue: number;
  pendingPayments: number;
  outstandingAmount: number;
  monthlyRevenue: MonthlyRevenue[];
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/analytics')
      .then(r => setData(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-xl">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">progress_activity</span>
      </div>
    );
  }

  const maxRevenue = data?.monthlyRevenue?.length
    ? Math.max(...data.monthlyRevenue.map(m => m.revenue), 1)
    : 1;

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
            <span className="font-h1 text-h1 text-on-surface">{data ? formatCurrency(data.totalRevenue) : '—'}</span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {data ? `${data.totalProperties} properties · ${data.totalTenants} tenants` : ''}
          </span>
        </div>
        <div className="bg-surface-container-lowest rounded-xl soft-shadow p-md flex flex-col relative overflow-hidden border border-outline-variant/20">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-secondary">
            <span className="material-symbols-outlined text-[64px]">domain</span>
          </div>
          <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-sm">Portfolio Occupancy</span>
          <div className="flex items-baseline gap-sm mb-1">
            <span className="font-h1 text-h1 text-on-surface">{data ? `${data.occupancyRate}%` : '—'}</span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {data ? `${data.vacantUnits} unit${data.vacantUnits !== 1 ? 's' : ''} currently vacant` : ''}
          </span>
        </div>
        <div className="bg-surface-container-lowest rounded-xl soft-shadow p-md flex flex-col relative overflow-hidden border border-outline-variant/20">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-error">
            <span className="material-symbols-outlined text-[64px]">warning</span>
          </div>
          <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-sm">Outstanding Balances</span>
          <div className="flex items-baseline gap-sm mb-1">
            <span className="font-h1 text-h1 text-on-surface">{data ? formatCurrency(data.outstandingAmount) : '—'}</span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {data ? `${data.pendingPayments} pending payment${data.pendingPayments !== 1 ? 's' : ''}` : ''}
          </span>
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
            {(data?.monthlyRevenue ?? []).map((item, i) => {
              const heightPct = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
              const isMax = item.revenue === maxRevenue && item.revenue > 0;
              return (
                <div key={i} className="flex-1 flex flex-col justify-end gap-2 group cursor-pointer">
                  <div 
                    className={`w-full ${isMax ? 'bg-primary' : 'bg-primary-fixed'} rounded-t-sm group-hover:bg-primary transition-colors relative`}
                    style={{ height: `${Math.max(heightPct, 2)}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-caps px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {formatCurrency(item.revenue)}
                    </div>
                  </div>
                  <span className={`text-center font-label-caps text-label-caps ${isMax ? 'text-on-surface font-semibold' : 'text-outline'}`}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl soft-shadow p-md border border-outline-variant/20 flex flex-col">
          <div className="flex justify-between items-center mb-lg">
            <h2 className="font-h3 text-h3 text-on-surface">Portfolio Summary</h2>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-md">
            {[
              { label: 'Total Properties', value: data?.totalProperties ?? 0, icon: 'apartment' },
              { label: 'Total Units', value: data?.totalUnits ?? 0, icon: 'meeting_room' },
              { label: 'Occupied Units', value: data?.occupiedUnits ?? 0, icon: 'person' },
              { label: 'Vacant Units', value: data?.vacantUnits ?? 0, icon: 'door_open' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-md p-sm rounded-lg hover:bg-surface-variant/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{item.label}</span>
                </div>
                <span className="font-h3 text-h3 text-on-surface">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
