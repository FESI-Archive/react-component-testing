import './globals.css';
import { AuthProvider } from '@/src/contexts/AuthContext';
import QueryProvider from '@/src/providers/QueryProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>{' '}
      </body>
    </html>
  );
}
