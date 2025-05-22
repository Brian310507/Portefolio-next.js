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
          {/* Introduction */}
          <div>
            <ul className="list-disc list-inside text-gray-200 text-base space-y-1">
              <li>Analyser les objectifs et les modalités d&apos;organisation d&apos;un projet</li>
              <li>Planifier les activités</li>
              <li>Évaluer les indicateurs de suivi d&apos;un projet et analyser les écarts</li>
            </ul>
          </div>

          {/* Atelier pro 2eme semestre */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Atelier professionnalisants du 2eme semestre</h2>
            <Link href="#objectifs" className="text-blue-400 underline font-semibold">Analyser les objectifs et les modalités d&apos;organisation d&apos;un projet</Link>
            <p className="text-gray-200 mt-2">Planification des différentes tâche pour le site web.</p>
            <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc4/Trello-1SIO.png" alt="Trello tâches" width={500} height={250} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <button className="bg-[#222] text-white px-6 py-2 rounded">Voir</button>
              </div>
            </div>
          </div>

          {/* Stage de première année */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Stage de première année</h2>
            <Link href="#indicateurs" className="text-blue-400 underline font-semibold">Évaluer les indicateurs de suivi d&apos;un projet et analyser les écarts</Link>
            <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc4/reunion-1SIO.png" alt="Compte rendu réunion" width={400} height={500} className="rounded-lg border border-[#33353F] mx-auto" />
                <div className="flex items-center justify-center mt-2">
                  <Image src="/pdf-icon.png" alt="PDF" width={32} height={32} className="inline-block mr-2" />
                  <span className="text-gray-400 text-sm">Compte rendu PDF</span>
                </div>
              </div>
              <div className="flex-1"></div>
            </div>
          </div>

          {/* Stage de deuxième année */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Stage de deuxième année</h2>
            <Link href="#organisation" className="text-blue-400 underline font-semibold">Méthode d&apos;organisation pour le projet dashboard admin</Link>
            <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="mb-4">
                  <span className="font-bold text-gray-200">Logiciels de gestion du projet</span>
                  <p className="text-gray-200 mt-2">Trello : Outil de gestion l&apos;organisation des tâches ainsi que la répartition du travail. C&apos;est un outil avec Trello qu&apos;on utilise déjà. Il familiarise aux cours de notre année et c&apos;est un outil en ligne pour lequel nous avons l&apos;avenir.</p>
                </div>
                <Image src="/images/bloc4/outils-gestion-stage-Tortuga.png" alt="Trello projet" width={500} height={250} className="rounded-lg border border-[#33353F] mx-auto" />
                <div className="flex items-center justify-center mt-2">
                  <Image src="/pdf-icon.png" alt="PDF" width={32} height={32} className="inline-block mr-2" />
                  <span className="text-gray-400 text-sm">Trello PDF</span>
                </div>
               
              </div>
              <div className="flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 