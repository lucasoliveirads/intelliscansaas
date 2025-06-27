import { useState } from 'react';

export default function Home() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarDados = async () => {
    if (!ip) return alert('Digite um IP válido');
    setLoading(true);
    try {
      const res = await fetch(`/api/scan?ip=${ip}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🔎 IntelliScan SaaS</h1>
      <input
        type="text"
        placeholder="Digite o IP ex: 8.8.8.8"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={buscarDados} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      {result && (
        <pre style={{ marginTop: '2rem', background: '#111', color: '#0f0', padding: '1rem' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
