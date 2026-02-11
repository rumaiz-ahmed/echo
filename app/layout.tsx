import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Echo by mndly — The Anti-Social Network',
    template: '%s | Echo by mndly',
  },
  description:
    'Echo is the anti-social network. A modern Discord alternative by mndly — built for real communities, not dopamine loops. Chat, connect, and build your space.',
  keywords: [
    'Echo',
    'mndly',
    'Discord alternative',
    'community chat app',
    'anti-social network',
    'messaging platform',
    'online communities',
    'real-time chat',
    'group chat',
    'server chat',
  ],
  authors: [{ name: 'mndly', url: 'https://mndly.vercel.app' }],
  creator: 'mndly',
  metadataBase: new URL('https://mndly.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Echo by mndly — The Anti-Social Network',
    description:
      'Echo is the anti-social network. A modern Discord alternative built for real communities, not dopamine loops.',
    url: 'https://mndly.vercel.app',
    siteName: 'Echo by mndly',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echo by mndly — The Anti-Social Network',
    description:
      'Echo is the anti-social network. A modern Discord alternative built for real communities, not dopamine loops.',
    creator: '@mndly',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ER96KK5Q3P"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ER96KK5Q3P');
            `,
          }}
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
