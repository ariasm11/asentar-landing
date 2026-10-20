import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Public_Sans } from 'next/font/google'
import { socialLinks } from '@/components/site-footer'
import './globals.css'

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const siteUrl = 'https://asentar.finance'
const description =
  'Asentar lee wallets y exchanges, clasifica cada movimiento con IA y genera los asientos para tu ERP. Cada cierre queda sellado en Ethereum.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Asentar — Subledger contable cripto para LATAM',
    template: '%s · Asentar',
  },
  description,
  generator: 'v0.app',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Asentar',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@asentar_finance',
    creator: '@asentar_finance',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Asentar',
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  email: 'hola@asentar.finance',
  sameAs: socialLinks.map((social) => social.href),
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0c1421',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es-AR"
      className={`${publicSans.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
