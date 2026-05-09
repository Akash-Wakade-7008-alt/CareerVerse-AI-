"use client";

import { motion } from "framer-motion";

const ICONS: Record<string, React.FC<{ size?: number; className?: string }>> = {
  "product-manager": ({ size = 28, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <motion.path d="M6 8h8v6H6z" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-icon-draw" />
      <motion.path d="M18 8h8v6h-8z" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-icon-draw" style={{ animationDelay: "0.5s" }} />
      <motion.path d="M12 18h8v6h-8z" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-icon-draw" style={{ animationDelay: "1s" }} />
      <motion.path d="M10 14v4l6 0" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.path d="M22 14v4l-6 0" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
      <motion.circle cx="10" cy="11" r="1.5" fill="#6366F1" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.circle cx="22" cy="11" r="1.5" fill="#8B5CF6" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
      <motion.circle cx="16" cy="21" r="1.5" fill="#06B6D4" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} />
    </svg>
  ),

  "software-engineer": ({ size = 28, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <motion.rect x="4" y="5" width="24" height="18" rx="3" stroke="#6366F1" strokeWidth="2" className="animate-icon-draw" />
      <motion.path d="M4 10h24" stroke="#8B5CF6" strokeWidth="1.5" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.path d="M12 15l-3 3 3 3" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ x: [-1, 1, -1] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.path d="M20 15l3 3-3 3" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ x: [1, -1, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.path d="M17 14l-2 8" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.circle cx="7" cy="7.5" r="1" fill="#EF4444" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.circle cx="10" cy="7.5" r="1" fill="#F59E0B" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
      <motion.circle cx="13" cy="7.5" r="1" fill="#22C55E" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
      <motion.path d="M10 27h12" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  "marketing-manager": ({ size = 28, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <motion.path d="M6 12v8l8-2v-4l-8-2z" stroke="#8B5CF6" strokeWidth="2" strokeLinejoin="round" className="animate-icon-draw" />
      <motion.path d="M14 14v4l10 4V10l-10 4z" stroke="#6366F1" strokeWidth="2" strokeLinejoin="round" className="animate-icon-draw" style={{ animationDelay: "0.5s" }} />
      <motion.path d="M26 14c2 1 2 3 0 4" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" animate={{ x: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.path d="M27 11c3 2 3 7 0 10" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.path d="M28 8c4 3 4 11 0 16" stroke="#06B6D4" strokeWidth="1" strokeLinecap="round" animate={{ x: [0, 4, 0], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }} />
    </svg>
  ),

  "ui-ux-designer": ({ size = 28, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <motion.path d="M8 24l4-8 4 4 4-6 4 10" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-icon-draw" />
      <motion.circle cx="16" cy="10" r="6" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 2" animate={{ rotate: [0, 360] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "16px 10px" }} />
      <motion.circle cx="16" cy="10" r="2" fill="#06B6D4" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.path d="M4 28h24" stroke="#E2E8F0" strokeWidth="1.5" />
      <motion.rect x="22" y="20" width="6" height="6" rx="1" stroke="#8B5CF6" strokeWidth="1.5" animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity }} />
    </svg>
  ),

  consultant: ({ size = 28, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <motion.rect x="6" y="8" width="20" height="14" rx="2" stroke="#6366F1" strokeWidth="2" className="animate-icon-draw" />
      <motion.path d="M12 8V6a4 4 0 018 0v2" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
      <motion.rect x="10" y="13" width="3" height="5" rx="0.5" fill="#06B6D4" animate={{ height: [5, 3, 5] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.rect x="15" y="11" width="3" height="7" rx="0.5" fill="#8B5CF6" animate={{ height: [7, 4, 7] }} transition={{ duration: 2.5, repeat: Infinity }} />
      <motion.rect x="20" y="12" width="3" height="6" rx="0.5" fill="#6366F1" animate={{ height: [6, 2, 6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      <motion.path d="M11 26h10" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
      <motion.path d="M16 22v4" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export default function CareerIcon({ careerId, size = 28, className = "" }: { careerId: string; size?: number; className?: string }) {
  const IconComponent = ICONS[careerId];
  if (!IconComponent) return <div className="text-2xl">📋</div>;
  return <IconComponent size={size} className={className} />;
}
