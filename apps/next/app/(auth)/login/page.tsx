'use client';

import { useState } from 'react';
import { authClient } from '../../../lib/auth-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
      });
    } catch (err) {
      setError('Échec de connexion');
    }
  };

  return (
    <main className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
      {error && <div className="mb-2 rounded border border-red-200 bg-red-50 text-red-800 px-3 py-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded border px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Mot de passe</label>
          <input
            type="password"
            className="w-full rounded border px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="px-4 py-2 rounded bg-blue-600 text-white" type="submit">Se connecter</button>
      </form>

      <div className="mt-4">
        <button
          className="px-4 py-2 rounded bg-slate-100"
          onClick={async () => {
            try {
              await authClient.signIn.google({ callbackURL: '/dashboard' });
            } catch {
              setError('Échec OAuth Google (inscriptions désactivées)');
            }
          }}
        >
          Se connecter avec Google
        </button>
      </div>
    </main>
  );
}