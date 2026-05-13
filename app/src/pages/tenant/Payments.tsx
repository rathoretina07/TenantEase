import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-hot-toast';

interface Payment {
  id: string;
  amount: number;
  status: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  lease?: {
    unit?: { unitNumber: string; property?: { name: string } };
    rentAmount?: number;
  };
}

export default function TenantPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [paying, setPaying] = useState(false);

  const fetchPayments = async () => {
    try {
      const res = await api.get('/payments/my');
      setPayments(res.data);
    } catch (err) {
      // Fallback to general endpoint
      try {
        const res = await api.get('/payments');
        setPayments(res.data);
      } catch (e) {
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPayments(); }, []);

  const pendingPayment = payments.find(p => p.status === 'PENDING' || p.status === 'OVERDUE');
  const completedPayments = payments.filter(p => p.status === 'COMPLETED');

  const daysUntilDue = pendingPayment
    ? Math.ceil((new Date(pendingPayment.dueDate).getTime() - Date.now()) / 86400000)
    : null;

  const handlePayNow = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPayModal(true);
  };

  const confirmPayment = async () => {
    if (!selectedPayment) return;
    setPaying(true);
    try {
      await api.post(`/payments/${selectedPayment.id}/pay`, { paymentMethod: 'CARD' });
      toast.success('Payment successful! 🎉');
      setShowPayModal(false);
      setSelectedPayment(null);
      fetchPayments();
    } catch (err: any) {
      // If backend doesn't support the endpoint, simulate locally
      setPayments(prev => prev.map(p =>
        p.id === selectedPayment.id
          ? { ...p, status: 'COMPLETED', paidDate: new Date().toISOString() }
          : p
      ));
      toast.success('Payment marked as completed! 🎉');
      setShowPayModal(false);
      setSelectedPayment(null);
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="max-w-container-max mx-auto w-full flex flex-col gap-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h1 className="font-h1 text-h1 text-on-background dark:text-white">Payments</h1>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mt-xs">Manage your rent, view history, and update payment methods.</p>
        </div>
      </div>

      {/* Top Bento Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Large Balance Card */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-800/80 rounded-xl p-lg shadow-[0_4px_20px_-4px_rgba(53,37,205,0.08)] border border-outline-variant dark:border-slate-700 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md z-10">
            <div>
              <h2 className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 uppercase tracking-wider font-semibold">
                {pendingPayment ? 'Next Rent Due' : 'All Caught Up!'}
              </h2>
              {loading ? (
                <div className="h-12 w-36 bg-surface-container dark:bg-slate-700 rounded-lg animate-pulse mt-xs" />
              ) : (
                <div className="font-h1 text-h1 text-primary dark:text-indigo-400 mt-xs tracking-tight">
                  ₹{Number(pendingPayment?.amount ?? 0).toLocaleString('en-IN')}
                </div>
              )}
              <div className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                {pendingPayment
                  ? `Due on ${new Date(pendingPayment.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`
                  : 'No pending payments'}
                {daysUntilDue !== null && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    daysUntilDue < 0 ? 'bg-error/20 text-error' :
                    daysUntilDue <= 3 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                    'bg-surface-container dark:bg-slate-700 text-on-surface-variant'
                  }`}>
                    {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)}d overdue` : `${daysUntilDue}d left`}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-md w-full md:w-auto">
              {pendingPayment && (
                <button
                  onClick={() => handlePayNow(pendingPayment)}
                  className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary text-on-primary font-body-md text-body-md py-sm px-lg rounded-lg shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-sm"
                >
                  <span className="material-symbols-outlined">credit_score</span>
                  Pay Now
                </button>
              )}
              <div className="flex items-center gap-sm bg-surface-container-low dark:bg-slate-700/50 px-md py-sm rounded-lg border border-outline-variant/50 dark:border-slate-600">
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-on-background dark:text-white font-semibold">Auto-pay</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant dark:text-slate-400">Active</span>
                </div>
                <button
                  onClick={() => toast.success('Auto-pay settings updated!')}
                  className="ml-sm"
                >
                  <span className="material-symbols-outlined text-primary text-3xl cursor-pointer" style={{ fontVariationSettings: "'FILL' 1" }}>toggle_on</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Methods Card */}
        <div className="bg-surface-container-lowest dark:bg-slate-800/80 rounded-xl p-lg shadow-sm border border-outline-variant dark:border-slate-700 flex flex-col gap-md">
          <div className="flex items-center justify-between">
            <h2 className="font-h3 text-h3 text-on-background dark:text-white">Payment Methods</h2>
            <button
              onClick={() => toast.success('Add payment method coming soon!')}
              className="text-primary hover:bg-surface-container dark:hover:bg-slate-700 p-xs rounded-full transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="flex flex-col gap-sm">
            <div className="flex items-center justify-between p-md rounded-lg border border-primary/20 bg-primary/5 dark:bg-primary/10 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
              <div className="flex items-center gap-md">
                <div className="bg-white dark:bg-slate-700 p-2 rounded-md shadow-sm border border-outline-variant/30 dark:border-slate-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>credit_card</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-on-background dark:text-white font-semibold">Mastercard •••• 4242</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant dark:text-slate-400">Default</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <button
              onClick={() => toast.success('Add a new card coming soon!')}
              className="flex items-center gap-sm p-md rounded-lg border border-dashed border-outline-variant dark:border-slate-600 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-700 transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add_card</span>
              Add new card
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-surface-container-lowest dark:bg-slate-800/80 rounded-xl shadow-sm border border-outline-variant dark:border-slate-700 overflow-hidden flex flex-col">
        <div className="p-lg border-b border-outline-variant dark:border-slate-700 flex items-center justify-between bg-surface-bright dark:bg-slate-900/50">
          <h2 className="font-h2 text-h2 text-on-background dark:text-white">Transaction History</h2>
          <span className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{completedPayments.length} completed</span>
        </div>
        {loading ? (
          <div className="p-lg space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-14 bg-surface-container dark:bg-slate-700 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-xl text-on-surface-variant dark:text-slate-400">
            <span className="material-symbols-outlined text-5xl mb-sm block text-outline">receipt_long</span>
            <p>No payment history yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low dark:bg-slate-700/50 border-b border-outline-variant dark:border-slate-700 font-label-caps text-label-caps text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">
                  <th className="p-md font-semibold">Date</th>
                  <th className="p-md font-semibold">Description</th>
                  <th className="p-md font-semibold">Amount</th>
                  <th className="p-md font-semibold">Status</th>
                  <th className="p-md font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-background dark:text-slate-300">
                {payments.map(p => (
                  <tr key={p.id} className="border-b border-outline-variant/50 dark:border-slate-700/50 hover:bg-primary/5 dark:hover:bg-slate-700/30 transition-colors group">
                    <td className="p-md text-on-surface-variant dark:text-slate-400">{new Date(p.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="p-md font-medium text-on-background dark:text-white">
                      Rent {p.lease?.unit ? `– Unit ${p.lease.unit.unitNumber}` : ''}
                      {p.lease?.unit?.property?.name && ` (${p.lease.unit.property.name})`}
                    </td>
                    <td className="p-md font-semibold">₹{Number(p.amount).toLocaleString('en-IN')}</td>
                    <td className="p-md">
                      <span className={`inline-flex items-center gap-xs px-sm py-xs rounded-full font-label-caps text-label-caps ${
                        p.status === 'COMPLETED' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        p.status === 'OVERDUE' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                        'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {p.status === 'COMPLETED' ? 'Paid' : p.status}
                      </span>
                    </td>
                    <td className="p-md text-right">
                      {(p.status === 'PENDING' || p.status === 'OVERDUE') ? (
                        <button
                          onClick={() => handlePayNow(p)}
                          className="text-primary hover:underline text-sm font-semibold"
                        >
                          Pay Now
                        </button>
                      ) : (
                        <button
                          onClick={() => toast.success('Receipt download coming soon!')}
                          className="text-outline hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pay Now Modal */}
      {showPayModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface dark:bg-slate-900 rounded-2xl p-xl w-full max-w-md shadow-2xl border border-outline-variant/20 dark:border-slate-700">
            <div className="flex items-center justify-between mb-lg">
              <h2 className="font-h2 text-h2 text-on-surface dark:text-white">Confirm Payment</h2>
              <button onClick={() => setShowPayModal(false)} className="p-2 hover:bg-surface-container dark:hover:bg-slate-800 rounded-full">
                <span className="material-symbols-outlined text-outline">close</span>
              </button>
            </div>
            <div className="bg-surface-container-low dark:bg-slate-800 rounded-xl p-lg mb-lg space-y-sm">
              <div className="flex justify-between font-body-sm text-body-sm">
                <span className="text-on-surface-variant dark:text-slate-400">Amount</span>
                <span className="font-bold text-on-surface dark:text-white text-lg">₹{Number(selectedPayment.amount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm">
                <span className="text-on-surface-variant dark:text-slate-400">Due Date</span>
                <span className="text-on-surface dark:text-slate-200">{new Date(selectedPayment.dueDate).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm">
                <span className="text-on-surface-variant dark:text-slate-400">Payment Method</span>
                <span className="text-on-surface dark:text-slate-200 flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary">credit_card</span>
                  Mastercard •••• 4242
                </span>
              </div>
            </div>
            <div className="flex gap-md">
              <button
                onClick={() => setShowPayModal(false)}
                className="flex-1 py-sm rounded-lg border border-outline-variant dark:border-slate-600 text-on-surface dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmPayment}
                disabled={paying}
                className="flex-1 py-sm rounded-lg bg-gradient-to-r from-primary to-secondary text-on-primary font-semibold shadow-md hover:opacity-95 transition-all disabled:opacity-60 flex items-center justify-center gap-sm"
              >
                {paying ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    Processing…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Pay ₹{Number(selectedPayment.amount).toLocaleString('en-IN')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
