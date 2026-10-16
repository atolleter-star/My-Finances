'use client';

import React, { useState } from 'react';

interface FinancialAccount {
  id: string;
  institutionName: string;
  accountName: string;
  currentBalance: number;
  accountType: 'cash' | 'investment' | 'credit';
  creditLimit?: number;
  paymentDueDate?: string;
}

const accounts: FinancialAccount[] = [
  { id: '1', institutionName: 'Wells Fargo', accountName: 'Checking', currentBalance: 2500, accountType: 'cash' },
  { id: '2', institutionName: 'Newtek', accountName: 'High-Yield Savings', currentBalance: 10000, accountType: 'cash' },
  { id: '3', institutionName: 'Vanguard', accountName: 'Brokerage Portfolio', currentBalance: 45000, accountType: 'investment' },
  { id: '4', institutionName: 'Citi', accountName: 'Strata Credit Card', currentBalance: 1200, accountType: 'credit', creditLimit: 15000 },
  { id: '5', institutionName: 'Citi', accountName: 'Diamond Preferred', currentBalance: 450, accountType: 'credit', creditLimit: 10000 },
  { id: '6', institutionName: 'Capital One', accountName: 'Savor Card', currentBalance: 300, accountType: 'credit', creditLimit: 5000 },
  { id: '7', institutionName: 'Chase', accountName: 'Freedom Card', currentBalance: 150, accountType: 'credit', creditLimit: 4000 },
  { id: '8', institutionName: 'Bank of America', accountName: 'Customized Cash', currentBalance: 0, accountType: 'credit', creditLimit: 7500 },
];

export default function Dashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // !!! SET YOUR PERSONAL SECURE PASSWORD RIGHT HERE !!!
  const CORRECT_PASSWORD = 'ArnaudSecure2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid passkey. Access Denied.');
    }
  };

  const totalCash = accounts.filter(a => a.accountType === 'cash').reduce((sum, a) => sum + a.currentBalance, 0);
  const totalInvestments = accounts.filter(a => a.accountType === 'investment').reduce((sum, a) => sum + a.currentBalance, 0);
  const totalLiabilities = accounts.filter(a => a.accountType === 'credit').reduce((sum, a) => sum + a.currentBalance, 0);
  const netWorth = totalCash + totalInvestments - totalLiabilities;

  // Render Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F7F4EB] flex items-center justify-center p-6 font-sans">
        <div className="bg-white border-2 border-stone-400 p-8 rounded-xl shadow-xl max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-[#AEC6CF] text-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-500">
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h2 className="text-xl font-black uppercase font-mono tracking-wide text-stone-900 mb-2">Private Terminal</h2>
          <p className="text-xs text-stone-500 mb-6">Enter system password to decrypt balance metrics.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AEC6CF] text-center font-mono"
            />
            {error && <p className="text-xs text-red-600 font-bold font-mono">{error}</p>}
            <button
              type="submit"
              className="w-full bg-stone-800 text-white py-2 rounded-lg font-bold hover:bg-stone-700 transition font-mono uppercase tracking-wider text-xs border border-stone-900 shadow-sm"
            >
              Verify Passkey
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Secure Dashboard if authenticated
  return (
    <div className="min-h-screen bg-[#F7F4EB] text-stone-800 font-sans p-6">
      <header className="max-w-6xl mx-auto bg-stone-300 border-b-4 border-stone-400 rounded-t-lg p-6 shadow-md mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-wider text-stone-900 uppercase font-mono mx-auto">
          ARNAUD FINANCIAL DASHBOARD
        </h1>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-3 py-1 bg-stone-400 hover:bg-stone-500 rounded text-xs font-bold uppercase font-mono tracking-wider border border-stone-500"
        >
          Lock
        </button>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#AEC6CF] border-2 border-stone-700 p-6 rounded-lg shadow-sm">
          <p className="text-xs uppercase tracking-widest font-mono text-stone-700 font-bold mb-1">Net Worth</p>
          <p className="text-3xl font-black text-stone-900">\${netWorth.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-stone-300 p-6 rounded-lg shadow-sm">
          <p className="text-xs uppercase tracking-widest font-mono text-stone-500 font-bold mb-1">Liquid Cash</p>
          <p className="text-3xl font-bold text-stone-800">\${totalCash.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-stone-300 p-6 rounded-lg shadow-sm">
          <p className="text-xs uppercase tracking-widest font-mono text-stone-500 font-bold mb-1">Investments</p>
          <p className="text-3xl font-bold text-stone-800">\${totalInvestments.toLocaleString()}</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-wider font-mono border-b border-stone-300 pb-2">Assets</h2>
          {accounts.filter(a => a.accountType !== 'credit').map(account => (
            <div key={account.id} className="bg-white border border-stone-200 p-4 rounded-lg shadow-xs flex justify-between items-center">
              <div>
                <h3 className="font-bold text-stone-900">{account.institutionName}</h3>
                <p className="text-xs text-stone-500">{account.accountName}</p>
              </div>
              <p className="text-lg font-bold text-emerald-700">\${account.currentBalance.toLocaleString()}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-wider font-mono border-b border-stone-300 pb-2">Liabilities</h2>
          {accounts.filter(a => a.accountType === 'credit').map(account => {
            const utilization = account.creditLimit ? (account.currentBalance / account.creditLimit) * 100 : 0;
            return (
              <div key={account.id} className="bg-white border border-stone-200 p-4 rounded-lg shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-bold text-stone-900">{account.institutionName}</h3>
                    <p className="text-xs text-stone-500">{account.accountName}</p>
                  </div>
                  <p className="text-lg font-bold text-stone-800">\${account.currentBalance.toLocaleString()}</p>
                </div>
                {account.creditLimit && (
                  <div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden border border-stone-200">
                      <div className="bg-[#AEC6CF] h-full" style={{ width: `${Math.min(utilization, 100)}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                      <span>{utilization.toFixed(0)}% Utilized</span>
                      <span>Limit: \${account.creditLimit.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
