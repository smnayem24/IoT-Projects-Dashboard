import { Inter } from 'next/font/google';
import './globals.css';
import DndProviderWrapper from '@/components/DndProvider';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <DndProviderWrapper>{children}</DndProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}