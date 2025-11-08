'use client';

import { useState } from 'react';
import { authClient } from '../../../lib/auth-client';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: '/dashboard',
      });
    } catch {
      setError('Échec de création de compte');
    }
  };

  return (
    <main className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Créer un compte</h1>
      {error && <div className="mb-2 rounded border border-red-200 bg-red-50 text-red-800 px-3 py-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Nom</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
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
        <button className="px-4 py-2 rounded bg-blue-600 text-white" type="submit">Créer</button>
      </form>
    </main>
  );
}