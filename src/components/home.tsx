import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shapes, DraftingCompass, Clock, Users, Heart, Brush, ChevronRight } from 'lucide-react';
import { Header } from './header';
import { Footer } from './footer';
import Background from './Background';

// Mock Data for Featured Kolams
const featuredKolams = [
  {
    id: 1,
    type: 'Classify Kolam',
    icon: Shapes,
    description: 'Learn to identify traditional patterns',
    link: '/classify',
  },
  {
    id: 2,
    type: 'Design a Kolam',
    icon: DraftingCompass,
    description: 'design your own kolams',
    link: '/design-kolam',
  },
];

// Stats Data
const stats = [
  { icon: Clock, value: '5000+', label: 'Years of Tradition' },
  { icon: Users, value: '50M+', label: 'Active Practitioners' },
  { icon: Heart, value: '500+', label: 'Pattern Types' },
];

// Kolam Card Component
interface KolamCardProps {
  type: string;
  icon: React.ElementType;
  description: string;
  link: string;
}

const KolamCard: React.FC<KolamCardProps> = ({ type, icon: Icon, description, link }) => {
  return (
    <Link to={link} className="block group">
      <div className="relative rounded-2xl overflow-hidden shadow-lg h-full border border-transparent bg-gradient-to-br from-orange-100 via-orange-100 to-orange-200 text-amber-900 p-8 flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 flex-grow flex flex-col">
          <div className="mb-6">
            <Icon className="w-16 h-16 text-amber-700 group-hover:text-amber-900 transition-colors duration-300" />
          </div>
          <h3 className="text-3xl font-bold mb-3">{type}</h3>
          <p className="text-amber-800 leading-relaxed mb-6 flex-grow">{description}</p>
          <div className="mt-auto flex items-center justify-between font-semibold">
            <span>Explore Feature</span>
            <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  

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
          className="absolute top-20 right-10 w-32 h-32 opacity-20 animate-float"
          style={{
            
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            animation: "float 6s ease-in-out infinite"
          }}
        />
        <div 
          className="absolute bottom-20 left-10 w-24 h-24 opacity-20 animate-float-delayed"
          style={{
            
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            animation: "float 8s ease-in-out infinite 2s"
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
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

        {/* Main Content */}
        <main className="container mx-auto px-6 md:px-10 flex-grow pb-16">
            <section className="pt-20 pb-6 text-center">
              <div className="max-w-4xl mx-auto">
                
                <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 text-amber-900">
                  Welcome to the World of Kolam
                </h1>
                
                <p className="text-2xl text-amber-700 mb-10 leading-relaxed max-w-2xl mx-auto">
                  Immerse yourself in the timeless beauty of South Indian floor art. 
                  Learn, create, and preserve this sacred tradition that connects us to our heritage.
                </p>
              </div>
            </section>
            {/* Featured Kolams */}
            <section className="pt-0 pb-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold font-serif text-amber-900 mb-4">
                  Explore Our Features
                </h2>
                {/* Animated divider */}
                <div className="w-24 h-1 mx-auto bg-gradient-to-r from-amber-400 to-orange-400 rounded-full section-divider"></div>
              </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {featuredKolams.map((kolam) => (
                <KolamCard key={kolam.id} {...kolam} />
              ))}
            </div>
          </section>

          {/* Stats Section moved below feature cards */}
          <section className="py-12 border-y border-amber-200/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full group-hover:scale-110 transition-transform">
                    <stat.icon className="w-8 h-8 text-amber-700 icon-animate" />
                  </div>
                  <h3 className="text-3xl font-bold text-amber-900 mb-2">{stat.value}</h3>
                  <p className="text-amber-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* History Section */}
          <section className="py-20">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 md:p-16 shadow-2xl border border-amber-200/30 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold font-serif text-amber-900 mb-4">
                    A Heritage of Kolams
                  </h2>
                  <div className="w-32 h-1 mx-auto bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                </div>

                {/* Rewritten Heritage narrative */}
                <div className="max-w-4xl mx-auto mb-12">
                  <p className="text-xl md:text-2xl leading-relaxed text-amber-800 font-medium mb-6">
                    The vibrant art of Kolam is an <span className="text-amber-600 font-bold">ancient cosmic code</span> woven into the very fabric of daily life in South India. 
                  </p>
                  
                  <p className="text-lg leading-relaxed text-amber-700/90 mb-6 font-serif">
                    For over 5,000 years, women have risen before dawn to transform the earth at their doorsteps into breathtaking geometric tapestries. Mentioned in grand epics like the Ramayana and ancient Vedic scriptures, this is not just art—it is a sacred invitation to <span className="font-bold text-amber-900">Lakshmi, the goddess of prosperity and wealth</span>.
                  </p>

                  <p className="text-lg leading-relaxed text-amber-700/90 mb-6 font-serif">
                    Every curve and dot in a Kolam carries profound mathematical symmetry and ecological wisdom. Traditionally drawn with coarse rice flour, these intricate patterns serve as a humble morning feast for ants, birds, and tiny creatures, symbolizing a beautiful and unspoken coexistence with nature.
                  </p>

                  <div className="mt-10 px-8 py-6 border-l-4 border-r-4 border-amber-400 bg-amber-500/5 rounded-2xl shadow-inner">
                    <p className="text-xl leading-relaxed text-amber-900 font-serif italic text-center">
                      "Passed down purely through the hands of mothers and daughters over countless generations, Kolam remains one of the world's oldest surviving forms of generative art. It is a daily meditation, a whispered prayer in dust, and a mesmerizing testament to the harmony of the universe."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        
      `}</style>
    </div>
  );
};

export default Home;