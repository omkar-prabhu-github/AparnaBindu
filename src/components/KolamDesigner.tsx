import React, { useState, useRef, useEffect } from 'react';
import { Header } from './header';
import Background from './Background';

interface IntersectionData {
  [key: string]: number;
}

const getIntersectionData = (hexCode: string): IntersectionData => {
    const intersectionMap: { [key: string]: string[] } = {
        'digit_0': ['2,0.5', '2.5,1', '1.5,1', '2,1.5'],
        'digit_1': ['1,1.5', '1.5,2', '0.5,2', '1,2.5'],
        'digit_2': ['3,1.5', '3.5,2', '2.5,2', '3,2.5'],
        'digit_3': ['2,2.5', '2.5,3', '1.5,3', '2,3.5'],
    };

    const data: IntersectionData = {};
    const paddedHexCode = hexCode.padEnd(4, '0');

    for (let i = 0; i < paddedHexCode.length; i++) {
        const hexDigit = paddedHexCode[i];
        const bits = parseInt(hexDigit, 16).toString(2).padStart(4, '0');
        const coords = intersectionMap[`digit_${i}`];
        for (let j = 0; j < bits.length; j++) {
            data[coords[j]] = parseInt(bits[j], 2);
        }
    }
    return data;
};

const getIntersectionData171 = (hexCode: string): IntersectionData => {
    const binaryString = hexCode.split('').map(c => parseInt(c, 16).toString(2).padStart(4, '0')).join('');
    const data: IntersectionData = {};
    
    const allCoords = [
        '3,0.5', '2,1.5', '3,1.5', '4,1.5', '1,2.5', '2,2.5', '3,2.5', '4,2.5', '5,2.5',
        '1,3.5', '2,3.5', '3,3.5', '4,3.5', '5,3.5', '2,4.5', '3,4.5', '4,4.5', '3,5.5',
        '2.5,1', '3.5,1', '1.5,2', '2.5,2', '3.5,2', '4.5,2', '0.5,3', '1.5,3', '2.5,3',
        '3.5,3', '4.5,3', '5.5,3', '1.5,4', '2.5,4', '3.5,4', '4.5,4', '2.5,5', '3.5,5'
    ];

    // Initialize all intersections to state 0 (lines)
    allCoords.forEach(coord => {
        data[coord] = 0;
    });

    for (let i = 0; i < binaryString.length && i < allCoords.length; i++) {
        data[allCoords[i]] = parseInt(binaryString[i], 2);
    }
    
    return data;
};

