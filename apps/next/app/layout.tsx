import type { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}