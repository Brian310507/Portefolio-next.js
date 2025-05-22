import Navbar from '@/app/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Bloc5() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <h1 className="text-4xl font-bold mb-8">Mettre à disposition des utilisateurs un service informatique</h1>
        <div className="space-y-10">
          {/* Introduction */}
          <div>
            <p className="text-blue-200 mb-2">Les objectifs sont :</p>
            <ul className="list-disc list-inside text-gray-200 text-base space-y-1">
              <li>Réaliser les tests d&apos;intégration et d&apos;acceptation d&apos;un service</li>
              <li>Déployer un service</li>
              <li>Accompagner les utilisateurs dans la mise en place d&apos;un service</li>
            </ul>
          </div>

          {/* Atelier pro 2eme semestre */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Atelier professionnalisants du 2eme semestre</h2>
            <p className="text-gray-200 mt-2">Configuration d&apos;un serveur Apache</p>
            <div className="mt-6 space-y-6">
              <div>
                <Image src="/images/bloc5/Tp-systeme-1SIO.png" alt="Configuration DNS Apache" width={600} height={200} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
            </div>
          </div>

          {/* Stage de deuxième année */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Stage de deuxième année</h2>
            <Link href="#dashboard" className="text-blue-400 underline font-semibold">Mise à disposition un dashboard administrateur</Link>
            <div className="mt-6 flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc5/dashboard-admin.png" alt="Dashboard administrateur" width={600} height={300} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                <Image src="/pdf-icon.png" alt="PDF" width={48} height={48} className="inline-block mr-2" />
                <span className="text-gray-400 text-sm">Dashboard PDF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 