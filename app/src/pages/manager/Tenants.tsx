import { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface Tenant {
  id: string;
  email: string;
  role: string;
  profile: { firstName: string; lastName: string; phone?: string; avatarUrl?: string };
  leases: { id: string; status: string; rentAmount: number; unit: { unitNumber: string; property: { name: string } } }[];
}

export default function ManagerTenants() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/tenants')
      .then(r => setTenants(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = tenants.filter(t => {
    const name = `${t.profile?.firstName} ${t.profile?.lastName}`.toLowerCase();
    return name.includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="max-w-container-max mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-1">Tenants</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Manage all tenants across your properties.</p>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            className="pl-10 pr-4 py-sm rounded-lg bg-surface-container border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-sm text-body-sm"
            placeholder="Search tenants…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-xl">
          <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-xl text-on-surface-variant">
          <span className="material-symbols-outlined text-6xl mb-md block text-outline">group</span>
          <p className="font-h3 text-h3 mb-sm">{search ? 'No tenants match your search' : 'No tenants yet'}</p>
          <p className="font-body-md text-body-md">Tenants will appear here once they join your properties.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {filtered.map(t => {
            const activeLease = t.leases?.find(l => l.status === 'ACTIVE');
            return (
              <div key={t.id} className="bg-surface-container-lowest rounded-xl p-lg soft-shadow border border-outline-variant/20 hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-md mb-md">
                  <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-primary font-semibold text-lg">
                    {t.profile?.firstName?.[0]}{t.profile?.lastName?.[0]}
                  </div>
                  <div>
                    <p className="font-body-md font-semibold text-on-surface">
                      {t.profile?.firstName} {t.profile?.lastName}
                    </p>
                    <p className="font-body-sm text-body-sm text-outline">{t.email}</p>
                  </div>
                </div>
                {activeLease ? (
                  <div className="bg-surface-container rounded-lg p-sm mt-sm">
                    <p className="text-xs text-outline mb-1">Active Lease</p>
                    <p className="font-body-sm font-semibold text-on-surface">
                      Unit {activeLease.unit?.unitNumber} – {activeLease.unit?.property?.name}
                    </p>
                    <p className="text-xs text-primary font-semibold mt-1">
                      ₹{Number(activeLease.rentAmount).toLocaleString('en-IN')}/mo
                    </p>
                  </div>
                ) : (
                  <span className="text-xs text-outline">No active lease</span>
                )}
                {t.profile?.phone && (
                  <div className="flex items-center gap-1 mt-sm text-xs text-outline">
                    <span className="material-symbols-outlined text-sm">call</span>
                    {t.profile.phone}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
