import Navbar from '@/app/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Bloc4() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <h1 className="text-4xl font-bold mb-8">Travailler en mode projet</h1>
        <div className="space-y-10">
          {/* Objectifs */}
          <div>
            <p className="text-blue-200 mb-2">Objectifs :</p>
            <ul className="list-disc list-inside text-gray-200 text-base space-y-1">
              <li>Analyser les objectifs et les modalités d&apos;organisation d&apos;un projet</li>
              <li>Planifier les activités</li>
              <li>Évaluer les indicateurs de suivi d&apos;un projet et analyser les écarts</li>
            </ul>
          </div>

          {/* Atelier pro 2eme semestre */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Atelier professionnalisants du 2eme semestre</h2>
            <div className="flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc4/Trello-1SIO.png" alt="Trello tâches" width={500} height={250} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <Link href="#objectifs" className="text-blue-400 underline font-semibold mb-2">Analyser les objectifs et les modalités d&apos;organisation d&apos;un projet</Link>
                <p className="text-gray-200 mb-2">Planification des différentes tâches pour le site web à l&apos;aide de Trello, un outil de gestion de projet collaboratif.</p>
                <a href='https://trello.com/b/5EZHxRRk/appfaq' target='_blank' rel='noopener noreferrer'>
                <div className="mt-2">
                  <button className="bg-[#222] text-white px-6 py-2 rounded">Voir</button>
                </div>
                </a>
              </div>
            </div>
          </div>

          {/* Stage de première année */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Stage de première année</h2>
            <div className="flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc4/reunion-1SIO.png" alt="Compte rendu réunion" width={400} height={500} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <Link href="#indicateurs" className="text-blue-400 underline font-semibold mb-2">Évaluer les indicateurs de suivi d&apos;un projet et analyser les écarts</Link>
                <p className="text-gray-200 mb-2">Documentation et suivi des réunions de projet pour assurer un suivi efficace des objectifs et des délais.</p>
                <div className="flex items-center mt-2">
                  <a href="/images/bloc2/rapport-de-stage1.pdf" target="_blank" rel="noopener noreferrer">
                    <Image src="/pdf-icon-custom.svg" alt="PDF" width={48} height={48} className="inline-block mr-2 hover:scale-110 transition-transform" />
                  </a>
                  <span className="text-gray-400 text-sm">Compte rendu PDF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stage de deuxième année */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Stage de deuxième année</h2>
            <div className="flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc4/outils-gestion-stage-Tortuga.png" alt="Trello projet" width={500} height={250} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <Link href="#organisation" className="text-blue-400 underline font-semibold mb-2">Méthode d&apos;organisation pour le projet dashboard admin</Link>
                <div className="mb-4">
                  <span className="font-bold text-gray-200">Logiciels de gestion du projet</span>
                  <p className="text-gray-200 mt-2">Trello : Outil de gestion de l&apos;organisation des tâches ainsi que la répartition du travail. C&apos;est un outil que nous utilisons déjà dans notre formation et qui est largement utilisé dans le monde professionnel.</p>
                </div>
                <div className="flex items-center mt-2">
                  <a href="/images/bloc2/rapport-de-stage2.pdf" target="_blank" rel="noopener noreferrer">
                    <Image src="/pdf-icon-custom.svg" alt="PDF" width={48} height={48} className="inline-block mr-2 hover:scale-110 transition-transform" />
                  </a>
                  <span className="text-gray-400 text-sm">Trello PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 