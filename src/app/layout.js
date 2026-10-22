import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Alexandre ROQUES | Portfolio – Étudiant en développement web',
  description:
    "Portfolio d'Alexandre ROQUES, étudiant en développement web et applicatif : projets, compétences, réalisations par blocs et contact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
