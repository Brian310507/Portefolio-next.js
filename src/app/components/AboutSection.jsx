"use client";
import React, { useTransition, useState } from "react";
import SphereScan from "./SphereScan";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Compétences",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Langages de programmation : C, Python, Java, JavaScript, PHP</li>
        <li>Développement Web : HTML, CSS, React, Next.js</li>
        <li>Bases de données : SQL</li>
        <li>Outils de développement : Git, VS Code</li>
      </ul>
    ),
  },
  {
    title: "Formation",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Étudiant en Développement Web et Applicatif</li>
        <li>Formation en cours sur les technologies modernes du web</li>
      </ul>
    ),
  },
  {
    title: "Projets",
    id: "projects",
    content: (
      <ul className="list-disc pl-2">
        <li>Développement d&apos;applications web avec React et Next.js</li>
        <li>Création de sites web responsifs avec HTML/CSS</li>
        <li>Programmation en Python et Java</li>
        <li>Gestion de bases de données SQL</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <SphereScan className="w-full aspect-square rounded-lg shadow-neon-cyan" />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="section-title mb-4">À propos de moi</h2>
          <p className="text-base lg:text-lg">
            Je suis un étudiant passionné par le développement web et applicatif. 
            J&apos;ai acquis des compétences dans divers langages de programmation comme C, Python, Java, 
            ainsi que dans les technologies web modernes comme HTML, CSS, JavaScript, React et Next.js. 
            Je m&apos;intéresse également au développement backend avec PHP et SQL. 
            Toujours curieux d&apos;apprendre de nouvelles technologies, je cherche à améliorer 
            constamment mes compétences et à participer à des projets stimulants.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Compétences
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Formation
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("projects")}
              active={tab === "projects"}
            >
              Projets
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