const KolamDesigner: React.FC = () => {
  const [hexCode, setHexCode] = useState('0000');
  const [hexCode171, setHexCode171] = useState('000000000');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef171 = useRef<HTMLCanvasElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    handleGenerate();
    handleGenerate171();
  }, []);

  const drawKolam = (canvas: HTMLCanvasElement, data: IntersectionData) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = 80;
    const canvasSize = 5 * scale;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(scale / 2, scale / 2);

    const arcProps = { color: 'black', lw: 2.0 };
    const crossProps = { color: 'black', lw: 2.0 };
    
    const outerArcsParams = [
        { center: [2, 0], w: 0.7, h: 0.7, angle: 0, t1: 135, t2: 405 },
        { center: [1, 1], w: 0.7, h: 0.7, angle: -45, t1: 180, t2: 360 },
        { center: [3, 1], w: 0.7, h: 0.7, angle: 45, t1: 180, t2: 360 },
        { center: [0, 2], w: 0.7, h: 0.7, angle: 0, t1: 45, t2: 315 },
        { center: [4, 2], w: 0.7, h: 0.7, angle: 0, t1: -135, t2: 135 },
        { center: [1, 3], w: 0.7, h: 0.7, angle: 45, t1: 0, t2: 180 },
        { center: [3, 3], w: 0.7, h: 0.7, angle: -45, t1: 0, t2: 180 },
        { center: [2, 4], w: 0.7, h: 0.7, angle: 0, t1: -45, t2: 225 },
    ];

    const pulliDots: [number, number][] = [];
    for (let r = 0; r < 5; r++) {
      const numDots = 5 - 2 * Math.abs(r - 2);
      const startX = Math.abs(r - 2);
      for (let i = 0; i < numDots; i++) {
        const c = startX + i;
        pulliDots.push([c, r]);
      }
    }

    const yellowStyleCoords = new Set(['2,0.5', '1,1.5', '2,1.5', '3,1.5', '1,2.5', '2,2.5', '3,2.5', '2,3.5']);
    const greenStyleCoords = new Set(['1.5,1', '2.5,1', '0.5,2', '1.5,2', '2.5,2', '3.5,2', '1.5,3', '2.5,3']);

    pulliDots.forEach(([c, r]) => {
        ctx.beginPath();
        ctx.arc(c * scale, r * scale, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    });

    outerArcsParams.forEach(p => {
        ctx.strokeStyle = arcProps.color;
        ctx.lineWidth = arcProps.lw;
        ctx.beginPath();
        const radius = (p.w / 2) * scale;
        ctx.ellipse(p.center[0] * scale, p.center[1] * scale, radius, radius, p.angle * Math.PI / 180, p.t1 * Math.PI / 180, p.t2 * Math.PI / 180);
        ctx.stroke();
    });

    Object.keys(data).forEach(coordStr => {
        const state = data[coordStr];
        const [ix, iy] = coordStr.split(',').map(Number);

        if (state === 1) {
            ctx.beginPath();
            ctx.arc(ix * scale, iy * scale, 6, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();

            const crossHalfLength = 0.25 * scale;
            ctx.strokeStyle = crossProps.color;
            ctx.lineWidth = crossProps.lw;
            ctx.beginPath();
            ctx.moveTo((ix * scale) - crossHalfLength, (iy * scale) - crossHalfLength);
            ctx.lineTo((ix * scale) + crossHalfLength, (iy * scale) + crossHalfLength);
            ctx.moveTo((ix * scale) + crossHalfLength, (iy * scale) - crossHalfLength);
            ctx.lineTo((ix * scale) - crossHalfLength, (iy * scale) + crossHalfLength);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(ix * scale, iy * scale, 6, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.fill();
            ctx.stroke();

            ctx.strokeStyle = arcProps.color;
            ctx.lineWidth = arcProps.lw;
            const radius = 0.35 * scale;

            if (yellowStyleCoords.has(coordStr)) {
                ctx.beginPath();
                ctx.ellipse(ix * scale, (iy - 0.5) * scale, radius, radius, 180 * Math.PI / 180, 225 * Math.PI / 180, 315 * Math.PI / 180);
                ctx.stroke();
                ctx.beginPath();
                ctx.ellipse(ix * scale, (iy + 0.5) * scale, radius, radius, 180 * Math.PI / 180, 45 * Math.PI / 180, 135 * Math.PI / 180);
                ctx.stroke();
            } else if (greenStyleCoords.has(coordStr)) {
                ctx.beginPath();
                ctx.ellipse((ix - 0.5) * scale, iy * scale, radius, radius, 0, 315 * Math.PI / 180, 405 * Math.PI / 180);
                ctx.stroke();
                ctx.beginPath();
                ctx.ellipse((ix + 0.5) * scale, iy * scale, radius, radius, 0, 135 * Math.PI / 180, 225 * Math.PI / 180);
                ctx.stroke();
            }
        }
    });
    ctx.restore();
  };

  const drawKolam171 = (canvas: HTMLCanvasElement, data: IntersectionData) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = 60;
    const canvasSize = 7 * scale;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(scale / 2, scale / 2);

    const arcProps = { color: 'black', lw: 2.0 };
    const crossProps = { color: 'black', lw: 2.0 };
    
    const outerArcsParams = [
        { center: [3, 0], w: 0.7, h: 0.7, angle: 0, t1: 135, t2: 405 },
        { center: [2, 1], w: 0.7, h: 0.7, angle: -45, t1: 180, t2: 360 },
        { center: [4, 1], w: 0.7, h: 0.7, angle: 45, t1: 180, t2: 360 },
        { center: [1, 2], w: 0.7, h: 0.7, angle: -45, t1: 180, t2: 360 },
        { center: [5, 2], w: 0.7, h: 0.7, angle: 45, t1: 180, t2: 360 },
        { center: [0, 3], w: 0.7, h: 0.7, angle: 0, t1: 45, t2: 315 },
        { center: [6, 3], w: 0.7, h: 0.7, angle: 0, t1: -135, t2: 135 },
        { center: [1, 4], w: 0.7, h: 0.7, angle: 45, t1: 0, t2: 180 },
        { center: [5, 4], w: 0.7, h: 0.7, angle: -45, t1: 0, t2: 180 },
        { center: [2, 5], w: 0.7, h: 0.7, angle: 45, t1: 0, t2: 180 },
        { center: [4, 5], w: 0.7, h: 0.7, angle: -45, t1: 0, t2: 180 },
        { center: [3, 6], w: 0.7, h: 0.7, angle: 0, t1: -45, t2: 225 },
    ];

    const pulliDots: [number, number][] = [];
    for (let r = 0; r < 7; r++) {
      const numDots = 7 - 2 * Math.abs(r - 3);
      const startX = Math.abs(r - 3);
      for (let i = 0; i < numDots; i++) {
        const c = startX + i;
        pulliDots.push([c, r]);
      }
    }

    const yellowStyleCoords = new Set([
        '3,0.5', '2,1.5', '3,1.5', '4,1.5', '1,2.5', '2,2.5', '3,2.5', '4,2.5', '5,2.5',
        '1,3.5', '2,3.5', '3,3.5', '4,3.5', '5,3.5', '2,4.5', '3,4.5', '4,4.5', '3,5.5'
    ]);
    const greenStyleCoords = new Set([
        '2.5,1', '3.5,1', '1.5,2', '2.5,2', '3.5,2', '4.5,2', '0.5,3', '1.5,3', '2.5,3',
        '3.5,3', '4.5,3', '5.5,3', '1.5,4', '2.5,4', '3.5,4', '4.5,4', '2.5,5', '3.5,5'
    ]);

    pulliDots.forEach(([c, r]) => {
        ctx.beginPath();
        ctx.arc(c * scale, r * scale, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    });

    outerArcsParams.forEach(p => {
        ctx.strokeStyle = arcProps.color;
        ctx.lineWidth = arcProps.lw;
        ctx.beginPath();
        const radius = (p.w / 2) * scale;
        ctx.ellipse(p.center[0] * scale, p.center[1] * scale, radius, radius, p.angle * Math.PI / 180, p.t1 * Math.PI / 180, p.t2 * Math.PI / 180);
        ctx.stroke();
    });

    Object.keys(data).forEach(coordStr => {
        const state = data[coordStr];
        const [ix, iy] = coordStr.split(',').map(Number);

        if (state === 1) {
            ctx.beginPath();
            ctx.arc(ix * scale, iy * scale, 6, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();

            const crossHalfLength = 0.25 * scale;
            ctx.strokeStyle = crossProps.color;
            ctx.lineWidth = crossProps.lw;
            ctx.beginPath();
            ctx.moveTo((ix * scale) - crossHalfLength, (iy * scale) - crossHalfLength);
            ctx.lineTo((ix * scale) + crossHalfLength, (iy * scale) + crossHalfLength);
            ctx.moveTo((ix * scale) + crossHalfLength, (iy * scale) - crossHalfLength);
            ctx.lineTo((ix * scale) - crossHalfLength, (iy * scale) + crossHalfLength);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(ix * scale, iy * scale, 6, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.fill();
            ctx.stroke();

            ctx.strokeStyle = arcProps.color;
            ctx.lineWidth = arcProps.lw;
            const radius = 0.35 * scale;

            if (yellowStyleCoords.has(coordStr)) {
                ctx.beginPath();
                ctx.ellipse(ix * scale, (iy - 0.5) * scale, radius, radius, 180 * Math.PI / 180, 225 * Math.PI / 180, 315 * Math.PI / 180);
                ctx.stroke();
                ctx.beginPath();
                ctx.ellipse(ix * scale, (iy + 0.5) * scale, radius, radius, 180 * Math.PI / 180, 45 * Math.PI / 180, 135 * Math.PI / 180);
                ctx.stroke();
            } else if (greenStyleCoords.has(coordStr)) {
                ctx.beginPath();
                ctx.ellipse((ix - 0.5) * scale, iy * scale, radius, radius, 0, 315 * Math.PI / 180, 405 * Math.PI / 180);
                ctx.stroke();
                ctx.beginPath();
                ctx.ellipse((ix + 0.5) * scale, iy * scale, radius, radius, 0, 135 * Math.PI / 180, 225 * Math.PI / 180);
                ctx.stroke();
            }
        }
    });
    ctx.restore();
  };

  const handleHexCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    if (/^[0-9A-F]*$/.test(value) && value.length <= 4) {
      setHexCode(value);
    }
  };

  const handleHexCodeChange171 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    if (/^[0-9A-F]*$/.test(value) && value.length <= 9) {
      setHexCode171(value);
    }
  };

  const handleGenerate = () => {
    const data = getIntersectionData(hexCode);
    if (data && canvasRef.current) {
        drawKolam(canvasRef.current, data);
    }
  };

  const handleGenerate171 = () => {
    const paddedHexCode = hexCode171.padEnd(9, '0');
    const data = getIntersectionData171(paddedHexCode);
    if (data && canvasRef171.current) {
        drawKolam171(canvasRef171.current, data);
    }
  };

  return (
    <div className="min-h-screen font-sans text-amber-900 relative overflow-x-hidden">
      <Background />
      <div className="relative z-10">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrollY={scrollY} />
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="flex flex-col lg:flex-row justify-center items-start gap-12">
            {/* 1-5-1 Kolam Designer */}
            <div className="flex flex-col items-center gap-4 p-6 bg-amber-50/50 rounded-2xl shadow-lg border border-amber-200/30">
              <h1 className="text-3xl font-bold mb-2 text-center text-amber-900 font-serif">1-5-1 Kolam</h1>
              <input
                type="text"
                value={hexCode}
                onChange={handleHexCodeChange}
                maxLength={4}
                className="p-2 text-amber-900 bg-white/70 border border-amber-300 font-mono text-lg w-40 text-center rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                placeholder="0000"
              />
              <button
                onClick={handleGenerate}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Generate
              </button>
              <div className="bg-gradient-to-br from-orange-100 via-white to-orange-100 p-2 rounded-lg shadow-inner w-[440px] h-[440px] flex justify-center items-center">
                <canvas ref={canvasRef} className="rounded-md" />
              </div>
            </div>

            {/* 1-7-1 Kolam Designer */}
            <div className="flex flex-col items-center gap-4 p-6 bg-amber-50/50 rounded-2xl shadow-lg border border-amber-200/30">
              <h1 className="text-3xl font-bold mb-2 text-center text-amber-900 font-serif">1-7-1 Kolam</h1>
              <input
                type="text"
                value={hexCode171}
                onChange={handleHexCodeChange171}
                maxLength={9}
                className="p-2 text-amber-900 bg-white/70 border border-amber-300 font-mono text-lg w-72 text-center rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                placeholder="000000000"
              />
              <button
                onClick={handleGenerate171}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Generate
              </button>
              <div className="bg-gradient-to-br from-orange-100 via-white to-orange-100 p-2 rounded-lg shadow-inner w-[440px] h-[440px] flex justify-center items-center">
                <canvas ref={canvasRef171} className="rounded-md" />
              </div>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="mt-20 bg-gradient-to-b from-amber-100/50 to-amber-200/50 backdrop-blur-sm py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-amber-700">© 2025 Aparna Bindu. Preserving tradition, inspiring creativity.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default KolamDesigner;
