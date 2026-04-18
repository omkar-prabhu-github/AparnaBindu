import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Background from './Background';
import { Header } from './header';
import { Footer } from './footer';
import { Trophy, Network, Microscope, Code, LayoutDashboard, BrainCircuit, UploadCloud, Server, Database } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col font-sans text-amber-900 relative overflow-x-hidden bg-amber-50/30">
      <Background />

      <div className="relative z-10 flex flex-col flex-grow w-full">
        <Header scrollY={scrollY} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <main className="container mx-auto px-4 sm:px-6 md:px-10 pt-16 md:pt-20 pb-24 flex-grow">
          {/* Hero Section */}
          <section className="text-center max-w-5xl mx-auto mb-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 leading-tight mt-4">
                Our Journey with <br /> Aparna Bindu
              </h1>

              <p className="text-xl md:text-2xl text-amber-800/90 leading-relaxed font-medium max-w-3xl mx-auto">
                What started as a vision to preserve the ancient geometric art of South India evolved into a powerful hybrid AI engine. Here is the story behind our project.
              </p>
            </motion.div>
          </section>

          {/* SIH Story / Timeline Section */}
          <section className="max-w-5xl mx-auto mb-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-serif text-amber-900 mb-4">
                The Hackathon Story
              </h2>
              <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Step 1 */}
              <motion.div
                className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-amber-500/10 transition-all duration-300 relative overflow-hidden group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "50px" }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-200/50 rounded-full blur-3xl group-hover:bg-orange-300/40 transition-colors pointer-events-none"></div>
                <h3 className="text-2xl font-bold font-serif text-amber-900 mb-3 relative z-10">Version 1.0: The CNN Model</h3>
                <p className="text-amber-800/90 leading-relaxed relative z-10">
                  We began our prototyping phase by building a standard Convolutional Neural Network (CNN) to classify Kolam patterns. The initial model performed reliably on foundational designs, achieving an <strong className="text-orange-700">80% accuracy threshold</strong>. However, given the immense mathematical intricacy and intertwined loops of advanced Kolams, we knew a basic CNN alone wouldn't map the deepest geometric contexts.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-orange-500/10 transition-all duration-300 relative overflow-hidden group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "50px" }}
              >
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-amber-200/50 rounded-full blur-3xl group-hover:bg-amber-300/40 transition-colors pointer-events-none"></div>
                <h3 className="text-2xl font-bold font-serif text-amber-900 mb-3 relative z-10">Version 2.0: The Hybrid Model</h3>
                <p className="text-amber-800/90 leading-relaxed relative z-10">
                  To shatter the 80% ceiling, we completely re-architected the system into a <strong className="text-red-700">CNN-ViT Hybrid Model</strong>. We utilized the CNN to extract local, fine-grained geometric details, while employing a Vision Transformer (ViT) to grasp the global context and topological symmetry. This dual-pipeline breakthrough empowered our engine to master highly complex variations, catapulting our accuracy to an impressive <strong className="text-red-700">88%</strong>.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="bg-gradient-to-br from-orange-400 to-red-600 md:col-span-2 rounded-3xl p-[2px] shadow-2xl relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
              >
                <div className="bg-amber-50/95 backdrop-blur-xl rounded-[22px] p-8 md:p-12 h-full relative overflow-hidden">
                  {/* Decorative faint trophy */}
                  <Trophy className="absolute -right-10 md:right-4 top-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 text-orange-500/5 pointer-events-none" />

                  <div className="relative z-10 max-w-4xl">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-800 font-bold text-sm mb-6 uppercase tracking-wider backdrop-blur-md">
                      The Final Pitch
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-orange-800 to-red-800 mb-5">
                      SIH Finalists
                    </h3>
                    <p className="text-lg text-amber-900/80 leading-relaxed max-w-3xl">
                      Armed with our cutting-edge hybrid classification architecture and a seamless UI, we fiercely competed in the <strong>Smart India Hackathon (SIH)</strong>. Our model's architectural innovation, speed, and our pure dedication to preserving heritage art propelled us to the finals, proudly standing out among the brilliant teams across the nation.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Core Modules */}
          <section className="mb-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-100/30 to-transparent pointer-events-none blur-3xl"></div>
            <div className="relative z-10 text-center mb-16">
              <h2 className="text-4xl font-bold font-serif text-amber-900 mb-4">
                What We Built
              </h2>
              <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
              <p className="text-lg text-amber-800/80 mt-6 max-w-2xl mx-auto">
                Aparna Bindu is beautifully streamlined into two primary technical achievements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto relative z-10">
              <div className="bg-white/50 backdrop-blur-md rounded-3xl p-10 border border-amber-200/60 hover:border-amber-400 transition-colors shadow-lg group">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
                  <BrainCircuit className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-amber-900 mb-4">Deep Classification Engine</h3>
                <p className="text-amber-800 leading-relaxed">
                  Our core SIH backend marvel. It securely ingests user uploads and runs them through our highly accurate CNN-ViT hybrid architecture in real-time. It analyzes the mathematical grid logic, pulling structural intelligence to accurately predict and classify historical and regional design taxonomies.
                </p>
              </div>

              <div className="bg-white/50 backdrop-blur-md rounded-3xl p-10 border border-amber-200/60 hover:border-amber-400 transition-colors shadow-lg group">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
                  <LayoutDashboard className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-amber-900 mb-4">Interactive Kolam Designer</h3>
                <p className="text-amber-800 leading-relaxed">
                  A digital workspace empowering users to construct their own Kolam grid overlays. Furnished with an intuitive interface and visual grid system, the designer acts as a creative sandbox for everyone from traditional artists to computational beginners mapping geometries digitally.
                </p>
              </div>
            </div>
          </section>

          {/* Architecture Section */}
          <section className="mb-24 relative">
            <div className="relative z-10 text-center mb-16">
              <h2 className="text-4xl font-bold font-serif text-amber-900 mb-4">
                Architecture Flow
              </h2>
              <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
              <p className="text-lg text-amber-800/80 mt-6 max-w-2xl mx-auto">
                Our scalable, AI-driven pipeline developed for seamless Kolam processing.
              </p>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Step 1 */}
                <div className="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-lg text-center relative group hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-amber-900/5 select-none pointer-events-none group-hover:text-amber-900/10 transition-colors">1</div>
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mb-6 border border-amber-300 text-amber-700 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-serif text-amber-900 mb-3">Data Ingestion</h4>
                  <p className="text-sm text-amber-800/90 leading-relaxed">Secure portal upload. Images are instantly standardized, resized, and normalized for consistent tensor analysis.</p>
                </div>

                {/* Step 2 */}
                <div className="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-lg text-center relative group hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-amber-900/5 select-none pointer-events-none group-hover:text-amber-900/10 transition-colors">2</div>
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-6 border border-orange-300 text-orange-700 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <BrainCircuit className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-serif text-amber-900 mb-3">Hybrid AI Engine</h4>
                  <p className="text-sm text-amber-800/90 leading-relaxed">Processed through our CNN-ViT architecture. CNN extracts local geometry while ViT understands global topology.</p>
                </div>

                {/* Step 3 */}
                <div className="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-lg text-center relative group hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-amber-900/5 select-none pointer-events-none group-hover:text-amber-900/10 transition-colors">3</div>
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mb-6 border border-red-300 text-red-700 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Server className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-serif text-amber-900 mb-3">TorchServe</h4>
                  <p className="text-sm text-amber-800/90 leading-relaxed">Model inference is dynamically managed via TorchServe handlers, ensuring low-latency bounding and parallel processing.</p>
                </div>

              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-serif text-amber-900 mb-4">
                Meet the Team
              </h2>
              <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6"></div>
              <p className="text-lg text-amber-800/80">The engineers and creatives behind Aparna Bindu.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-white/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg border border-white/50 hover:bg-white/60 hover:-translate-y-1 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-amber-200/80 to-amber-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <Code className="w-6 h-6 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900">{member.name}</h3>
                  <p className="text-amber-700/80 font-medium text-sm mt-1">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </div>
  );
};

export default About;