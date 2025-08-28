import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './header';
import Background from './Background';

const kolamImages = [
  '/rectreate_kolams/10.jpg',
  '/rectreate_kolams/2.jpg',
  '/rectreate_kolams/3.jpg',
  '/rectreate_kolams/4.jpg',
  '/rectreate_kolams/5.jpg',
  '/rectreate_kolams/7.jpg',
  '/rectreate_kolams/8.jpg'
];

const RecreateKolam: React.FC = () => {
  const [activeImage, setActiveImage] = useState(kolamImages[0]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'describe'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll for header effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = e => setImagePreviewUrl(String(e.target?.result || ''));
    reader.readAsDataURL(file);
    setActiveTab('upload');
  };

  const handleRecreate = () => {
    if (!imagePreviewUrl && !prompt) return;
    
    setIsLoading(true);
    
    // Demo: simulate loading and then show results
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 2000);
  };



  return (
    <div className="min-h-screen font-sans text-amber-900 relative overflow-x-hidden">
      <Background />
      
      {/* Animated Background Elements - Consistent with other pages */}
      <div className="fixed inset-0 z-0 overflow-hidden opacity-20">
        {/* Removed all decorative background images, kept only color */}
      </div>
      
      {/* Border decorations removed */}

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
          {/* Ornate title section */}
          <div className="relative mb-16 pt-16">
            {/* Decorative kolam dot pattern behind title */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-60 h-60 opacity-5">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-900">
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="10" r="5" fill="currentColor" />
                <circle cx="100" cy="190" r="5" fill="currentColor" />
                <circle cx="10" cy="100" r="5" fill="currentColor" />
                <circle cx="190" cy="100" r="5" fill="currentColor" />
                <circle cx="130" cy="30" r="3" fill="currentColor" />
                <circle cx="170" cy="60" r="3" fill="currentColor" />
                <circle cx="170" cy="140" r="3" fill="currentColor" />
                <circle cx="130" cy="170" r="3" fill="currentColor" />
                <circle cx="70" cy="170" r="3" fill="currentColor" />
                <circle cx="30" cy="140" r="3" fill="currentColor" />
                <circle cx="30" cy="60" r="3" fill="currentColor" />
                <circle cx="70" cy="30" r="3" fill="currentColor" />
              </svg>
            </div>
            
            {/* Title with animated decoration */}
            <motion.div 
              className="text-center relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold font-serif text-amber-900">
                Recreate Kolam
              </h1>
              
              <motion.div 
                className="w-40 h-2 mx-auto my-4 bg-gradient-to-r from-amber-600/30 via-amber-600/80 to-amber-600/30 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 160 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              ></motion.div>
              
              <p className="text-lg text-amber-800/90 mt-3 mb-4 max-w-2xl mx-auto">
                <span className="italic font-light">"Transform inspiration into new artistic expressions"</span>
              </p>
              
              <p className="text-sm text-amber-700/80 max-w-xl mx-auto">
                Upload a kolam image or describe your idea, and watch as our AI recreates it in your chosen style
              </p>
            </motion.div>
            
            {/* Decorative elements removed */}
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Main content area */}
            <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-800/30 rounded-xl p-6 md:p-8 shadow-md">
              {/* Input Tabs */}
              <div className="flex border-b border-amber-800/20 mb-6">
                <motion.button
                  className={`px-4 py-2 font-medium rounded-t-lg relative ${activeTab === 'upload' ? 'text-amber-900' : 'text-amber-700/70 hover:text-amber-900/80'}`}
                  onClick={() => setActiveTab('upload')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upload Image
                  </span>
                  {activeTab === 'upload' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600"
                      layoutId="activeTabIndicator"
                    />
                  )}
                </motion.button>
                
                <motion.button
                  className={`px-4 py-2 font-medium rounded-t-lg relative ${activeTab === 'describe' ? 'text-amber-900' : 'text-amber-700/70 hover:text-amber-900/80'}`}
                  onClick={() => setActiveTab('describe')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Describe Kolam
                  </span>
                  {activeTab === 'describe' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600"
                      layoutId="activeTabIndicator"
                    />
                  )}
                </motion.button>
              </div>
              
              {/* Input Area */}
              <div >
                {/* Left Column: Input */}
                <div className="lg:col-span-2">
                  <AnimatePresence mode="wait">
                    {activeTab === 'upload' ? (
                      <motion.div 
                        key="upload"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        {/* Upload Area */}
                        <div className="relative border-2 border-dashed border-amber-400/50 rounded-xl p-4 transition-all duration-300 hover:border-amber-600/50 h-full">
                          <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          
                          {!imagePreviewUrl ? (
                            <div className="flex flex-col items-center justify-center py-16">
                              <motion.div 
                                className="w-20 h-20 rounded-full bg-amber-100/90 flex items-center justify-center text-amber-700 mb-6"
                                whileHover={{ rotate: 15 }}
                                animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                              >
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                              </motion.div>
                              <p className="text-amber-900 font-medium text-lg">Upload a Kolam image</p>
                              <p className="text-sm text-amber-700/80 mt-2">Drag and drop or click to browse</p>
                              
                              {/* Decorative kolam dot pattern */}
                              <div className="mt-8 grid grid-cols-3 gap-4">
                                {[...Array(9)].map((_, i) => (
                                  <motion.div 
                                    key={i}
                                    className="w-3 h-3 rounded-full bg-amber-700/20"
                                    animate={{ scale: i % 2 === 0 ? [1, 1.3, 1] : [1.3, 1, 1.3] }}
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
                          ) : (
                            <div className="relative">
                              {/* Image preview */}
                              <img 
                                src={imagePreviewUrl?.startsWith('/') ? import.meta.env.BASE_URL + imagePreviewUrl.slice(1) : imagePreviewUrl}
                                alt="Uploaded kolam" 
                                className="w-full h-64 object-contain rounded-lg" 
                              />
                              
                              {/* Remove button */}
                              <button 
                                onClick={() => setImagePreviewUrl(null)}
                                className="absolute top-2 right-2 w-8 h-8 bg-amber-50/90 rounded-full flex items-center justify-center text-amber-900 hover:bg-amber-50 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="describe"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <div className="h-full flex flex-col">
                          <textarea 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the kolam you envision... (e.g., 'A traditional kolam with lotus motifs and peacock patterns')"
                            className="w-full h-64 p-4 rounded-lg border border-amber-400/50 bg-amber-50/60 focus:border-amber-600 focus:ring focus:ring-amber-400/30 focus:outline-none transition-colors resize-none"
                          />
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            {['Traditional pattern', 'Intricate design', 'Floral motifs', 'Peacock theme'].map((suggestion) => (
                              <motion.button
                                key={suggestion}
                                onClick={() => setPrompt(prev => prev ? `${prev}, ${suggestion.toLowerCase()}` : suggestion)}
                                className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm hover:bg-amber-200 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                + {suggestion}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Right Column: Style Selector */}
                
              </div>
              
              {/* Action Button */}
              <div className="mt-8 text-center">
                <motion.button
                  onClick={handleRecreate}
                  disabled={(!imagePreviewUrl && !prompt)  || isLoading}
                  className={`px-8 py-3 rounded-full font-medium shadow-lg inline-flex items-center space-x-2 ${
                    (!imagePreviewUrl && !prompt) || isLoading
                      ? 'bg-amber-300/50 text-amber-700/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-amber-700 text-white hover:shadow-xl'
                  }`}
                  whileHover={(!imagePreviewUrl && !prompt) || isLoading ? {} : { scale: 1.03 }}
                  whileTap={(!imagePreviewUrl && !prompt) || isLoading ? {} : { scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing</span>
                    </>
                  ) : (
                    <>
                      <span>Recreate Kolam</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Results Section - only shown after generation */}
            <AnimatePresence>
              {showResults && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6 }}
                  className="mt-16"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold font-serif text-amber-900">Your Recreated Kolams</h2>
                    <p className="text-amber-800/80 mt-2">Explore these AI-generated interpretations based on your input</p>
                  </div>
                  <motion.div
                    className="max-w-4xl mx-auto mb-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-700/20 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <div className="md:col-span-1">
                      <img 
                        src={activeImage?.startsWith('/') ? import.meta.env.BASE_URL + activeImage.slice(1) : activeImage} 
                        alt="Featured Generated Kolam" 
                        className="w-full h-full object-cover min-h-[300px] md:min-h-[350px]"
                      />
                    </div>
                    <div className="md:col-span-1 p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-amber-900 mb-2">Recreated Kolam</h3>
                      <p className="text-amber-800/80 text-sm mb-4">
                        This version most closely matches your input.
                      </p>
                      <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mb-6"></div>
                      <div className="flex flex-col space-y-3">
                        <div className="flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-semibold flex items-center justify-center space-x-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            <span>Download</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-semibold flex items-center justify-center space-x-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            <span>Favorite</span>
                          </motion.button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full px-6 py-3 rounded-full bg-amber-600 text-white font-semibold flex items-center justify-center space-x-2 text-lg"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span>Animate</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {kolamImages.slice(1).map((src, idx) => (
                      <motion.div
                        key={idx}
                        onClick={() => setActiveImage(src)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.2 }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-amber-700/10 group cursor-pointer"
                      >
                        <div className="relative overflow-hidden">
                          <img 
                            src={src?.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src} 
                            alt={`Generated Kolam ${idx + 1}`} 
                            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/80 to-transparent p-3">
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <p className="text-amber-900/80 text-sm">
                              Version {idx + 1}
                            </p>
                            
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 hover:bg-amber-200"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 hover:bg-amber-200"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 hover:bg-amber-200"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        <footer className="mt-20 bg-gradient-to-b from-amber-100/50 to-amber-200/50 backdrop-blur-sm py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-amber-700">© 2025 Aparna Bindu. Preserving tradition, inspiring creativity.</p>
          </div>
        </footer>
        </main>
      </div>
    </div>
  );
};

export default RecreateKolam;