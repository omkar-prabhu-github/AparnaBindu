import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './header';
import Background from './Background';

const ClassifyKolam: React.FC = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isClassified, setIsClassified] = useState(false);
  const [readyToClassify, setReadyToClassify] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Decorative animation effect for traditional feel
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Handle scroll for header effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      setImagePreviewUrl(null);
      setIsClassified(false);
      setReadyToClassify(false);
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      setImagePreviewUrl(String(e.target?.result || ''));
      setIsClassified(false);
      setReadyToClassify(true);
    };
    reader.readAsDataURL(file);
  };

  const handleClassify = () => {
    if (!readyToClassify) return;
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setIsClassified(true);
    }, 2000);
  };
  
  // Animation Variants for scroll-triggered animations
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" as const } 
    },
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger delay between child cards
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: "easeOut" as const }
    },
  };

  const label = 'Kambi Kolam';

  return (
    <div className="min-h-screen font-sans text-amber-900 relative overflow-x-hidden">
      <Background />
      
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Removed decorative background images */}
      </div>

      <div className="relative z-10">
        {/* Enhanced Header */}
        <Header scrollY={scrollY} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* Mobile Menu Dropdown */}
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
          <section className="py-12 md:py-16">
          {/* Decorative top element - NOW SCROLL-ANIMATED */}
          <motion.div 
            className="relative w-40 h-8 mx-auto mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.2, duration: 0.8 } }
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" className="text-amber-800/30">
              {/* NEW: SVG Path drawing animation */}
              <motion.path 
                d="M0,15 C20,5 40,25 60,15 C80,5 100,25 120,15" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              />
              <circle cx="60" cy="15" r="6" fill="currentColor" opacity="0.4" />
              <circle cx="40" cy="15" r="4" fill="currentColor" opacity="0.3" />
              <circle cx="80" cy="15" r="4" fill="currentColor" opacity="0.3" />
              <circle cx="20" cy="15" r="2" fill="currentColor" opacity="0.2" />
              <circle cx="100" cy="15" r="2" fill="currentColor" opacity="0.2" />
            </svg>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
            className="text-center mb-12"
          >
            <motion.div 
              className="inline-block relative mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <svg className="w-16 h-16 opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="50" />
                <circle cx="50" cy="50" r="40" fill="white" />
                <circle cx="50" cy="50" r="30" />
                <circle cx="50" cy="50" r="20" fill="white" />
                <circle cx="50" cy="50" r="10" />
              </svg>
              <motion.h1 
                className="text-5xl md:text-6xl font-bold font-serif text-amber-900 relative z-10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }} className="inline-block">C</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.4 }} className="inline-block">l</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.4 }} className="inline-block">a</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.4 }} className="inline-block">s</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }} className="inline-block">s</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.4 }} className="inline-block">i</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }} className="inline-block">f</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.4 }} className="inline-block">y</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.4 }} className="inline-block">K</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }} className="inline-block">o</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.4 }} className="inline-block">l</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.4 }} className="inline-block">a</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.4 }} className="inline-block">m</motion.span>
              </motion.h1>
            </motion.div>
            
            <motion.div 
              className="w-40 h-2 mx-auto my-4 bg-gradient-to-r from-amber-600/30 via-amber-600/80 to-amber-600/30 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ duration: 1, delay: 0.6 }}
            ></motion.div>
            
            <motion.p 
              className="text-lg text-amber-800/90 mt-3 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="italic font-light">"Where tradition meets technology to preserve our sacred patterns"</span><br/>
              <span className="text-sm mt-2 block text-amber-700/80">Upload your Kolam image and let our AI identify the pattern and tradition it belongs to.</span>
            </motion.p>
          </motion.div>

          {/* NEW: Grid container with staggerChildren animation */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={gridContainerVariants}
          >
            {/* IMPORTANT: Added h-full to each card for equal height */}
            <motion.div 
              className="bg-amber-50/90 border border-amber-800/20 rounded-2xl p-8 shadow-lg h-full flex flex-col"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -8, 
                boxShadow: '0 20px 35px -10px rgba(146, 64, 14, 0.2), 0 15px 15px -10px rgba(146, 64, 14, 0.2)' 
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{
                boxShadow: '0 10px 25px -5px rgba(146, 64, 14, 0.1), 0 8px 10px -6px rgba(146, 64, 14, 0.1)'
              }}
            >
              <div className="flex items-center mb-6 text-amber-900">
                <svg className="w-6 h-6 mr-2 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <label className="block text-left text-amber-900 font-semibold text-lg">Upload your Kolam</label>
              </div>
              
              {/* Content area - takes flex-grow to fill available space */}
              <div className="flex-grow flex flex-col">
                {/* Decorative kolam dots around the upload area */}
                <div className="relative mb-auto">
                  <div className="absolute -top-3 -left-3 w-6 h-6 flex items-center justify-center">
                    <motion.div 
                      className="w-2 h-2 bg-amber-700/40 rounded-full" 
                      animate={{ scale: isAnimating ? 1.2 : 1 }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 flex items-center justify-center">
                    <motion.div 
                      className="w-2 h-2 bg-amber-700/40 rounded-full" 
                      animate={{ scale: !isAnimating ? 1.2 : 1 }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 flex items-center justify-center">
                    <motion.div 
                      className="w-2 h-2 bg-amber-700/40 rounded-full" 
                      animate={{ scale: !isAnimating ? 1.2 : 1 }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 flex items-center justify-center">
                    <motion.div 
                      className="w-2 h-2 bg-amber-700/40 rounded-full" 
                      animate={{ scale: isAnimating ? 1.2 : 1 }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                  
                  <div className="relative border-2 border-dashed border-amber-700/30 rounded-xl p-4 transition-all duration-300 hover:border-amber-600/50 group cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center justify-center py-6">
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-4"
                        whileHover={{ rotate: 15 }}
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                        </svg>
                      </motion.div>
                      <p className="text-amber-900 font-medium">Click or drag to upload</p>
                      <p className="text-sm text-amber-800/70 mt-1">PNG, JPG, or GIF</p>
                    </div>
                  </div>
                </div>

                {imagePreviewUrl && (
                  <motion.div 
                    className="mt-6 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Traditional kolam-inspired corner patterns */}
                    <svg className="absolute -top-2 -left-2 w-8 h-8 text-amber-700/30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0 L8 0 Q8 8 0 8 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="4" cy="4" r="1" fill="currentColor"/>
                    </svg>
                    <svg className="absolute -top-2 -right-2 w-8 h-8 text-amber-700/30 transform scale-x-[-1]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0 L8 0 Q8 8 0 8 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="4" cy="4" r="1" fill="currentColor"/>
                    </svg>
                    <svg className="absolute -bottom-2 -left-2 w-8 h-8 text-amber-700/30 transform scale-y-[-1]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0 L8 0 Q8 8 0 8 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="4" cy="4" r="1" fill="currentColor"/>
                    </svg>
                    <svg className="absolute -bottom-2 -right-2 w-8 h-8 text-amber-700/30 transform scale-x-[-1] scale-y-[-1]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0 L8 0 Q8 8 0 8 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="4" cy="4" r="1" fill="currentColor"/>
                    </svg>
                    
                    <div className="flex justify-center items-center p-4 bg-amber-50/50 border border-amber-200 rounded-lg">
                      <img 
                        src={imagePreviewUrl?.startsWith('/') ? import.meta.env.BASE_URL + imagePreviewUrl.slice(1) : imagePreviewUrl} 
                        alt="Uploaded preview" 
                        className="rounded-lg shadow-inner border border-amber-700/20 max-h-[300px] object-contain w-full bg-white p-2"
                        style={{ boxShadow: 'inset 0 2px 6px 0 rgba(146, 64, 14, 0.1)' }}
                      />
                    </div>
                    
                    {/* Decorative dot pattern below image */}
                    <div className="flex justify-center mt-4 space-x-2">
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-amber-700/40"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-amber-700/40"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 0.5 }}
                      />
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-amber-700/40"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 1 }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Button at the bottom */}
              <div className="mt-8 text-center">
                <motion.button 
                  onClick={handleClassify}
                  disabled={!readyToClassify || isLoading}
                  whileHover={{ scale: readyToClassify && !isLoading ? 1.05 : 1, y: readyToClassify && !isLoading ? -2 : 0 }}
                  whileTap={{ scale: readyToClassify && !isLoading ? 0.95 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`relative px-8 py-3 rounded-full shadow-md text-base font-medium transition-all overflow-hidden ${
                    readyToClassify && !isLoading 
                      ? 'bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 hover:from-amber-800 hover:to-amber-700' 
                      : 'bg-amber-200/80 text-amber-700/50 cursor-not-allowed'
                  }`}
                  style={{ boxShadow: readyToClassify ? '0 4px 12px rgba(146, 64, 14, 0.15)' : 'none' }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Pattern...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Classify Kolam</span>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  
                  {readyToClassify && !isLoading && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-700/20" 
                      animate={{ x: ['100%', '-100%'] }} 
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              className="bg-amber-50/90 border border-amber-800/20 rounded-2xl p-8 shadow-lg h-full flex flex-col"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -8, 
                boxShadow: '0 20px 35px -10px rgba(146, 64, 14, 0.2), 0 15px 15px -10px rgba(146, 64, 14, 0.2)' 
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{
                
                boxShadow: '0 10px 25px -5px rgba(146, 64, 14, 0.1), 0 8px 10px -6px rgba(146, 64, 14, 0.1)'
              }}
            >
              <div className="flex items-center mb-6 text-amber-900">
                <svg className="w-6 h-6 mr-2 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h2 className="text-2xl font-bold font-serif">Kolam Analysis</h2>
              </div>
              
              {/* Content area - takes flex-grow to fill available space */}
              <div className="flex-grow flex flex-col justify-center">
                <AnimatePresence>
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16"
                    >
                      <div className="relative w-20 h-20">
                        {/* Kolam-inspired loading spinner */}
                        <motion.div 
                          className="absolute inset-0 border-4 border-amber-600/20 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div 
                          className="absolute inset-2 border-4 border-amber-600/30 rounded-full"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div 
                          className="absolute inset-4 border-4 border-amber-600/40 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute inset-0 w-full h-full flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="w-3 h-3 rounded-full bg-amber-600"/>
                        </motion.div>
                      </div>
                      <p className="mt-6 text-amber-800/90 font-medium">Analyzing Kolam pattern...</p>
                      <p className="text-sm text-amber-700/60 mt-2">Identifying traditional elements and symbols</p>
                    </motion.div>
                  ) : !isClassified ? (
                    <motion.div 
                      key="initial"
                      className="flex flex-col items-center justify-center py-12 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div 
                        className="w-28 h-28 rounded-full border-2 border-dashed border-amber-600/30 flex items-center justify-center relative"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      >
                        {/* Traditional kolam dot pattern */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="grid grid-cols-3 gap-2">
                            {[...Array(9)].map((_, i) => (
                              <motion.div 
                                key={i} 
                                className="w-2 h-2 rounded-full bg-amber-700/40"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity, 
                                  repeatType: "loop", 
                                  delay: i * 0.2, 
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        <svg className="w-10 h-10 text-amber-700/40 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        </svg>
                      </motion.div>
                      <p className="mt-6 text-amber-900/80 font-medium">
                        Upload an image and press Classify<br />to identify your Kolam pattern
                      </p>
                      
                      <motion.div 
                        className="mt-6 w-32 h-px bg-gradient-to-r from-transparent via-amber-700/20 to-transparent"
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      
                      <p className="mt-6 text-sm text-amber-800/70 italic max-w-xs">
                        Our AI can recognize traditional Kolam patterns from various regional styles
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="classified"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative rounded-xl bg-amber-100/50 border border-amber-700/10 p-6"
                    >
                      {/* Kolam-inspired decorative background pattern */}
                      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-5">
                        <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id="smallDots" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="10" cy="10" r="2" fill="currentColor" />
                            </pattern>
                            <pattern id="mediumDots" width="40" height="40" patternUnits="userSpaceOnUse">
                              <circle cx="20" cy="20" r="3" fill="currentColor" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#smallDots)" />
                          <rect width="100%" height="100%" fill="url(#mediumDots)" />
                          <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="10" fill="none" />
                          <circle cx="400" cy="400" r="250" stroke="currentColor" strokeWidth="8" fill="none" />
                          <circle cx="400" cy="400" r="200" stroke="currentColor" strokeWidth="6" fill="none" />
                          <circle cx="400" cy="400" r="150" stroke="currentColor" strokeWidth="4" fill="none" />
                        </svg>
                      </div>
                  
                      <div className="flex items-center mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/30 flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-amber-700/70 font-medium">Identified Pattern</div>
                          <div className="text-xl font-bold text-amber-900">{label}</div>
                        </div>
                      </div>
                  
                      <div className="mt-6 border-l-2 border-amber-600/30 pl-4 relative z-10">
                        <h1 className='font-bold text-lg'>Mathematical Principles</h1>
                        <h3 className='font-bold'>Graph Theory:</h3>
                        <p>The pattern is a single, continuous, closed loop (an Eulerian circuit) that begins and ends at the same point without retracing any line.</p>
                        <h3 className='font-bold'>Symmetry:</h3>
                        <p>The design maintains strict rotational and reflectional symmetry around its center and/or axes.</p>
                        <h3 className='font-bold'>Dot Scaffold:</h3>
                        <p>The pattern is constructed around a regular, symmetrical grid or array of dots (pullis).</p>
                        <h3 className='font-bold'>Single Stroke Line:</h3>
                        <p>The Kambi (line) weave around every dot individually, never passing through it, and have no open ends.</p>
                      </div>
                  
                      <div className="mt-6 flex items-center justify-between relative z-10">
                        <div className="inline-flex items-center space-x-2 text-sm text-amber-800/80">
                          <span className="inline-block w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                          <span>Confidence: 98.7%</span>
                        </div>
                        
                        <div className="text-sm text-amber-700/60 font-medium">
                          <motion.span 
                            className="inline-block mx-1 opacity-70"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 0 }}
                          >
                            ❖
                          </motion.span> 
                          Sacred 
                          <motion.span 
                            className="inline-block mx-1 opacity-70" 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 0.7 }}
                          >
                            ❖
                          </motion.span> 
                          Traditional 
                          <motion.span 
                            className="inline-block mx-1 opacity-70"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 1.4 }}
                          >
                            ❖
                          </motion.span> 
                          Auspicious
                        </div>
                      </div>
                      
                      <motion.div 
                        className="mt-6 pt-4 border-t border-amber-700/10 flex justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <motion.button 
                          className="px-5 py-2.5 bg-gradient-to-r from-amber-500/20 to-amber-700/20 hover:from-amber-500/30 hover:to-amber-700/30 rounded-lg text-sm text-amber-800 hover:text-amber-900 transition-colors flex items-center shadow-sm hover:shadow-md"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          Learn more about this Kolam pattern
                        </motion.button>
                      </motion.div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Consistent footer element to maintain equal height */}
              <div className="mt-auto pt-4 flex justify-center">
                {!isClassified && !isLoading && (
                  <motion.div 
                    className="flex items-center text-amber-700/40 text-sm"
                    animate={{ opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Ready to classify your kolam pattern
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
          
        <footer className="mt-20 bg-gradient-to-b from-amber-100/50 to-amber-200/50 backdrop-blur-sm py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-amber-700">© 2025 Aparna Bindu. Preserving tradition, inspiring creativity.</p>
          </div>
        </footer>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ClassifyKolam;