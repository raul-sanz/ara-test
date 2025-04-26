import React from "react";

const Banner = ({ children }:{children: React.ReactNode}) => {
  return (
    <div className="relative bg-teal-800 text-white pb-24">
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-center">

        <div className="md:mb-0 text-center">
          <h2 className="text-4xl font-bold mb-4">Encuentra tu dispositivo ideal</h2>
          <p className="mb-6">
            Aprovecha nuestra oferta y nuestro gran descuento del 30 % en todas tus compras
          </p>
          <button className="bg-lime-300 hover:bg-lime-400 text-slate-800 font-semibold py-2 px-8 rounded-md transition-colors duration-200">
            Ver ofertas
          </button>
        </div>
        
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          className="w-full h-20 md:h-24" 
          viewBox="0 0 1200 118" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 C600,120 1000,120 1200,0 L1200,120 L0,120 Z" 
            className="fill-white"
          ></path>
        </svg>
      </div>
      
      <div className="absolute w-full bottom-[-10px] lg:bottom-[-5px] transform">
        {children}
      </div>
    </div>
  );
};

export default Banner;