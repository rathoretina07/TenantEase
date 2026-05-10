export default function TenantPayments() {
  return (
    <div className="max-w-container-max mx-auto w-full flex flex-col gap-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h1 className="font-h1 text-h1 text-on-background">Payments</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Manage your rent, view history, and update payment methods.</p>
        </div>
      </div>

      {/* Top Bento Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Large Balance Card */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-lg shadow-[0_4px_20px_-4px_rgba(53,37,205,0.08)] border border-outline-variant flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md z-10">
            <div>
              <h2 className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wider font-semibold">Next Rent Due</h2>
              <div className="font-h1 text-h1 text-primary mt-xs tracking-tight">₹2,450.00</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                Due on October 1, 2024
              </div>
            </div>
            <div className="flex flex-col items-end gap-md w-full md:w-auto">
              <button className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary text-on-primary font-body-md text-body-md py-sm px-lg rounded-lg shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-sm">
                <span className="material-symbols-outlined">credit_score</span>
                Pay Now
              </button>
              <div className="flex items-center gap-sm bg-surface-container-low px-md py-sm rounded-lg border border-outline-variant/50">
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-on-background font-semibold">Auto-pay</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">Active</span>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl ml-sm cursor-pointer" style={{ fontVariationSettings: "'FILL' 1" }}>toggle_on</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Methods Card */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant flex flex-col gap-md">
          <div className="flex items-center justify-between">
            <h2 className="font-h3 text-h3 text-on-background">Payment Methods</h2>
            <button className="text-primary hover:bg-surface-container p-xs rounded-full transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="flex flex-col gap-sm">
            <div className="flex items-center justify-between p-md rounded-lg border border-primary/20 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-md">
                <div className="bg-white p-2 rounded-md shadow-sm border border-outline-variant/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>credit_card</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-on-background font-semibold">Mastercard •••• 4242</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">Default</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col">
        <div className="p-lg border-b border-outline-variant flex items-center justify-between bg-surface-bright">
          <h2 className="font-h2 text-h2 text-on-background">Transaction History</h2>
          <button className="flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                <th className="p-md font-semibold">Date</th>
                <th className="p-md font-semibold">Description</th>
                <th className="p-md font-semibold">Amount</th>
                <th className="p-md font-semibold">Status</th>
                <th className="p-md font-semibold text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-background">
              <tr className="border-b border-outline-variant/50 hover:bg-primary/5 transition-colors group">
                <td className="p-md text-on-surface-variant">Sep 1, 2024</td>
                <td className="p-md font-medium text-on-background">September Rent - Apt 4B</td>
                <td className="p-md font-semibold">₹2,450.00</td>
                <td className="p-md">
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed px-sm py-xs rounded-full font-label-caps text-label-caps inline-flex items-center gap-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    Paid
                  </span>
                </td>
                <td className="p-md text-right">
                  <button className="text-outline hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
