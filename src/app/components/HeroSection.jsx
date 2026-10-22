"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative lg:py-16 overflow-hidden">
      {/* Lueurs néon d'ambiance (Night City) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-acid/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -right-24 h-72 w-72 rounded-full bg-neon-pink/10 blur-3xl"
      />
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-12 sm:col-span-8 place-self-center text-center sm:text-left justify-self-start relative"
        >
          <h1 className="text-white mb-8 text-3xl sm:text-4xl lg:text-6xl lg:leading-tight font-display font-bold italic uppercase tracking-wide">
            <span
              className="glitch text-acid text-glow-acid"
              data-text="Bonjour, je suis"
            >
              Bonjour, je suis
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Alexandre ROQUES",
                1000,
                "Étudiant en Développement",
                1000,
                "Développeur Web",
                1000,
                "Développeur Full Stack",
                1000,
                "Passionné de Code",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-acid to-neon-cyan"
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-8 lg:text-xl max-w-2xl mx-auto sm:mx-0">
            Passionné par le développement web et applicatif, je m&apos;efforce de créer des solutions innovantes 
            en utilisant les dernières technologies. Toujours en apprentissage, je cherche à améliorer 
            constamment mes compétences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
            <Link
              href="/#contact"
              className="btn-acid px-8 py-4 shadow-neon-acid"
            >
              Me Contacter
            </Link>
            <a
              href="/images/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-8 py-4"
            >
              Télécharger CV
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-12 sm:col-span-4 place-self-center mt-8 lg:mt-0"
        >
          <div className="rounded-full bg-night-800 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative overflow-hidden ring-4 ring-acid/60 shadow-neon-cyan">
            <Image
              src="/images/image2.png"
              alt="Portrait d'Alexandre ROQUES"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-full max-h-full w-auto h-auto object-contain"
              width={300}
              height={300}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
