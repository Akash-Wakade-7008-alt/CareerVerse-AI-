"use client";
export default function FloatingBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-600/30 blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/25 blur-[140px] animate-blob" style={{ animationDelay: "3s" }} />
      <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] rounded-full bg-fuchsia-600/20 blur-[120px] animate-blob" style={{ animationDelay: "6s" }} />
      <div className="absolute inset-0 grid-bg opacity-30" />
    </div>
  );
}
