'use client';

import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="pt">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
