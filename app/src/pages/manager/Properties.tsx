import { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  status: string;
  units: { id: string; unitNumber: string; status: string; rentAmount: number }[];
}

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', city: '', state: '', zipCode: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchProperties = async () => {
    try {
      const res = await api.get('/properties');
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProperties(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.post('/properties', form);
      setShowAddModal(false);
      setForm({ name: '', address: '', city: '', state: '', zipCode: '' });
      fetchProperties();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add property');
    } finally {
      setSaving(false);
    }
  };

  const images = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
  ];

  return (
    <div className="max-w-container-max mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-1">Properties</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Manage your portfolio and track occupancy.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-medium shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span className="font-body-sm text-body-sm">Add Property</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-xl">
          <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-xl text-on-surface-variant">
          <span className="material-symbols-outlined text-6xl mb-md block text-outline">domain_disabled</span>
          <p className="font-h3 text-h3 mb-sm">No properties yet</p>
          <p className="font-body-md text-body-md mb-lg">Click "Add Property" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter pb-12">
          {properties.map((p, i) => {
            const occupied = p.units?.filter(u => u.status === 'OCCUPIED').length ?? 0;
            const total = p.units?.length ?? 0;
            return (
              <article key={p.id} className="group bg-surface-container-lowest rounded-xl flex flex-col border border-outline-variant/20 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <img alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={images[i % images.length]} />
                  <div className="absolute top-3 left-3">
                    <span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface border border-outline-variant/20 rounded-full px-3 py-1 font-label-caps text-label-caps shadow-sm capitalize">
                      {p.status?.toLowerCase()}
                    </span>
                  </div>
                </div>
                <div className="p-md flex flex-col flex-1">
                  <h2 className="font-h3 text-h3 text-on-surface mb-1">{p.name}</h2>
                  <p className="font-body-sm text-body-sm text-outline">{p.address}, {p.city}, {p.state}</p>
                  <div className="mt-4 flex items-center gap-3 text-on-surface-variant font-body-sm text-body-sm">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-lg">apartment</span>
                      {total} Units
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-lg">people</span>
                      {occupied} Occupied
                    </div>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-surface-variant">
                    <div className="text-xs text-outline">
                      {total > 0 ? Math.round((occupied / total) * 100) : 0}% occupancy
                    </div>
                    <span className={`rounded-full px-3 py-1 font-label-caps text-label-caps flex items-center gap-1 ${
                      p.status === 'ACTIVE' ? 'bg-green-50 text-green-700' : 'bg-surface-variant text-on-surface-variant'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'ACTIVE' ? 'bg-green-600' : 'bg-outline'}`}></span>
                      {p.status}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-md">
          <div className="bg-surface rounded-2xl p-xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-lg">
              <h2 className="font-h2 text-h2 text-on-surface">Add Property</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-surface-container rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {error && <div className="mb-md p-md rounded-lg bg-error-container text-on-error-container text-sm">{error}</div>}
            <form onSubmit={handleAdd} className="space-y-md">
              {[
                { label: 'Property Name', key: 'name', placeholder: 'Sunset Apartments' },
                { label: 'Address', key: 'address', placeholder: '123 Main St' },
                { label: 'City', key: 'city', placeholder: 'Los Angeles' },
                { label: 'State', key: 'state', placeholder: 'CA' },
                { label: 'ZIP Code', key: 'zipCode', placeholder: '90028' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block font-body-sm text-body-sm text-on-surface mb-xs">{label}</label>
                  <input
                    className="w-full px-md py-sm rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder={placeholder}
                    value={(form as any)[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    required
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={saving}
                className="w-full py-md bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60 mt-sm"
              >
                {saving ? 'Saving…' : 'Add Property'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
