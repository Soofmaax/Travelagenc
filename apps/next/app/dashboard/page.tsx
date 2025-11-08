'use client';

import { useEffect, useState } from 'react';
import { authClient } from '../../lib/auth-client';

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const sub = authClient.session.subscribe((s) => setSession(s));
    return () => sub.unsubscribe();
  }, []);

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      {session ? (
        <div className="space-y-2">
          <p>Connecté en tant que: {session.user?.email}</p>
          <button
            className="px-4 py-2 rounded bg-slate-100"
            onClick={async () => authClient.signOut()}
          >
            Déconnexion
          </button>
        </div>
      ) : (
        <p>Non connecté</p>
      )}
    </main>
  );
}