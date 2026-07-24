import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'SENSOL — A New Language of Training',
    template: '%s | SENSOl',
  },
  description:
    'Where strength meets precision, and movement becomes design. Sensol redefines the role of fitness in modern living.',
  keywords: [
    'Sensol',
    'fitness',
    'pilates',
    'reformer',
    'smart training',
    'precision movement',
    'modern fitness',
  ],
  authors: [{ name: 'SENSOL', url: 'https://sensolfitness.com' }],
  openGraph: {
    title: 'SENSOL — A New Language of Training',
    description:
      'Where strength meets precision, and movement becomes design.',
    url: 'https://sensolfitness.com',
    siteName: 'SENSOL',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SENSOL — A New Language of Training',
    description:
      'Where strength meets precision, and movement becomes design.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
