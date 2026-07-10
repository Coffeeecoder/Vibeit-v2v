import { motion } from "framer-motion";

export function AuraAvatar({ size = 96 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* soft aura glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.9 0.09 15 / 0.9), oklch(0.9 0.08 305 / 0.7) 45%, transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* petal ring */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {["🌸", "✨", "🌷", "🕊️", "💫"].map((e, i) => (
          <span
            key={i}
            className="absolute text-sm"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 72}deg) translate(${size * 0.55}px) rotate(-${i * 72}deg)`,
            }}
          >
            {e}
          </span>
        ))}
      </motion.div>
      {/* face */}
      <motion.div
        className="absolute inset-3 grid place-items-center rounded-full border border-white/70 bg-white shadow-[var(--shadow-glow)]"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-4xl">🌸</div>
      </motion.div>
    </div>
  );
}
