"use client";
import React from "react";
import { motion } from "framer-motion";

const AlternanceSection = () => {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-500 to-violet-700">
              Recherche d'Alternance
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#18191E] p-8 rounded-lg border border-[#33353F]"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Alternance 2025-2026</h3>
            <p className="text-[#ADB7BE] mb-4">
              Je recherche une alternance en développement web ou applicatif pour la rentrée 2025-2026, 
              avec une perspective de prolongation jusqu'en master. Cette expérience professionnelle 
              complémentaire à ma formation académique me permettra d'acquérir une expertise pratique 
              tout en contribuant activement à des projets concrets.
            </p>
            <ul className="space-y-2 text-[#ADB7BE]">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Rythme : 3 semaines en entreprise / 1 semaine en formation</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Durée : 1 an minimum, avec possibilité de prolongation</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Localisation : Flexible sur toute la France</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#18191E] p-8 rounded-lg border border-[#33353F]"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Ce que je recherche</h3>
            <p className="text-[#ADB7BE] mb-4">
              Je souhaite intégrer une entreprise qui me permettra de développer mes compétences 
              techniques tout en participant à des projets innovants. Mon objectif est de contribuer 
              activement à la création de solutions numériques tout en consolidant mes connaissances 
              théoriques.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Environnement idéal</h4>
                <ul className="space-y-2 text-[#ADB7BE]">
                  <li className="flex items-start">
                    <span className="text-violet-400 mr-2">•</span>
                    <span>Équipe technique dynamique et mentorat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-400 mr-2">•</span>
                    <span>Projets variés et challenges techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-400 mr-2">•</span>
                    <span>Culture d'apprentissage et d'innovation</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <a
            href="/#contact"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-violet-700 hover:from-blue-500 hover:via-blue-700 hover:to-violet-800 text-white transition-all duration-300"
          >
            Me contacter pour en discuter
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AlternanceSection; 