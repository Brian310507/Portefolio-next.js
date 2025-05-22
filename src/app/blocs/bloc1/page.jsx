import Navbar from '@/app/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Bloc1() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <h1 className="text-4xl font-bold mb-8">Gestion du patrimoine informatique</h1>
        <div className="space-y-10">
          {/* Introduction */}
          <div>
            <ul className="list-disc list-inside text-gray-200 text-base space-y-1">
              <li>Recenser et identifier les ressources numériques</li>
              <li>Exploiter des référentiels, normes et standards adoptés par le patrimoine informatique</li>
              <li>Mettre en place et vérifier les niveaux d&apos;habilitation associés à un service</li>
              <li>Vérifier les conditions de la continuité d&apos;un service informatique</li>
              <li>Gérer des sauvegardes</li>
              <li>Vérifier le respect des règles d&apos;utilisation des ressources numériques</li>
            </ul>
          </div>

          {/* Atelier pro 1er semestre */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Atelier professionnalisants du 1er semestre</h2>
            <Link href="#recenser" className="text-blue-400 underline font-semibold">Recenser et identifier les ressources numériques</Link>

            <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc1/Capture_d’ecran_tp_GLPI.jpg" alt="Tableau de recensement" width={500} height={300} className="rounded-lg border border-[#33353F] mx-auto" />
                {/* PDF lien 1 */}
                
              </div>
              <div className="flex-1 flex flex-col items-center">
                <p className="text-gray-200 mb-4">Recensement de différents domaines qui possèdent du matériel informatique d&apos;une organisation.</p>
                {/* PDF lien 2 */}
                <a href="/images/bloc1/TP_GLPI_3.1_3.2_Alexandre_ROQUES.pdf" target="_blank" rel="noopener noreferrer">
                  {/* TODO: mettre le bon lien PDF */}
                  <Image src="/pdf-icon-custom.svg" alt="PDF" width={48} height={48} className="inline-block mr-2 hover:scale-110 transition-transform" />
                </a>
                <span className="text-gray-400 text-sm">document PDF</span>
              </div>
            </div>
          </div>

          {/* Mettre en place et vérifier les niveaux d&apos;habilitation */}
          <div>
            <Link href="#habilitation" className="text-blue-400 underline font-semibold">Mettre en place et vérifier les niveaux d&apos;habilitation associés à un service</Link>
            <div className="mt-4 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc1/Capture_d’ecran_travaille_GLPI.jpg" alt="Connexion" width={350} height={250} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex items-center">
                <p className="text-gray-200">Mise en place de différents statuts qui permet d&apos;accorder des droits aux utilisateurs en fonction de leur statut.</p>
              </div>
            </div>
          </div>

          {/* Stage 2ème année BTS SIO */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Stage de 2eme année BTS SIO</h2>
            <Link href="#sauvegardes" className="text-blue-400 underline font-semibold">Gestion des sauvegardes et des différentes versions</Link>
            <div className="mt-4 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc1/capture_git_hub_Tortuga.png" alt="GitHub dépôt" width={500} height={300} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex items-center">
                <p className="text-gray-200">Mise en place d&apos;un dépôt qui référence les différentes versions du dashboard admin Tortuga.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Affichage dynamique de toutes les images du dossier bloc1 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-blue-300 mb-4">Toutes les images du bloc 1</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              '/images/bloc1/capture_git_hub_Tortuga.png',
              '/images/bloc1/Capture_d’ecran_tp_GLPI.jpg',
              '/images/bloc1/image_log_histostage.png',
              '/images/bloc1/Capture_d’ecran_travaille_GLPI.jpg',
            ].map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`Bloc 1 image ${idx + 1}`}
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