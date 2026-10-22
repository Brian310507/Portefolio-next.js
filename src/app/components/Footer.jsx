import React from "react";

const Footer = () => {
  return (
    <footer className="footer z-10 border-t-2 border-acid text-white">
      <div className="stripes h-2 w-full" aria-hidden="true" />
      <div className="container p-12 flex flex-col sm:flex-row justify-between items-center gap-2 font-display uppercase tracking-widest">
        <span className="text-acid text-glow-acid">
          Portfolio Étudiant — Alexandre ROQUES
        </span>
        <p className="text-neon-cyan/80">
          © {new Date().getFullYear()} Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
