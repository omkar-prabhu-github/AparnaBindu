import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from './header'; 
import Background from './Background';

type ImageEntry = {
  url: string;
  name: string;
};

const useDatabaseImages = (): ImageEntry[] => {
  const [images, setImages] = useState<ImageEntry[]>([]);

  useEffect(() => {
    // These are the filenames from the public/kolam_database folder
    const imageNames = [
      '0000.png', '000A.png', '000B.png', '000C.png', '000D.png', '000E.png', '000F.png',
      '00A0.png', '00A1.png', '00A2.png', '00A3.png', '00A4.png', '00A5.png', '00A6.png', 
      '00A7.png', '00A8.png', '00A9.png', '00AA.png', '00AB.png', '00AC.png', '00AD.png', 
      '00AE.png', '00AF.png', '00B0.png', '00B1.png', '00B2.png', '00B3.png', '00B4.png', 
      '00B5.png', '00B6.png', '00B7.png', '00B8.png', '00B9.png', '00BA.png', '00BB.png', 
      '00BC.png', '00BD.png', '00BE.png', '00BF.png', '00C0.png', '00C1.png', '00C2.png', 
      '00C3.png', '00C4.png', '00C5.png', '00C6.png', '00C7.png', '00C8.png', '00C9.png', 
      '00CA.png', '00CB.png', '00CC.png', '00CD.png', '00CE.png', '00CF.png', '00D0.png', 
      '00D1.png', '00D2.png', '00D3.png', '00D4.png', '00D5.png', '00D6.png', '00D7.png', 
      '00D8.png', '00D9.png', '00DA.png', '00DB.png', '00DC.png', '00DD.png', '00DE.png', 
      '00DF.png', '00E0.png', '00E1.png', '00E2.png', '00E3.png', '00E4.png', '00E5.png', 
      '00E6.png', '00E7.png', '00E8.png', '00E9.png', '00EA.png', '00EB.png', '00EC.png', 
      '00ED.png', '00EE.png', '00EF.png', '00F0.png', '00F1.png', '00F2.png', '00F3.png', 
      '00F4.png', '00F5.png', '00F6.png', '00F7.png', '00F8.png', '00F9.png', '00FA.png', 
      '00FB.png', '00FC.png', '00FD.png', '00FE.png', '00FF.png', '0A00.png'
    ];
    
    const results: ImageEntry[] = imageNames.map(name => ({
      url: `${import.meta.env.BASE_URL}kolam_database/${name}`,
      name: name
    }));
    
    setImages(results);
  }, []);

  return images;
};

const OneFiveOne: React.FC = () => {
  const allImages = useDatabaseImages();
  const [query, setQuery] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const images = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allImages;
    return allImages.filter(img => img.name.toLowerCase().includes(q));
  }, [allImages, query]);

  return (
    <div className="min-h-screen font-sans text-amber-900 relative overflow-x-hidden">
      <Background />
      
      {/* Animated Background Pattern - From home.tsx */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" />
      </div>

      {/* Floating Decorative Elements - From home.tsx */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Removed decorative background images */}
      </div>

      <div className="relative z-10">
        {/* Reusable Header component */}
        <Header scrollY={scrollY} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        
        {/* Mobile Menu Dropdown - From home.tsx */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bg-amber-50/95 backdrop-blur-lg shadow-xl z-40 animate-slideDown">
            <nav className="container mx-auto px-6 py-6 space-y-4">
              {['Home', 'Gallery', 'Database', 'About Us'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(' ', '')}`}
                  className="block py-3 px-4 rounded-lg hover:bg-amber-100 text-amber-800 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        )}

        <main className="container mx-auto px-6 md:px-10">
          <section className="pt-20 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10"
            >
              <h1 
                className="text-4xl md:text-5xl font-bold font-serif text-amber-900"
              >
                1-5-1 Kolam Database
              </h1>
              <div 
                className="w-40 h-1 mx-auto my-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
              ></div>
              <p 
                className="text-lg text-amber-700/90 mt-3 mb-6 max-w-2xl mx-auto"
              >
                Explore our collection of 1-5-1 Kolam patterns.
              </p>
            </motion.div>

            <motion.div 
              className="flex justify-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by filename..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-amber-300/50 bg-white/80 backdrop-blur-sm text-amber-900 placeholder-amber-700/60 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-all duration-300"
                />
              </div>
            </motion.div>

            {images.length === 0 && query ? (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-16 h-16 mx-auto text-amber-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-xl text-amber-800/80 mt-4">No images found matching your search.</p>
                <button 
                  onClick={() => setQuery('')} 
                  className="mt-4 px-6 py-2 bg-amber-200/70 hover:bg-amber-300/70 rounded-full text-amber-900 font-semibold transition-colors duration-300"
                >
                  Clear search
                </button>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                  {images.map((img, idx) => (
                    <motion.div 
                      key={`${img.url}-${idx}`} 
                      className="rounded-xl overflow-hidden border border-amber-200/30 shadow-lg bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative overflow-hidden h-52">
                        <img 
                          src={img.url} 
                          alt={img.name} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-amber-900 truncate" title={img.name}>{img.name}</p>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </section>
        </main>

        {/* Footer - From home.tsx */}
        <footer className="mt-20 bg-gradient-to-b from-amber-100/50 to-amber-200/50 backdrop-blur-sm py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-amber-700">© 2025 Aparna Bindu. Preserving tradition, inspiring creativity.</p>
          </div>
        </footer>
      </div>
      
      {/* Custom Styles - From home.tsx */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 2s; }
        .animate-slideDown { animation: slideDown 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default OneFiveOne;