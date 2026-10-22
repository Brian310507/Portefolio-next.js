import Navbar from '@/app/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function TableauCompetence() {
  return (
    <main className="flex min-h-screen flex-col bg-night-950">
      <Navbar />
      <div className="container mt-24 mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <h1 className="text-4xl font-display font-bold italic uppercase mb-8 text-acid">Tableau des compétences épreuve E5</h1>
        <div className="flex flex-col md:flex-row md:space-x-16 items-start">
          <div className="flex-1 mb-8 md:mb-0 flex flex-col items-center">
            <Image
              src="/images/tableauCompetence/tableau.png"
              alt="Tableau de compétences E5"
              width={600}
              height={800}
              className="rounded-lg border border-neon-cyan/30 bg-white"
            />
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start">
            <p>PDF du tableau des compétences de l&apos;épreuve E5 :</p>
            
            <a href="/images/tableauCompetence/tableau-compétences-E5.pdf" target="_blank" rel="noopener noreferrer">
              <Image
                src="/pdf-icon-custom.svg"
                alt="PDF"
                width={48}
                height={48}
                className="hover:scale-110 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 