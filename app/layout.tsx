import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RaidGuild - Cohort VIII',
  description: 'RaidGuild is a community of builders, thinkers, and doers.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
