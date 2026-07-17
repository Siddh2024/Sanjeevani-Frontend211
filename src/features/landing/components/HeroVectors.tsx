import { motion } from 'framer-motion';

interface VectorProps {
  isDark: boolean;
}

export function AtomVector({ isDark }: VectorProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central glow */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-emerald-500/10 dark:bg-emerald-400/20 blur-3xl" />
      
      <svg width="100%" height="100%" viewBox="0 0 300 300" className="w-full h-full text-emerald-500 dark:text-emerald-400">
        {/* Nucleus */}
        <motion.circle
          cx="150"
          cy="150"
          r="16"
          className="fill-emerald-500/20 dark:fill-emerald-400/30 stroke-emerald-600 dark:stroke-emerald-300"
          strokeWidth="2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="145" cy="145" r="8" className="fill-emerald-400" />
        <circle cx="155" cy="153" r="7" className="fill-teal-400" />
        
        {/* Orbit 1 */}
        <motion.ellipse
          cx="150"
          cy="150"
          rx="100"
          ry="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-40 dark:opacity-60"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        {/* Electron 1 */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '150px 150px' }}
        >
          <circle cx="250" cy="150" r="5" className="fill-emerald-400 dark:fill-emerald-300 shadow-lg" />
          <circle cx="250" cy="150" r="10" className="fill-none stroke-emerald-400/30" strokeWidth="1" />
        </motion.g>

        {/* Orbit 2 */}
        <motion.ellipse
          cx="150"
          cy="150"
          rx="100"
          ry="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-40 dark:opacity-60"
          style={{ rotate: 60 }}
          animate={{ rotate: 420 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        {/* Electron 2 */}
        <motion.g
          style={{ transformOrigin: '150px 150px', rotate: 60 }}
          animate={{ rotate: 420 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="250" cy="150" r="5" className="fill-emerald-400 dark:fill-emerald-300" />
        </motion.g>

        {/* Orbit 3 */}
        <motion.ellipse
          cx="150"
          cy="150"
          rx="100"
          ry="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-40 dark:opacity-60"
          style={{ rotate: 120 }}
          animate={{ rotate: 480 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        {/* Electron 3 */}
        <motion.g
          style={{ transformOrigin: '150px 150px', rotate: 120 }}
          animate={{ rotate: 480 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="250" cy="150" r="5" className="fill-teal-400 dark:fill-teal-300" />
        </motion.g>
      </svg>
    </div>
  );
}

export function ResearchPaperVector({ isDark }: VectorProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central glow */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-saffron-500/10 dark:bg-saffron-400/20 blur-3xl" />
      
      <svg width="100%" height="100%" viewBox="0 0 300 300" className="w-full h-full text-saffron-500 dark:text-saffron-400">
        {/* Paper Background */}
        <motion.g
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Page Sheet */}
          <rect
            x="70"
            y="50"
            width="160"
            height="200"
            rx="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-saffron-400/60 dark:text-saffron-500/40"
          />
          {/* Folded Corner */}
          <path
            d="M 210 50 L 230 70 L 210 70 Z"
            fill="currentColor"
            className="opacity-20"
          />
          
          {/* Title Lines */}
          <rect x="90" y="80" width="80" height="12" rx="4" className="fill-saffron-500/80 dark:fill-saffron-400/90" />
          
          {/* Body Text Lines */}
          <rect x="90" y="110" width="120" height="6" rx="3" className="fill-saffron-500/30 dark:fill-saffron-500/20" />
          <rect x="90" y="125" width="100" height="6" rx="3" className="fill-saffron-500/30 dark:fill-saffron-500/20" />
          <rect x="90" y="140" width="115" height="6" rx="3" className="fill-saffron-500/30 dark:fill-saffron-500/20" />
          
          {/* Dynamic chemical formula line inside paper */}
          <path
            d="M 90 180 L 110 170 L 130 180 L 150 170"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="stroke-saffron-500/60 dark:stroke-saffron-400/70"
            strokeDasharray="4 2"
          />
          <circle cx="90" cy="180" r="3" className="fill-saffron-500" />
          <circle cx="110" cy="170" r="3" className="fill-saffron-500" />
          <circle cx="130" cy="180" r="3" className="fill-saffron-500" />
          <circle cx="150" cy="170" r="3" className="fill-saffron-500" />
        </motion.g>

        {/* Floating Magnifying Glass Scanner */}
        <motion.g
          animate={{
            x: [0, 30, -20, 0],
            y: [0, 40, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Glass Lens Circle */}
          <circle
            cx="170"
            cy="150"
            r="28"
            className="fill-pearl-50/80 dark:fill-zinc-950/80 stroke-saffron-500"
            strokeWidth="3.5"
          />
          {/* Lens Glass Grid Shine */}
          <path
            d="M 160 135 A 28 28 0 0 1 185 140"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-40"
          />
          {/* Glass Handle */}
          <line
            x1="190"
            y1="170"
            x2="215"
            y2="195"
            stroke="currentColor"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </div>
  );
}

export function PatentPaperVector({ isDark }: VectorProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central glow */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-purple-500/10 dark:bg-purple-400/20 blur-3xl" />
      
      <svg width="100%" height="100%" viewBox="0 0 300 300" className="w-full h-full text-purple-500 dark:text-purple-400">
        {/* Certificate Frame */}
        <motion.g
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {/* Base Sheet */}
          <rect
            x="70"
            y="50"
            width="160"
            height="200"
            rx="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-purple-400/50 dark:text-purple-500/40"
          />
          
          {/* Ornate Inner Border */}
          <rect
            x="78"
            y="58"
            width="144"
            height="184"
            rx="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-30"
          />

          {/* Heading Lines */}
          <line x1="100" y1="85" x2="200" y2="85" stroke="currentColor" strokeWidth="2.5" className="opacity-80" />
          <line x1="110" y1="95" x2="190" y2="95" stroke="currentColor" strokeWidth="1.5" className="opacity-50" />

          {/* Shield Illustration inside Certificate */}
          <motion.path
            d="M 125 120 C 125 120 150 110 150 110 C 150 110 175 120 175 120 C 175 150 150 170 150 170 C 150 170 125 150 125 120 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-purple-600 dark:text-purple-300"
            animate={{
              strokeWidth: [2.5, 3, 2.5]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Ribbon Seal */}
          <g transform="translate(150, 215)">
            {/* Ribbons */}
            <path d="M -15 0 L -25 30 L -5 20 L -15 0" fill="currentColor" className="opacity-40 text-purple-600 dark:text-purple-400" />
            <path d="M 15 0 L 25 30 L 5 20 L 15 0" fill="currentColor" className="opacity-40 text-purple-600 dark:text-purple-400" />
            {/* Seal Star/Circle */}
            <circle
              cx="0"
              cy="0"
              r="15"
              className="fill-saffron-500/80 stroke-purple-600 dark:stroke-purple-300"
              strokeWidth="2.5"
            />
            {/* Star Checkmark center */}
            <path d="M -5 -2 L -1 2 L 6 -4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </motion.g>

        {/* Dynamic glowing check emblem floating on top */}
        <motion.g
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <circle
            cx="210"
            cy="120"
            r="20"
            className="fill-emerald-500 dark:fill-emerald-400 shadow-xl"
          />
          <path
            d="M 202 120 L 208 126 L 218 114"
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </svg>
    </div>
  );
}
