import Navbar from '@/app/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Bloc2() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <h1 className="text-4xl font-bold mb-8">Répondre aux incidents et au demande d&apos;assistance et d&apos;évolution</h1>
        <div className="space-y-10">
          {/* Introduction */}
          <div>
            <ul className="list-disc list-inside text-gray-200 text-base space-y-1">
              <li>Collecter, suivre et orienter ses demandes</li>
              <li>Traiter des demandes concernant les services réseaux et systèmes, applicatifs</li>
              <li>Traiter des demandes concernant les applications</li>
            </ul>
          </div>

          {/* Atelier pro 1er semestre */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Atelier professionnalisants du 1er semestre</h2>
            <Link href="#outils" className="text-blue-400 underline font-semibold">Outils et méthodes de gestion des incidents</Link>
            <p className="text-gray-200 mt-2">Lors de ma première année de formation, nous avons eu des ateliers professionnalisants qui m&apos;ont permis d&apos;analyser différentes situations et de pouvoir proposer par la suite de proposer des évolutions.</p>
            <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc2/Gestion_cas_utilisateurs.png" alt="Gestion des incidents" width={400} height={300} className="rounded-lg border border-[#33353F] mx-auto" />
                <div className="flex items-center justify-center mt-2">
                
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-gray-200 mb-2">Lors de cet atelier, j&apos;ai utilisé l&apos;outil itil pour répondre à des demandes d&apos;assistance</p>
                <a href="/images/bloc2/AP_ITIL_1SIO.pdf" target="_blank" rel="noopener noreferrer" className="mt-2">
                  <Image src="/pdf-icon-custom.svg" alt="PDF" width={48} height={48} className="hover:scale-110 transition-transform mx-auto" />
                  <span className="block text-gray-400 text-sm text-center mt-1">Exemple de document PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Stage de première année */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Stage de première année</h2>
            <Link href="#applications" className="text-blue-400 underline font-semibold">Traiter des demandes concernant les applications</Link>
            <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc2/image_maquette_stage1.png" alt="Applications" width={400} height={200} className="rounded-lg border border-[#33353F] mx-auto" />
                
              </div>
              <div className="flex-1">
                <p className="text-gray-200">La méthode adoptée pour cette maquette était la méthode Prototyping Model, qui nous a permis grâce à la maquette de capturer mes besoins et valider les fonctionnalités. Nous avons à travers plusieurs réunions avec les parties prenantes de l&apos;école et l&apos;enseignant identifié l&apos;ensemble des besoins avec cette méthode, ce qui a permis l&apos;utilisation de la maquette pour affiner et transmettre les exigences avant de développer le produit final.</p>
                <div className="flex items-center justify-center mt-2 flex-col">
                  <a href="/images/bloc2/rapport-de-stage1.pdf" target="_blank" rel="noopener noreferrer">
                    <Image src="/pdf-icon-custom.svg" alt="PDF" width={48} height={48} className="hover:scale-110 transition-transform mx-auto" />
                  </a>
                  <span className="block text-gray-400 text-sm text-center mt-1">Exemple de document PDF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stage de deuxième année */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Stage de deuxième année</h2>
            <Link href="#maquette" className="text-blue-400 underline font-semibold">Traiter les demandes du client sous forme de maquette</Link>
            <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc2/maquette-dashboard-Tortuga.png" alt="Maquette 1" width={400} height={200} className="rounded-lg border border-[#33353F] mx-auto" />
               
              </div>
              <div className="flex-1">
                <p className="text-gray-200 mb-2">
                  Dans le cadre du projet, il était mis en évidence la réalisation d&apos;une maquette représentative du site Web en vue de sa spécification au client.<br /><br />
                  Le cahier des charges devait respecter la maquette ainsi :
                </p>
                
                <ul className="list-disc list-inside ml-4 mt-2 text-gray-200">
                  <li>Une maquette doit reprendre les mêmes codes que le livrable final ;</li>
                  <li>La maquette doit contenir des données réelles (extraites de l&apos;outil gestion de collection et d&apos;un prototype de dashboard) pour donner une vision la plus fidèle possible du produit final ;</li>
                  <li>La maquette doit être optimisée pour pouvoir faciliter le développement du dashboard final.</li>
                </ul>
                <div className="flex items-center justify-center mt-2 flex-col">
                  <a href="/images/bloc2/rapport-de-stage2.pdf" target="_blank" rel="noopener noreferrer">
                    <Image src="/pdf-icon-custom.svg" alt="PDF" width={48} height={48} className="hover:scale-110 transition-transform mx-auto" />
                  </a>
                  <span className="block text-gray-400 text-sm text-center mt-1">Exemple de document PDF</span>
                </div>
              </div>
              
            </div>
          </div>
        </div>
         {/* Affichage dynamique de toutes les images du dossier bloc1 */}
         <div className="mt-16">
          <h2 className="text-2xl font-bold text-blue-300 mb-4">Toutes les images du bloc 2</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              '/images/bloc2/Gestion_cas_utilisateurs.png',
              '/images/bloc2/image_maquette_stage1.png',
              '/images/bloc2/maquette-dashboard-Tortuga.png',
            ].map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`Bloc 2 image ${idx + 1}`}
                width={400}
                height={250}
                className="rounded-lg border border-[#33353F] mx-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 