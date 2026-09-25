import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { RoadmapProvider } from '@/lib/context/RoadmapContext';
import BottomNav from '@/components/common/BottomNav';
import Toast from '@/components/common/Toast';
import IPhone17Frame from '@/components/common/IPhone17Frame';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pivot — Career Roadmap Builder (iPhone 17 Pro)',
  description:
    'Discover, build & validate your career roadmap with proven milestone playbooks engineered by verified seniors from tier-1 firms & campuses.',
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0a0d14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${plusJakartaSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0d14] text-on-surface font-sans min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-white">
        <RoadmapProvider>
          <IPhone17Frame>
            {children}
            <BottomNav />
            <Toast />
          </IPhone17Frame>
        </RoadmapProvider>
      </body>
    </html>
  );
}
