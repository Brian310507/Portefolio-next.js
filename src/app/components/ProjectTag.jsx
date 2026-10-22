import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-[#0A0306] border-acid bg-acid shadow-neon-acid"
    : "text-neon-cyan border-neon-cyan/40 hover:border-acid hover:text-acid";
  return (
    <button
      className={`${buttonStyles} border-2 px-6 py-2 text-xl font-display font-bold uppercase tracking-wider cursor-pointer transition-colors`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
