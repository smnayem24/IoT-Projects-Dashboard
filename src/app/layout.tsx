import { Inter } from 'next/font/google';
import './globals.css';
import DndProviderWrapper from '@/components/DndProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DndProviderWrapper>{children}</DndProviderWrapper>
      </body>
    </html>
  )
}