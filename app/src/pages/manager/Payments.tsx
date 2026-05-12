import { useState, useEffect } from 'react';
import { DollarSign, Download, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PageLoader } from '../../components/ui/Loader';

// Mock Data
const mockTransactions = [
  { id: 'TX-1001', tenant: 'John Doe', property: 'Sunset Apartments, 4B', amount: 1200, status: 'Completed', date: '2023-11-01', type: 'Rent' },
  { id: 'TX-1002', tenant: 'Emily Davis', property: 'Maple Street House', amount: 3000, status: 'Pending', date: '2023-11-02', type: 'Rent' },
  { id: 'TX-1003', tenant: 'Maintenance Co.', property: 'Oceanview Condos', amount: -450, status: 'Completed', date: '2023-11-05', type: 'Expense' },
  { id: 'TX-1004', tenant: 'Jane Smith', property: 'Oceanview Condos, 12A', amount: 2500, status: 'Completed', date: '2023-11-05', type: 'Deposit' },
];

export default function Payments() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-h2 font-h2 text-on-surface">Payments</h1>
          <p className="text-body-sm text-on-surface-variant">Track your revenue, expenses, and pending transactions.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="flex-1 sm:flex-none">
            Receive Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Revenue</p>
            <div className="p-2 bg-primary-container/10 rounded-full">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-on-surface">$24,500</h3>
          <p className="text-body-sm text-success flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-4 h-4" /> +12% from last month
          </p>
        </Card>
        
        <Card className="p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Pending Payments</p>
            <div className="p-2 bg-warning-container/20 rounded-full">
              <Clock className="w-5 h-5 text-warning" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-on-surface">$4,200</h3>
          <p className="text-body-sm text-on-surface-variant">3 invoices awaiting payment</p>
        </Card>

        <Card className="p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Expenses</p>
            <div className="p-2 bg-error-container/20 rounded-full">
              <ArrowDownRight className="w-5 h-5 text-error" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-on-surface">$3,150</h3>
          <p className="text-body-sm text-error flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-4 h-4" /> +5% from last month
          </p>
        </Card>

        <Card className="p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Net Income</p>
            <div className="p-2 bg-success-container/20 rounded-full">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-on-surface">$21,350</h3>
          <p className="text-body-sm text-success flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-4 h-4" /> +14% from last month
          </p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-surface-container-highest">
          <h3 className="text-xl font-bold text-on-surface">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">ID / Date</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Tenant / Property</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Type</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right">Amount</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest">
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-on-surface">{tx.id}</p>
                    <p className="text-body-sm text-on-surface-variant">{tx.date}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-on-surface">{tx.tenant}</p>
                    <p className="text-body-sm text-on-surface-variant truncate max-w-[200px]">{tx.property}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-body-sm px-2 py-1 bg-surface-container rounded-md border border-outline-variant">
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <p className={`font-bold ${tx.amount > 0 ? 'text-success' : 'text-error'}`}>
                      {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                    </p>
                  </td>
                  <td className="p-4 text-right">
                    <Badge variant={tx.status === 'Completed' ? 'success' : 'warning'}>
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
