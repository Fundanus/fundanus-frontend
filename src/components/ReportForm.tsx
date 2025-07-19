'use client';

import { useState } from 'react';

export default function ReportForm() {
  const [ticker, setTicker] = useState('');
  const [type, setType] = useState<'stocks' | 'crypto'>('stocks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, type }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro desconhecido');

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="report-form">
      <h2 className="form-title">Gerar novo relatório</h2>

      <div className="form-group">
        <label htmlFor="ticker">Ticker:</label>
        <input
          id="ticker"
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          required
          placeholder="Ex: AAPL ou BTC"
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Tipo de ativo:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as 'stocks' | 'crypto')}
        >
          <option value="stocks">📈 Ação</option>
          <option value="crypto">💰 Criptomoeda</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'A gerar...' : 'Gerar relatório'}
      </button>

      {error && <p className="form-error">⚠️ {error}</p>}

      {result && (
        <pre className="form-result">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </form>
  );
}
