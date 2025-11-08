import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">Next.js app – Auth + Drizzle + Supabase + Polar</h1>
      <p className="text-gray-600">
        Cette application Next est séparée du SPA existant pour un monorepo de portfolio. Elle intègre BetterAuth,
        Drizzle ORM avec Supabase, shadcn-like UI et Polar checkout (sandbox).
      </p>

      <div className="flex gap-3">
        <Link href="/login" className="px-4 py-2 rounded bg-blue-600 text-white">Se connecter</Link>
        <Link href="/register" className="px-4 py-2 rounded bg-slate-100">Créer un compte</Link>
        <Link href="/dashboard" className="px-4 py-2 rounded bg-slate-100">Dashboard</Link>
      </div>

      <div className="pt-4">
        <Link href="/api/docs" className="underline text-blue-700">API Docs (si ajoutés)</Link>
      </div>
    </main>
  );
}