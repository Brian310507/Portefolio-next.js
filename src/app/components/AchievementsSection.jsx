"use client";
import React from "react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(
  () => {
    return import("react-animated-numbers");
  },
  { ssr: false }
);

const achievementsList = [
  {
    metric: "Projets",
    value: "10",
    postfix: "+",
  },
  {
    prefix: "~",
    metric: "Langages",
    value: "8",
  },
  {
    metric: "Certifications",
    value: "3",
  },
  {
    metric: "Années d'études",
    value: "2",
  },
];

const AchievementsSection = () => {
  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="hud-card py-8 px-4 sm:px-8 xl:px-16 flex flex-col sm:flex-row flex-wrap items-center justify-between">
        {achievementsList.map((achievement, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
            >
              <h2 className="text-neon-cyan text-4xl font-display font-bold flex flex-row text-glow-cyan">
                {achievement.prefix}
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(achievement.value)}
                  locale="fr-FR"
                  className="text-neon-cyan text-4xl font-bold"
                  configs={(_, index) => {
                    return {
                      mass: 1,
                      friction: 100,
                      tensions: 140 * (index + 1),
                    };
                  }}
                />
                {achievement.postfix}
              </h2>
              <p className="text-acid text-sm font-display font-semibold uppercase tracking-widest text-glow-acid">
                {achievement.metric}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
