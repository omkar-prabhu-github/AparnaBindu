import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Background from './Background';
import { Header } from './header';
import { Target, BrainCircuit, Palette, GitFork, Sparkles, ArrowDown, UserCheck } from 'lucide-react';

const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const teamMembers = [
    { name: "Vishal", role: "Team Leader" },
    { name: "Omkar", role: "Team Member" },
    { name: "Vaishnavi", role: "Team Member" },
    { name: "Amruth", role: "Team Member" },
    { name: "Nakul", role: "Team Member" },
    { name: "Niranjan", role: "Team Member" }
  ];

  return (
    <div className="min-h-screen font-sans text-amber-900 relative overflow-x-hidden">
      <Background />

      {/* Floating Decorative Elements - From home.tsx */}
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
        {/* Reusable Header Component */}
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
          {/* Hero Section */}
          <section className="pt-20 pb-12 text-center">
            <div className="max-w-4xl mx-auto">
              
              <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 text-amber-900">
                About Aparna Bindu
              </h1>

              <p className="text-2xl text-amber-700 mb-10 leading-relaxed max-w-3xl mx-auto">
                We are a passionate group dedicated to preserving the ancient art of Kolam by bridging timeless tradition with modern technology.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-12">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 md:p-16 shadow-2xl border border-amber-200/30 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 grid md:grid-cols-3 gap-12 text-center">
                  <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full">
                          <Target className="w-8 h-8 text-amber-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-amber-900 mb-2">Our Mission</h3>
                      <p className="text-amber-700 leading-relaxed">To build a vibrant digital sanctuary where the timeless art of Kolam is preserved, celebrated, and shared with the world, making it accessible for learning, creation, and appreciation across generations.</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full">
                          <BrainCircuit className="w-8 h-8 text-amber-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-amber-900 mb-2">Mindful Artistry</h3>
                      <p className="text-amber-700 leading-relaxed">Discover the meditative power of Kolam. This ancient practice calms the mind, improves focus, and serves as a therapeutic ritual that reduces stress and fosters a deep sense of inner peace.</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full">
                          <Palette className="w-8 h-8 text-amber-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-amber-900 mb-2">Cultural Heritage</h3>
                      <p className="text-amber-700 leading-relaxed">Kolam is more than art; it's a story woven into the It is a whispered code of math, art, spirituality, and ecology, performed daily, in millions of doorways. It's a secret language written in dust.</p>
                  </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-serif text-amber-900 mb-4">
                Meet the Team
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-bold text-amber-800">{member.name}</h3>
                  <p className="text-amber-600 font-semibold mb-3">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Working of Aparna Bindu Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-serif text-amber-900 mb-4">
                How Aparna Bindu Works
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="space-y-8">

                {/* Step 1: User Interaction & Pre-processing */}
                <motion.div 
                  className="flex flex-col md:flex-row items-center gap-6"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="flex-shrink-0 w-24 h-24 rounded-full bg-white/70 backdrop-blur-md border border-amber-200/50 flex items-center justify-center shadow-lg">
                    <UserCheck className="w-12 h-12 text-amber-600" />
                  </div>
                  <div className="flex-grow bg-white/60 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold font-serif text-amber-900 mb-2">1. Secure Upload & Pre-processing</h3>
                    <p className="text-amber-800 leading-relaxed">The journey starts with a user uploading a Kolam image via a secure, authenticated portal. Our server then standardizes the image, resizing and normalizing color profiles for consistent analysis.</p>
                  </div>
                </motion.div>

                <div className="flex justify-center">
                  <ArrowDown className="w-10 h-10 text-amber-400" />
                </div>

                {/* Step 2: Hybrid Classification */}
                <motion.div 
                  className="flex flex-col md:flex-row-reverse items-center gap-6"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="flex-shrink-0 w-24 h-24 rounded-full bg-white/70 backdrop-blur-md border border-amber-200/50 flex items-center justify-center shadow-lg">
                    <BrainCircuit className="w-12 h-12 text-amber-600" />
                  </div>
                  <div className="flex-grow bg-white/60 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold font-serif text-amber-900 mb-2">2. Hybrid Classification Engine</h3>
                    <p className="text-amber-800 leading-relaxed">A powerful CNN-ViT hybrid model analyzes the image. The CNN extracts fine geometric details, while the ViT understands the overall pattern, ensuring a deep and accurate classification.</p>
                  </div>
                </motion.div>

                <div className="flex justify-center">
                  <ArrowDown className="w-10 h-10 text-amber-400" />
                </div>

                {/* Step 3: Dual-Path Recreation */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="inline-block bg-white/60 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-center mb-4">
                      <div className="w-24 h-24 rounded-full bg-white/70 backdrop-blur-md border border-amber-200/50 flex items-center justify-center shadow-inner">
                        <GitFork className="w-12 h-12 text-amber-600" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-amber-900 mb-2">3. Dual-Path Recreation</h3>
                    <p className="text-amber-800 leading-relaxed max-w-2xl mx-auto">Based on the classification, the system chooses one of two paths for recreation:</p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-8 mt-8 text-left">
                    {/* Path A */}
                    <div className="flex-1 bg-white/60 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6 shadow-lg">
                      <h4 className="font-bold text-amber-800 mb-2">Path A: Geometric Reconstruction</h4>
                      <p className="text-sm text-amber-700">For complex, line-based Kolams, a hexadecimal method maps every dot and line, enabling a mathematically precise and faithful reconstruction.</p>
                    </div>
                    {/* Path B */}
                    <div className="flex-1 bg-white/60 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6 shadow-lg">
                      <h4 className="font-bold text-amber-800 mb-2">Path B: Generative Artistry</h4>
                      <p className="text-sm text-amber-700">For colorful or broad-stroked Kolams, a Generative Adversarial Network (GAN) interprets the artistic style to "paint" a new, high-fidelity version.</p>
                    </div>
                  </div>
                </motion.div>

                <div className="flex justify-center">
                  <ArrowDown className="w-10 h-10 text-amber-400" />
                </div>

                {/* Step 4: Final Output & Storage */}
                <motion.div 
                  className="flex flex-col md:flex-row items-center gap-6"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="flex-shrink-0 w-24 h-24 rounded-full bg-white/70 backdrop-blur-md border border-amber-200/50 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-12 h-12 text-amber-600" />
                  </div>
                  <div className="flex-grow bg-white/60 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold font-serif text-amber-900 mb-2">4. Final Output & Delivery</h3>
                    <p className="text-amber-800 leading-relaxed">The final, recreated Kolam is generated and stored securely in a MongoDB database. Our system, powered by TorchServe, ensures scalable, real-time delivery of this new piece of cultural heritage.</p>
                  </div>
                </motion.div>

              </div>
            </div>
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
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 2s; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.5s ease-out forwards; }

      `}</style>
    </div>
  );
};

export default About;