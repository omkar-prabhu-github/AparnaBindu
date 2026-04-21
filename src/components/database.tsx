import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from './header';
import Background from './Background';
import { ChevronRight, Bot, BrainCircuit } from 'lucide-react';



// --- Dot Pattern Component ---
const DotPattern: React.FC<{ rows: number[], dotColor?: string }> = ({ rows, dotColor = "text-amber-900" }) => {
  const dots = [];
  const maxDots = Math.max(...rows);
  const numRows = rows.length;
  
  // Use a single dimension for spacing to ensure a 1:1 aspect ratio
  const containerSize = 150;
  const dotSpacing = containerSize / (maxDots > 1 ? maxDots - 1 : 1);
  const totalHeight = (numRows - 1) * dotSpacing;
  
  const startY = (containerSize - totalHeight) / 2;

  for (let i = 0; i < numRows; i++) {
    const numDots = rows[i];
    const rowWidth = (numDots - 1) * dotSpacing;
    const startX = (containerSize - rowWidth) / 2;
    
    for (let j = 0; j < numDots; j++) {
      dots.push({
        cx: 25 + startX + j * dotSpacing,
        cy: 25 + startY + i * dotSpacing,
      });
    }
  }

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {dots.map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={4}
          className={dotColor}
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.02 }}
        />
      ))}
    </svg>
  );
};


// --- Reusable Gallery Card Component (Updated to match home.tsx) ---
interface KolamCardProps {
  title: string;
  description: string;
  link: string;
  isGenerative?: boolean;
  pattern?: number[];
  isSquare?: boolean;
  patternBg?: string;
  dotColor?: string;
}

const KolamCard: React.FC<KolamCardProps> = ({ title, description, link, isGenerative, pattern, patternBg = "bg-amber-50", dotColor }) => {
  return (
    <motion.div
      className="block group bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={link} className="flex flex-col h-full">
        <div className={`relative h-48 ${patternBg} rounded-lg overflow-hidden flex items-center justify-center p-4 mb-6 border border-amber-200/50`}>
          {pattern && <DotPattern rows={pattern} dotColor={dotColor} />}
          
          {isGenerative && (
            <div className="text-amber-900">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <BrainCircuit size={80} strokeWidth={1.5} />
              </motion.div>
            </div>
          )}
          {isGenerative && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
              <Bot className="w-4 h-4 mr-1" />
              AI Generated
            </div>
          )}
        </div>
        <div className="text-center flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-amber-900 mb-2">{title}</h3>
          <p className="text-amber-700/90 leading-relaxed flex-grow">{description}</p>
        </div>
        <div className="mt-6 flex items-center justify-center font-semibold text-amber-800 group-hover:text-amber-900 transition-colors">
            <span>View Patterns</span>
            <ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
};


const Database = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans text-amber-900 relative overflow-x-hidden">
      <Background />

      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            
            backgroundSize: "400px 400px",
            backgroundRepeat: "repeat",
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        />
      </div>

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-20 right-10 w-32 h-32 opacity-20"
          style={{
            
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            animation: "float 6s ease-in-out infinite"
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-24 h-24 opacity-20"
          style={{
            
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            animation: "float 8s ease-in-out infinite 2s"
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced Header */}
        <Header scrollY={scrollY} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bg-amber-50/95 backdrop-blur-lg shadow-xl z-40" style={{ animation: "slideDown 0.5s ease-out forwards" }}>
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

        {/* Content Container */}
        <main className="container mx-auto px-6 md:px-10">
          <section className="pt-20 pb-12 text-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 text-amber-900">
                  Kolam Database
                </h1>
                <p className="text-2xl text-amber-700 mb-10 leading-relaxed max-w-2xl mx-auto">
                  Browse through a curated digital library of traditional and algorithmically generated Kolam patterns.
                </p>
            </div>
          </section>

          {/* Featured Kolams Section */}
          <section className="pb-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-serif text-amber-900 mb-4">
                Pattern Categories
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <KolamCard
                title="1-5-1 Kolam"
                description="A complete collection of patterns based on the 1-5-1 grid."
                link="/database/1-5-1"
                pattern={[1, 3, 5, 3, 1]}
                patternBg="bg-amber-900"
                dotColor="text-orange-100"
              />
              <KolamCard
                title="1-7-1 Kolam"
                description="A complete collection of patterns based on the 1-7-1 grid."
                link="#"
                pattern={[1, 3, 5, 7, 5, 3, 1]}
                patternBg="bg-amber-900"
                dotColor="text-orange-100"
              />
              <KolamCard
                title="5x5 Kolam"
                description="A complete collection of patterns based on the 5x5 grid."
                link="#"
                pattern={[5, 5, 5, 5, 5]}
                patternBg="bg-amber-900"
                dotColor="text-orange-100"
              />
            </div>
            <div className="mt-8 flex justify-center">
                <div className="w-full md:w-2/3 lg:w-2/5">
                    <KolamCard
                      title="Generative Kolams"
                      description="Explore AI-generated Kolam designs from text prompts or images."
                      link="#"
                      isGenerative
                    />
                </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-20 bg-gradient-to-b from-amber-100/50 to-amber-200/50 backdrop-blur-sm py-12">
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
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Database;