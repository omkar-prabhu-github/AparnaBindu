import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Users, Heart, Shapes, Brush, DraftingCompass } from 'lucide-react';
import { Header } from './header';
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
    type: 'Recreate Kolam',
    icon: Brush,
    description: 'Create your own unique pattern',
    link: '/recreate',
  },
  {
    id: 3,
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

      <div className="relative z-10">
        {/* Enhanced Header */}
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

        {/* Hero Section */}
        <main className="container mx-auto px-6 md:px-10">
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredKolams.slice(0, 3).map((kolam) => (
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

                {/* Heritage narrative */}
                <div className="max-w-4xl mx-auto mb-12 text-amber-700">
                  <p className="leading-relaxed mb-4">
                    The vibrant art of Kolam is a daily ritual in millions of homes across South India. More than just a simple drawing, it is a spiritual and cultural practice that connects us to our history and to nature.
                  </p>
                  <p className="leading-relaxed mb-4">
                    It is mentioned in the Vedic scriptures and also made references in the Ramayana. For thousands of years, women have risen before sunrise to cleanse the earth and adorn their doorways with these beautiful geometric patterns. The Kolam is an ancient symbol, an intricate diagram meant to welcome the Hindu goddess of wealth, Lakshmi, and usher in prosperity and good fortune.
                  </p>
                  <p className="leading-relaxed mb-4">
                    But its meaning runs even deeper. Traditionally, Kolam is drawn with rice flour, a humble offering to feed tiny creatures like ants and birds. It is a daily reminder of our place in the ecosystem, a simple act of charity that says, "We share this world with all beings."
                  </p>
                  <p className="leading-relaxed">
                    This art form, passed down from mothers to daughters, is a form of daily meditation. It requires focus and a steady hand, turning a simple ritual into a moment of peace and devotion. So, the next time you see a Kolam, remember it is not just an adornment, but as a story of tradition, devotion, and a deep-seated respect for the harmony of the universe.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-bold text-amber-800 mb-3 flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-amber-600" />
                        Living Tradition
                      </h3>
                      <p className="text-amber-700 leading-relaxed">
                        Today, millions of homes across South India begin each day with a fresh Kolam at their threshold.
                        This daily ritual represents renewal, welcomes prosperity, and maintains an unbroken chain
                        of cultural transmission from mother to daughter across countless generations.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-bold text-amber-800 mb-3 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-amber-600" />
                        Modern Evolution
                      </h3>
                      <p className="text-amber-700 leading-relaxed">
                        While honoring traditional forms, contemporary Kolam artists explore new expressions,
                        incorporating modern themes and technologies. This evolution ensures the art form remains
                        vibrant and relevant, bridging ancient wisdom with contemporary creativity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 text-center">
           
              
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