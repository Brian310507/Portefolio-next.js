import React from 'react';

const BlocLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-night-950 text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-display font-bold italic uppercase mb-8">{title}</h1>
        <div className="p-6 hud-card">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BlocLayout; 