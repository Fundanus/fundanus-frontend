'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import LimitModal from '@/components/LimitModal';

type Report = {
  openaiReport: string;
};

export default function DashboardPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [type, setType] = useState<'stocks' | 'crypto'>('stocks');
  const [ticker, setTicker] = useState('');
  const [suggestions, setSuggestions] = useState<{ symbol: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState('');
  const [reportsUsed, setReportsUsed] = useState<number>(0);
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {
    if (userId === undefined) return;
    if (!userId) {
      router.push('/sign-in');
    } else {
      fetchReportsUsed(userId);
    }
  }, [userId, router]);

  const fetchReportsUsed = async (uid: string) => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const { data, error } = await supabase
      .from('reports_log')
      .select('id')
      .eq('user_id', uid)
      .gte('generated_at', firstDayOfMonth);

    if (error) {
      console.error('Erro ao buscar relatórios usados:', error.message);
      return;
    }

    setReportsUsed(data.length);
  };

  const handleSearch = async (query: string) => {
    setTicker(query);
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${query}&type=${type}`);
      const data = await res.json();
      setSuggestions(data);
    } catch {
      setSuggestions([]);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log("DEBUG handleSubmit →", { ticker, type, userId });

    if (!ticker || !type || !userId) {
      setError("ticker, type e user_id são obrigatórios.");
      return;
    }

    if (reportsUsed >= 3) {
      setShowLimitModal(true);
      return;
    }

    setLoading(true);
    setReport(null);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, type, userId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReport(data);
      setReportsUsed(prev => prev + 1);
    } catch (err: any) {
      setError(err.message || 'Erro ao gerar relatório.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container">
      <h1 className="page-title">Bem-vindo ao Fundanus!</h1>
      <p className="page-subtitle">ID do utilizador: {userId}</p>

      <div className="form-section" style={{ marginTop: '2rem' }}>
        <label>
          Tipo de ativo:
          <select value={type} onChange={e => setType(e.target.value as 'stocks' | 'crypto')}>
            <option value="stocks">Ações</option>
            <option value="crypto">Criptomoeda</option>
          </select>
        </label>

        <label className="form-group" style={{ display: 'block', marginTop: '1rem' }}>
          Ticker:
          <input
            type="text"
            value={ticker}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Ex: AAPL ou BTC"
            list="ticker-options"
          />
          <datalist id="ticker-options">
            {suggestions.map(s => (
              <option key={s.symbol} value={s.symbol}>
                {s.symbol} — {s.name}
              </option>
            ))}
          </datalist>
        </label>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? '🔄 A gerar relatório...' : 'Gerar Relatório'}
        </button>
      </div>

      {error && <p className="form-error">⚠️ {error}</p>}

      {report && (
        <section className="form-result">
          <h2>📋 Relatório:</h2>
          <p>{report.openaiReport}</p>
        </section>
      )}

      <LimitModal isOpen={showLimitModal} onClose={() => setShowLimitModal(false)} />
    </main>
  );
}
