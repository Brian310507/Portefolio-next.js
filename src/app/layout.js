import './globals.css'
import { Chakra_Petch, Rajdhani } from 'next/font/google'

// Typo display angulaire (proche du logo Cyberpunk: Edgerunners)
const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

// Typo texte tech lisible
const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Alexandre ROQUES | Portfolio – Étudiant en développement web',
  description:
    "Portfolio d'Alexandre ROQUES, étudiant en développement web et applicatif : projets, compétences, réalisations par blocs et contact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${chakraPetch.variable} ${rajdhani.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
