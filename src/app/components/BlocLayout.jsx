import React from 'react';

const BlocLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-[#121212] text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{title}</h1>
        <div className="bg-[#1E1E1E] p-6 rounded-lg border border-[#33353F]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BlocLayout; 