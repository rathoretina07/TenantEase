import { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreVertical, Mail, Phone } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { PageLoader } from '../../components/ui/Loader';
import { EmptyState } from '../../components/ui/EmptyState';

// Mock Data
const mockTenants = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8901', property: 'Sunset Apartments, 4B', status: 'Active', rent: '$1,200', joined: '2023-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 987-654-3210', property: 'Oceanview Condos, 12A', status: 'Pending', rent: '$2,500', joined: '2023-11-01' },
  { id: '3', name: 'Robert Johnson', email: 'robert@example.com', phone: '+1 555-123-4567', property: 'Sunset Apartments, 2A', status: 'Active', rent: '$1,100', joined: '2022-05-20' },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com', phone: '+1 444-987-6543', property: 'Maple Street House', status: 'Past Due', rent: '$3,000', joined: '2021-08-10' },
];

export default function Tenants() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredTenants = mockTenants.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-h2 font-h2 text-on-surface">Tenants</h1>
          <p className="text-body-sm text-on-surface-variant">Manage your property residents and their lease details.</p>
        </div>
        <Button className="w-full sm:w-auto shrink-0">
          <Plus className="w-5 h-5 mr-2" />
          Add Tenant
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-surface-container-highest flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface-container-lowest">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
            <Input 
              placeholder="Search tenants or properties..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto shrink-0">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {filteredTenants.length === 0 ? (
          <EmptyState 
            icon={Search} 
            title="No tenants found" 
            description="We couldn't find any tenants matching your search query." 
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container-highest bg-surface-container-low/50">
                  <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Tenant</th>
                  <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Contact</th>
                  <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Property & Rent</th>
                  <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest">
                {filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg shrink-0">
                          {tenant.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-on-surface">{tenant.name}</p>
                          <p className="text-body-sm text-on-surface-variant">Joined {tenant.joined}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                          <Mail className="w-4 h-4" /> {tenant.email}
                        </div>
                        <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                          <Phone className="w-4 h-4" /> {tenant.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-on-surface">{tenant.property}</p>
                      <p className="text-body-sm text-on-surface-variant">{tenant.rent} / month</p>
                    </td>
                    <td className="p-4">
                      <Badge variant={
                        tenant.status === 'Active' ? 'success' : 
                        tenant.status === 'Pending' ? 'warning' : 'error'
                      }>
                        {tenant.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" className="p-2 w-10 h-10 rounded-full">
                        <MoreVertical className="w-5 h-5 text-on-surface-variant" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
