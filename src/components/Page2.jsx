import { useEffect, useState } from "react";
import RegisterPage from "./RegisterPage";
import ModelTux from "./ModelTux";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Page2() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Update isMobile on mount and on resize
  useEffect(() => {
    const updateMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const page1Height = window.innerHeight; // Height of Page 1
      const progress = Math.min(Math.max(scrollY / page1Height, 0), 1); // Keep between 0 and 1
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="page h-full md:h-[160vh] bg-[rgba(0,6,40,0.85)] z-50 flex items-center md:justify-center flex-col gap-[9vh] relative transition-all duration-300"
      style={{
        position: "absolute",
        top: isMobile ? "80vh" : "120vh", // Conditionally set top offset
        width: "100%",
        transform: `translateY(${(1 - scrollProgress) * 50}px)`,
        pointerEvents: scrollProgress > 0.1 ? "auto" : "none",
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      <div className="text flex items-center mt-10 justify-center flex-col md:gap-6 z-10">
        <div className="heading text-white font-bold text-2xl md:text-[6vh]">
          Member Board Drive 2
        </div>
        <div className="heading text-white text-[1.2vh] text-xl md:text-[2.5vh] text-center">
          <p>
            Prepare to join a vibrant community of Linux enthusiasts and immerse
            yourself in the dynamic world of Open Source.
          </p>
        </div>
      </div>

      <div className="box flex flex-col md:flex-row gap-4 w-full md:w-[80vw] h-[120vh] rounded-xl z-10">
        {/* Right Box with 3D Model */}
        <div className="tux flex-1 flex justify-center items-center w-full md:w-[50%] bg-[rgba(255,255,255,0.1)] rounded-xl backdrop-blur-sm">
          <Canvas
            className="w-[70vw] md:w-full"
            style={{ height: isMobile ? "50vh" : "100%" }}
          >
            <ambientLight intensity={1.5} />
            <ModelTux />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={true} 
              autoRotate 
              autoRotateSpeed={2.5} 
            />
          </Canvas>
        </div>

        {/* Left Box with RegisterPage */}
        <div className="tux flex-1 flex justify-center items-center w-full md:w-[50%] bg-[rgba(255,255,255,0.1)] rounded-xl mb-5 sm:mb-0 backdrop-blur-sm">
          <div className="w-full h-full">
            <RegisterPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page2;
