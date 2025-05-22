import Navbar from '@/app/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Bloc3() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <h1 className="text-4xl font-bold mb-8">Développer la présence en ligne de l&apos;organisation</h1>
        <div className="space-y-10">
          {/* Introduction */}
          <div>
            <ul className="list-disc list-inside text-gray-200 text-base space-y-1">
              <li>Participer à la valorisation de l&apos;image de l&apos;organisation sur les médias numériques en tenant compte des enjeux économiques</li>
              <li>Référencer les services en ligne de l&apos;organisation et mesurer leur visibilité</li>
              <li>Participer à l&apos;évolution d&apos;un site web expliquant les données de l&apos;organisation.</li>
            </ul>
          </div>

          {/* Atelier pro 1er semestre */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Atelier professionnalisants du 1er semestre</h2>
            <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc3/image-M2L.png" alt="Site maison des ligues" width={500} height={200} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex items-center">
                <p className="text-gray-200">Dans cette activité, nous avons créé en groupe un site web pour une maison des ligues sur différents sports ainsi que diverses informations sur ces sports.</p>
              </div>
            </div>
          </div>

          {/* Atelier pro 2eme semestre */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Atelier professionnalisants du 2eme semestre</h2>
            <Link href="#evolution" className="text-blue-400 underline font-semibold">Participer à l&apos;évolution d&apos;un site Web exploitant les données de l&apos;organisation.</Link>
            <p className="text-gray-200 mt-2">Lors de ma première année de formation, nous avons eu des ateliers professionnalisants qui m&apos;ont permis de remplir les nécessaires à la présence en ligne de l&apos;organisation</p>
            <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc3/image-appfaq.png" alt="Site questions" width={500} height={200} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex items-center">
                <p className="text-gray-200">Dans cette activité, nous avons créé en groupe un site web dynamique qui permettait d&apos;avoir un système de question réponse ainsi que de différent statut.</p>
              </div>
            </div>
          </div>

          {/* Stage de première année */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Stage de première année</h2>
            <Link href="#recensement" className="text-blue-400 underline font-semibold">Création d&apos;un site web pour le recensement des demandes de stages</Link>
            <p className="text-gray-200 mt-2">Lors de mon premier stage, j&apos;ai créé avec l&apos;aide d&apos;un camarade un site web qui permet aux étudiants de renseigner leurs demandes de stages en ligne et d&apos;avoir les différents documents dématérialisés. Mais elle permettait également au professeur de pouvoir suivre et faire avancer les différentes démarches pour les stages.</p>
            <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc3/image-histostage.png" alt="Espace professeur" width={500} height={200} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex items-center">
                <p className="text-gray-200">Espace professeur qui permet de suivre et d&apos;agir sur les stages de l&apos;élève.</p>
              </div>
            </div>
          </div>

          {/* Atelier pro 3eme semestre */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Atelier professionnalisants du 3eme semestre</h2>
            <Link href="#restaurant" className="text-blue-400 underline font-semibold">Création d&apos;un site web pour un Restaurant</Link>
            <p className="text-gray-200 mt-2">Lors de ma deuxième année de formation, nous avons eu des ateliers professionnalisants qui m&apos;ont permis de remplir les nécessaires à la gestion du patrimoine informatique</p>
            <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc3/Restoweb.png" alt="Site restaurant" width={500} height={200} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex items-center">
                <p className="text-gray-200">Dans cette activité, nous avons créé en groupe un site web dynamique qui permettait d&apos;afficher la carte d&apos;un restaurant et de pouvoir passer commande.</p>
              </div>
            </div>
            <div className="mt-8">
              <Link href="#restaurateur" className="text-blue-400 underline font-semibold">Application côté restaurateur</Link>
              <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
                <div className="flex-1 mb-4 md:mb-0">
                  <Image src="/images/bloc3/RestoSwing_acceuil_1.png" alt="Application restaurateur" width={500} height={200} className="rounded-lg border border-[#33353F] mx-auto" />
                </div>
                <div className="flex-1 mb-4 md:mb-0">
                  <Image src="/images/bloc3/RestoSwing_detail_2.png" alt="Application restaurateur" width={500} height={200} className="rounded-lg border border-[#33353F] mx-auto" />
                </div>
                <div className="flex-1 flex items-center">
                  <p className="text-gray-200">Dans cette activité, nous avons créé en groupe une application Java qui permet de récupérer les informations du site web ci-dessus, voir les différents produits commandés et modifier les statuts des commandes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 