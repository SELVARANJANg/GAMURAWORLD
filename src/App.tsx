import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAction = (action: string | (() => void)) => {
    if (typeof action === 'string') {
      window.open(action, '_blank');
    } else {
      action();
    }
  };

  const logos = [
    { id: 1, action: "https://gamura.vercel.app/", label: "Gamura" }, // Top Middle Large
    { id: 2, action: "https://gamuragalaxy.vercel.app/", label: "Gamura Galaxy" }, // Grid 1
    { id: 3, action: "https://bububai.vercel.app/", label: "Bubub AI" }, // Grid 2
    { id: 4, action: "https://gamuratrade.netlify.app/", label: "Gamura Trade" }, // Grid 3
    { id: 5, action: "https://gamuraro.vercel.app/", label: "Gamura RO" }, // Grid 4
    { id: 6, action: "https://gamuracp.vercel.app/", label: "Gamura CP" }, // Grid 5
    { id: 7, action: () => setNotification("Gjava is on the way"), label: "Gjava" }, // Grid 6 (Right Coffee)
    { id: 8, action: "https://goakok.vercel.app/", label: "Goakok" }, // Grid 7
    { id: 9, action: () => setNotification("In progress - Details at selvaranjan.vercel.app"), label: "Project 9" }, // Grid 8
    { id: 10, action: () => setNotification("In progress - Details at selvaranjan.vercel.app"), label: "Project 10" }, // Grid 9
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden relative">
      {/* Glass Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 20, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-0 left-1/2 z-[100] px-6 py-3 rounded-2xl border border-white/40 bg-white/30 backdrop-blur-xl shadow-2xl text-slate-900 font-semibold text-sm whitespace-nowrap"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-lg aspect-[10/16] bg-white">
        {/* The Hub Image */}
        <img 
          src="LIST.png" 
          alt="Gamura Project Hub"
          className="w-full h-full object-contain pointer-events-none"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://lh3.googleusercontent.com/d/1l31M_u6l_WlFWiaxMrhu8tWdI-mU1awd";
          }}
        />

        {/* 1. Large Central Logo */}
        <button 
          onClick={() => handleAction(logos[0].action)}
          className="absolute top-[22.5%] left-[34%] w-[32%] h-[17.5%] rounded-2xl hover:bg-black/[0.03] active:scale-95 transition-all cursor-pointer z-10"
          title={logos[0].label}
        />

        {/* 3x3 Grid of Logos (Logos 2-10) */}
        <div className="absolute top-[42%] left-[0.5%] w-[99%] h-[55.5%] grid grid-cols-3 gap-1 p-1">
          {logos.slice(1).map((logo) => (
            <button
              key={logo.id}
              onClick={() => handleAction(logo.action)}
              className="w-full h-full rounded-2xl hover:bg-black/[0.03] active:scale-95 transition-all cursor-pointer z-10"
              title={logo.label}
            />
          ))}
        </div>
      </div>

      {/* Footer link to founder for detail reference as requested */}
      <div className="absolute bottom-6 text-[10px] text-slate-300 font-medium tracking-widest uppercase">
        <a href="https://selvaranjan.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-500 transition-colors">
          Founder: Selvaranjan G
        </a>
      </div>
    </div>
  );
}
