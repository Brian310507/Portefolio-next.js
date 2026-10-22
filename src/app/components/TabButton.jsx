import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active ? "text-neon-cyan" : "text-acid";

  return (
    <button onClick={selectTab}>
      <p
        className={`mr-3 font-display font-bold uppercase tracking-wider text-lg hover:text-neon-cyan transition-colors ${buttonClasses}`}
      >
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className={`h-1 bg-gradient-to-r from-acid to-neon-cyan mt-2 mr-3 transition-all duration-300 ${
          active ? "shadow-neon-cyan" : ""
        }`}
      ></motion.div>
    </button>
  );
};

export default TabButton;
