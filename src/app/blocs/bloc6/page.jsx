import Navbar from '@/app/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Bloc6() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <h1 className="text-4xl font-bold mb-8">Organiser son développement professionnel</h1>
        <div className="space-y-10">
          {/* Objectifs */}
          <div>
            <p className="text-blue-200 mb-2">Objectifs :</p>
            <ul className="list-disc list-inside text-gray-200 text-base space-y-1">
              <li>Mettre en place son environnement d&apos;apprentissage personnel</li>
              <li>Mettre en œuvre des outils et stratégies de veille informationnelles</li>
              <li>Gérer son identité professionnel</li>
              <li>Développer son projet professionnel</li>
            </ul>
          </div>

          {/* Mon CV */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Mon CV</h2>
            <div className="flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc6/capture-cv-alexandre-roques.png" alt="CV Alexandre Roques" width={250} height={350} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1">
                <p className="text-gray-200 mb-2">Je vous met également à disposition mon cv et le lien pdf ci-dessous pour pouvoir le voir plus en détails.<br />Dans mon cv figure mes expériences professionnelles, mes formations, mes compétences et les différents moyens pour me contacter.</p>
                <div className="flex items-center mt-2">
                <a href="/images/bloc6/CV-de-Alexandre-ROQUES.pdf" target="_blank" rel="noopener noreferrer">
                  <Image src="/pdf-icon-custom.svg" alt="PDF" width={48} height={48} className="inline-block mr-2 hover:scale-110 transition-transform" />
                </a>
                <span className="text-gray-400 text-sm">document PDF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Linkedin */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Linkedin</h2>
            <div className="flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc6/Capture-linkedin.png" alt="Profil Linkedin" width={400} height={120} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1">
                <p className="text-gray-200 mb-2">Je mets à disposition mon Linkedin pour pouvoir me contacter plus facilement au besoin.</p>
                <a href='https://www.linkedin.com/in/alexandre-roques-73b070297/' target='_blank'>
                <Image src="/linkedin-icon.svg" alt="PDF" width={48} height={48} className="inline-block mr-2 hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Veille informationnelle */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Veille informationnelle</h2>
            {/* Bloc 1 : cyberattaque mairie Angers */}
            <div className="flex flex-col md:flex-row md:space-x-8 items-start mb-8">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc6/Capture-artiche-ransomware.png" alt="Veille cyberattaque" width={200} height={250} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-gray-200 mb-2">
                Le groupe Medusa de hackers privilégie l&apos;utilisation de campagnes de phishing via Gmail et Outlook pour s&apos;introduire dans les systèmes. Le logiciel malveillant s&apos;installe discrètement après avoir piégé les victimes avec des liens ou des fichiers joints malintentionnés. 
                </p>
                <a href='https://www.clubic.com/actualite-557424-cyberattaque-en-cours-un-dangereux-ransomware-baptise-medusa-sevit-sur-gmail-et-outlook.html?utm_source=flipboard&utm_content=topic%2Ffr-cybercriminalit%C3%A9' target='_blank' rel='noopener noreferrer'>
                <div className="mt-2">
                  <button className="bg-[#222] text-white px-6 py-2 rounded">Voir</button>
                </div>
                </a>
              </div>
            </div>
            {/* Bloc 2 : cybersécurité/ransomware */}
            <div className="flex flex-col md:flex-row md:space-x-8 items-start mb-8">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc6/Capture-devstral.png" alt="Veille cybersécurité" width={200} height={250} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-gray-200 mb-2">
                  Je m&apos;intéresse également au domaine de la <span className="font-bold">cybersécurité</span> et cybercriminalité pour pouvoir se renseigner sur les nouveaux moyens d&apos;intrusion dans les systèmes de données.
                </p>
                <p className="text-gray-200 mb-2">
                  Pour l&apos;exemple j&apos;ai pris un article qui parle des nouvelles techniques de <span className="font-bold">ransomware</span> trouver par des hackers russe.
                </p>
                <a href='https://www.blogdumoderateur.com/tools/devstral/?utm_source=flipboard&utm_content=topic/fr-technologie' target='_blank' rel='noopener noreferrer'>
                <div className="mt-2">
                  <button className="bg-[#222] text-white px-6 py-2 rounded">Voir</button>
                </div>
                </a>
              </div>
            </div>
            {/* Bloc 3 : document organisation veille */}
            <div className="flex flex-col md:flex-row md:space-x-8 items-start mb-8">
            <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc6/Capture-synthese-info.png" alt="Veille cyberattaque" width={250} height={350} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-gray-200 mb-2">Document qui décrit les différentes étapes pour organiser sa veille technologique.</span>
                <div className="flex items-center mt-2">
                <a href="/images/bloc6/Fiche-de-synthese-veille-technologique.pdf" target="_blank" rel="noopener noreferrer">
                  <Image src="/pdf-icon-custom.svg" alt="PDF" width={48} height={48} className="inline-block mr-2 hover:scale-110 transition-transform" />
                </a>
                <span className="text-gray-400 text-sm">document PDF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stage de deuxième année */}
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Stage de deuxième année</h2>
            <div className="flex flex-col md:flex-row md:space-x-8 items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <Image src="/images/bloc6/veille-techno-javascript.png" alt="JavaScript Roadmap" width={500} height={300} className="rounded-lg border border-[#33353F] mx-auto" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <Link href="#veilleweb" className="text-blue-400 underline font-semibold mb-2">Veille sur des technologie web durant le stage</Link>
                <p className="text-gray-200 mb-2">J&apos;ai pu organiser ma veille durant le stage à l&apos;aide de roadmaps qui m&apos;ont permis de pouvoir apprendre les bases de JavaScript, React et Next.js</p>
                <div className="mt-2">
                  <a href="https://roadmap.sh/javascript" target="_blank" rel="noopener noreferrer">
                  <div className="mt-2">
                  <button className="bg-[#222] text-white px-6 py-2 rounded">Voir</button>
                </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 