"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useTheme } from "@/context/ThemeContext";
import { useRef } from "react";
import * as THREE from "three";

function Scene() {
  const { theme } = useTheme();
  
  const isDawn = theme === "dawn";
  // The colors map to our CSS variables for smooth blending
  const fogColor = isDawn ? "#fdfaf6" : "#110e12";
  const sparkleColor = isDawn ? "#c2889e" : "#d6a3b6"; // Pale rose accent
  const ambientColor = isDawn ? "#ffffff" : "#d6a3b6";

  // Group for parallax based on mouse
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    // Subtle mouse parallax
    const targetX = (state.pointer.x * Math.PI) / 20;
    const targetY = (state.pointer.y * Math.PI) / 20;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
    
    // Continuous slow drift
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
  });

  return (
    <>
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, 5, 20]} />
      
      <ambientLight intensity={isDawn ? 0.8 : 0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={isDawn ? 1.5 : 1.0} 
        color={ambientColor} 
      />

      <group ref={groupRef}>
        <Sparkles 
          count={isDawn ? 150 : 300} 
          scale={15} 
          size={isDawn ? 3 : 5} 
          speed={0.2} 
          opacity={isDawn ? 0.4 : 0.6} 
          color={sparkleColor} 
        />
        {/* Second layer for depth */}
        <Sparkles 
          count={50} 
          scale={20} 
          size={12} 
          speed={0.1} 
          opacity={isDawn ? 0.15 : 0.25} 
          color={isDawn ? "#8a7a82" : "#ffffff"} 
        />
      </group>
    </>
  );
}

export function AtmosphericScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-colors duration-1000">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]} // Support retina displays but cap at 2 for performance
        gl={{ antialias: false }} // Post-processing or generic smooth is enough, save GPU
      >
        <Scene />
      </Canvas>
    </div>
  );
}
