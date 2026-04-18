import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from './header';
import Background from './Background';

// Creating a custom icon component to replace the lucide-react import
const UploadCloudIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
    <path d="M12 12v9"></path>
    <path d="m16 16-4-4-4 4"></path>
  </svg>
);

// Sample images - no change here
const pulliImages: string[] = [
  '/pulli_kolams/WhatsApp Image 2025-09-30 at 11.42.07 PM (1).jpeg',
  '/pulli_kolams/WhatsApp Image 2025-09-30 at 11.42.07 PM (2).jpeg',
  '/pulli_kolams/WhatsApp Image 2025-09-30 at 11.42.07 PM (3).jpeg',
  '/pulli_kolams/WhatsApp Image 2025-09-30 at 11.42.07 PM.jpeg',
  '/pulli_kolams/WhatsApp Image 2025-09-30 at 11.42.08 PM (1).jpeg',
  '/pulli_kolams/WhatsApp Image 2025-09-30 at 11.42.08 PM.jpeg',
  '/pulli_kolams/WhatsApp Image 2025-09-30 at 11.42.09 PM (1).jpeg',
  '/pulli_kolams/WhatsApp Image 2025-09-30 at 11.42.09 PM (2).jpeg',
  '/pulli_kolams/WhatsApp Image 2025-09-30 at 11.42.09 PM.jpeg',
  '/pulli_kolams/WhatsApp Image 2025-09-30 at 11.42.10 PM.jpeg'
];

const PulliKolam: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll for header effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans text-amber-900 relative overflow-x-hidden">
      <Background />

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Removed all decorative background images, kept only color */}
      </div>

      <div className="relative z-10">
        {/* Use the reusable Header component */}
        <Header scrollY={scrollY} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bg-amber-50/95 backdrop-blur-lg shadow-xl z-40 animate-slideDown">
            <nav className="container mx-auto px-6 py-6 space-y-4">
              {['Home', 'Gallery', 'About Us'].map((item) => (
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

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
            {/* Page Title & Quote */}
            <section 
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold font-serif text-amber-900 mb-4">
                Pulli Kolam
              </h1>
              <div className="inline-block">
                <div className="w-24 h-1 mx-auto bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mb-4"></div>
              </div>
              <p 
                className="text-xl text-amber-800/90 mt-3 mb-8 max-w-2xl mx-auto font-serif italic"
              >
                "Where dots connect to form the cosmic dance of symmetry and beauty"
              </p>
            </section>
            
            {/* Main content section */}
            <div className="max-w-4xl mx-auto">
              {/* History and Symbolism Card */}
              <motion.section 
                className="bg-white/60 backdrop-blur-md border border-amber-200/50 rounded-2xl p-8 shadow-lg mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* A Brief History */}
                  <div className="border-r-0 md:border-r md:border-amber-200/80 pr-0 md:pr-8">
                    <h2 className="text-2xl font-bold font-serif text-amber-900 mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      A Brief History
                    </h2>
                    <p className="text-amber-800 leading-relaxed mb-4">
                      Pulli Kolam, literally "dot kolam", is one of the oldest kolam traditions of South India. Designs begin with a grid of dots, and graceful lines weave around them to create symmetric motifs.
                    </p>
                    <p className="text-amber-800 leading-relaxed">
                      Drawn daily at thresholds with rice flour, Pulli Kolams are offerings of auspiciousness—welcoming prosperity while also feeding small creatures. Over centuries, countless regional variations evolved.
                    </p>
                  </div>

                  {/* Symbolic Meaning */}
                  <div>
                    <h2 className="text-2xl font-bold font-serif text-amber-900 mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Symbolic Meaning
                    </h2>
                    <p className="text-amber-800 leading-relaxed mb-4">
                      The dots in Pulli Kolam represent obstacles in life, while the lines that weave around them symbolize how we navigate life's challenges with grace and perseverance.
                    </p>
                    <p className="text-amber-800 leading-relaxed">
                      The geometric patterns often represent cosmic energy and harmony. Creating kolams is a meditative practice that brings peace and spiritual alignment.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Upload Section */}
              <motion.section 
                className="bg-white/60 backdrop-blur-md border border-amber-200/50 rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="md:w-2/5">
                    <h3 className="text-2xl font-bold font-serif text-amber-900 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 text-amber-700"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
                      Share Your Kolam
                    </h3>
                    <p className="text-amber-800 leading-relaxed">
                      Have a beautiful Pulli Kolam to share? Upload your creation and become part of our growing digital archive.
                    </p>
                  </div>
                  <div className="md:w-3/5 flex items-center gap-4">
                    <div className="w-full p-4 border-2 border-dashed border-amber-400/60 rounded-xl text-center cursor-pointer hover:bg-amber-50/50 hover:border-amber-600 transition-colors duration-300">
                      <div className="flex flex-col items-center justify-center text-amber-700">
                        <UploadCloudIcon />
                        <p className="text-sm font-medium text-amber-900 mt-2">Click or drag to upload</p>
                        <p className="text-xs text-amber-700/80">PNG, JPG, GIF up to 10MB</p>
                      </div>
                      <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                    <motion.button
                      className="whitespace-nowrap py-3 px-6 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Upload
                    </motion.button>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Gallery Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-20"
            >
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mb-12"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {pulliImages.map((src, idx) => (
                  <motion.div 
                    key={idx} 
                    className="rounded-xl overflow-hidden border border-amber-800/20 shadow-md bg-white/90 group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                    onClick={() => setSelectedImage(src)}
                  >
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={src} 
                        alt={`Pulli Kolam ${idx+1}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <span className="text-white font-semibold text-sm">View Pattern</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
        </main>
          
        <footer className="mt-20 bg-gradient-to-b from-amber-100/50 to-amber-200/50 backdrop-blur-sm py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-amber-700">© 2025 Aparna Bindu. Preserving tradition, inspiring creativity.</p>
          </div>
        </footer>
      </div>
      
      {/* Large image modal */}
      {selectedImage && (
        <motion.div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Enlarged kolam pattern" 
              className="w-full h-full object-contain" 
            />
            <button 
              onClick={() => setSelectedImage(null)} 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-amber-50/90 flex items-center justify-center text-amber-900 hover:bg-amber-50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PulliKolam;