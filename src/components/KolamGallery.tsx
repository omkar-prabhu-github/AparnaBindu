import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import Background from './Background';
import { Header } from './header';

// --- Type definitions ---
interface KolamData {
  id: number;
  type: string;
  imageUrl: string;
  href?: string;
  description?: string;
}

interface KolamCardProps {
  type: string;
  imageUrl: string;
  index: number;
  href?: string;
  description?: string;
}

// --- Mock Data for the Gallery ---
const kolamData: KolamData[] = [
  {
    id: 1,
    type: 'Pulli Kolam',
    imageUrl: '/kolam_gallary/WhatsApp Image 2025-10-02 at 14.33.05.jpeg',
    href: '/gallery/pulli',
    description: 'pulli kolams are defined by a grid of dots from which the pattern is constructed and guided.'
  },
  {
    id: 2,
    type: 'Chikku Kolam',
    imageUrl: '/kolam_gallary/WhatsApp Image 2025-10-02 at 14.31.54.jpeg',
    description: 'Chikku kolams are continuous line weaves around the dots, creating an intricate, knot-like design'
  },
  {
    id: 3,
    type: 'Kambi Kolam',
    imageUrl: '/kolam_gallary/WhatsApp Image 2025-10-02 at 14.31.55.jpeg',
    description: 'Kambi kolams use simple straight lines and curves to form freehand geometric shapes'
  },
  {
    id: 4,
    type: 'Rangoli',
    imageUrl: '/kolam_gallary/WhatsApp Image 2025-10-02 at 14.31.55 (1).jpeg',
    description: 'The encompassing, colorful art of creating auspicious floor decorations across India.'
  },
];
const KolamCard: React.FC<KolamCardProps> = ({ type, imageUrl, index, href = '#', description }) => {
  return (
    <motion.div
      className="relative group col-span-1"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
    >
      <Link to={href}>
        <div className="relative flex rounded-2xl overflow-hidden shadow-xl border border-amber-300/40 bg-gradient-to-br from-amber-50/90 to-orange-50/90 backdrop-blur-sm transition-shadow duration-500 group-hover:shadow-2xl h-48">
          {/* Image Container */}
          <div className="relative w-1/2 overflow-hidden">
            <img 
              src={imageUrl?.startsWith('/') ? import.meta.env.BASE_URL + imageUrl.slice(1) : imageUrl}
              alt={type}
              className="absolute inset-0 w-full h-full bg-cover bg-center object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            
          </div>
          
          {/* Content */}
          <div className="relative w-1/2 p-4 flex flex-col justify-between bg-gradient-to-b from-amber-50/50 to-amber-50/80">
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-1 transition-colors duration-300 group-hover:text-orange-800">
                {type}
              </h3>
              {description && (
                <p className="text-amber-700/90 text-xs mb-2 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            
            {/* Action Button & Decorative Line */}
            <div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-amber-600 group-hover:text-orange-600 transition-colors">
                  <span className="font-semibold">View Details</span>
                  <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
              </div>
              <div className="h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mt-2 w-0 group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// --- Main Kolam Gallery Component ---
const KolamGallery: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add this line to define the missing state variables

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // No search/filtering
  const filteredKolams = kolamData;

  return (
    <div className="min-h-screen font-sans text-amber-900 relative overflow-x-hidden">
      <Background />

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Removed decorative background images */}
      </div>

      <div className="relative z-10">
        {/* Enhanced Header */}
       {/* Enhanced Header */}
<Header scrollY={scrollY} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* Main Content */}
        <main className="container mx-auto px-6 md:px-10 pt-20 pb-20">
          {/* Hero Section */}
          <section className="pb-12 md:pb-20 text-center">
            <div
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 text-amber-900">
                Kolam Gallery
              </h1>
              
              <p className="text-xl text-amber-700 mb-10 leading-relaxed max-w-2xl mx-auto">
                A curated collection of beautiful, community-submitted Kolam designs that celebrate 
                the rich tradition of Indian floor art.
              </p>
            </div>
          </section>

          {/* Filters removed */}
          
          {/* Gallery Grid */}
          <section>
          
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              layout
            >
              {filteredKolams.length > 0 ? (
                filteredKolams.map((kolam, index) => (
                  <KolamCard
                    key={kolam.id}
                    type={kolam.type}
                    imageUrl={kolam.imageUrl}
                    href={kolam.href}
                    index={index}
                    description={kolam.description}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="text-amber-700/50 text-xl">
                    No kolams match your search criteria.
                  </div>
                  
                </div>
              )}
            </motion.div>
          </section>

          {/* Contribution Section */}
          <motion.section 
            className="mt-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-amber-300/40 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Background */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl md:text-3xl font-bold font-serif text-amber-900 mb-3">Share Your Kolam</h3>
                <p className="text-amber-700 max-w-xl">
                  Have a beautiful kolam design to share with our community? 
                  Contribute to our growing collection and help preserve this ancient art form.
                </p>
              </div>
              
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contribute Now
              </motion.button>
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="mt-10 bg-gradient-to-b from-amber-100/50 to-amber-200/50 backdrop-blur-sm py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-amber-700">© 2025 Aparna Bindu. Preserving tradition, inspiring creativity.</p>
          </div>
        </footer>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
      `}</style>
    </div>
  );
};

export default KolamGallery;