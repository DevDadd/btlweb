import { useState, useEffect } from 'react';
import AppBar from '../components/AppBar.jsx';
import Background from '../components/Background.jsx';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('text-white');

  useEffect(() => {
    document.title = 'BMI Calculator';
  }, []);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight) return;

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (heightInMeters > 0 && weightInKg > 0) {
      const calculatedBmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(calculatedBmi);
      determineCategory(parseFloat(calculatedBmi));
    }
  };

  const determineCategory = (value) => {
    if (value < 18.5) {
      setCategory('Underweight');
      setColor('text-blue-400');
    } else if (value >= 18.5 && value < 24.9) {
      setCategory('Normal Weight');
      setColor('text-green-400');
    } else if (value >= 25 && value < 29.9) {
      setCategory('Overweight');
      setColor('text-yellow-400');
    } else {
      setCategory('Obese');
      setColor('text-red-500');
    }
  };

  const resetForm = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div className="page-fade">
      <Background gradientOnly />
      <AppBar />
      <main className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative z-10">
        <div className="w-full max-w-lg bg-white/[0.05] border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl animate-slide-up" style={{ animationFillMode: 'both' }}>
          
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 drop-shadow-lg tracking-tight">
              BMI Calculator
            </h1>
            <p className="text-gray-400 mt-3 text-lg">Check your Body Mass Index</p>
          </div>

          <form onSubmit={calculateBMI} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300 placeholder:text-gray-600"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 70"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300 placeholder:text-gray-600"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-lg rounded-xl py-4 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-300 hover:scale-[1.02]"
            >
              Calculate BMI
            </button>
          </form>

          {bmi && (
            <div className="mt-10 animate-fade-in p-6 bg-black/30 rounded-2xl border border-white/5 text-center">
              <h2 className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-2">Your Result</h2>
              <div className={`text-6xl font-black ${color} drop-shadow-md mb-2`}>
                {bmi}
              </div>
              <div className={`text-2xl font-bold ${color}`}>
                {category}
              </div>
              
              <div className="mt-8 relative w-full h-3 bg-gray-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-500 w-[24%]" title="Underweight"></div>
                <div className="h-full bg-green-500 w-[35%]" title="Normal"></div>
                <div className="h-full bg-yellow-400 w-[20%]" title="Overweight"></div>
                <div className="h-full bg-red-600 w-[21%]" title="Obese"></div>
                
                {/* Pointer marker */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white] transition-all duration-1000 ease-out" 
                  style={{ 
                    left: `${Math.min(Math.max((parseFloat(bmi) / 40) * 100, 0), 100)}%`,
                    transform: 'translateX(-50%)' 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-bold px-1">
                <span>15</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40+</span>
              </div>

              <button 
                onClick={resetForm}
                className="mt-8 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Calculate Again
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
