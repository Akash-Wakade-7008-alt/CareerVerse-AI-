"use client";

import dynamic from "next/dynamic";
import FloatingBlobs from "./FloatingBlobs";
import FaviconAnimator from "./FaviconAnimator";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function AnimatedBackground() {
  return (
    <>
      <ParticleField />
      <FloatingBlobs />
      <FaviconAnimator />
    </>
  );
}
