"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

// Seedable pseudo-random number generator (Mulberry32)
function seededRandom(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface StarFieldProps {
  count: number;
  size: number;
  color: string;
  speed: number;
  radiusOuter: number;
  radiusInner: number;
}

function StarField({ count, size, color, speed, radiusOuter, radiusInner }: StarFieldProps) {
  const ref = useRef<THREE.Points>(null);

  const points = useMemo(() => {
    const rand = seededRandom(42); 
    const p = new Float32Array(count * 3);
    let added = 0;
    while (added < count) {
      const x = (rand() - 0.5) * 2 * radiusOuter;
      const y = (rand() - 0.5) * 2 * radiusOuter;
      const z = (rand() - 0.5) * 2 * radiusOuter;

      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > radiusInner && dist < radiusOuter) {
        p[added * 3] = x;
        p[added * 3 + 1] = y;
        p[added * 3 + 2] = z;
        added++;
      }
    }
    return p;
  }, [count, radiusOuter, radiusInner]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Atmospheric drift rather than rapid orbit
      ref.current.rotation.y -= delta * speed * 0.5;
      ref.current.rotation.x -= delta * (speed * 0.1);
      ref.current.rotation.z -= delta * (speed * 0.15);
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Damped parallax effect following pointer and scroll
      const targetX = (state.pointer.x * Math.PI) / 40;
      const targetY = (state.pointer.y * Math.PI) / 40;
      const scrollY = scrollRef.current * 0.0005;

      // Smooth damping
      groupRef.current.rotation.y += 0.02 * (targetX - groupRef.current.rotation.y);
      groupRef.current.rotation.x += 0.02 * ((targetY + scrollY) - groupRef.current.rotation.x);
      
      // Global breathing
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return <group ref={groupRef} rotation={[0, 0, Math.PI / 12]}>{children}</group>;
}

function Scene() {
  const { theme } = useTheme();
  const isDawn = theme === "dawn";

  // Fog matching global CSS background
  const fogColor = isDawn ? "#fdfaf6" : "#171415";
  
  // Motes/Particles Theme
  const starColor1 = isDawn ? "#9c7889" : "#b08e9e"; // Muted mauve vs Dusty mauve
  const starColor2 = isDawn ? "#7d4d62" : "#966173"; // Soft wine vs Wine
  const starColor3 = isDawn ? "#5c5553" : "#f2ebe8"; // Soft charcoal vs Soft cream

  return (
    <>
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, 5, 20]} />
      
      <ambientLight intensity={isDawn ? 0.9 : 0.4} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={isDawn ? 1.0 : 0.6} 
        color={isDawn ? "#ffffff" : "#d6a3b6"} 
      />

      <ParallaxGroup>
        <StarField count={400} size={0.05} color={starColor1} speed={0.04} radiusInner={2} radiusOuter={12} />
        <StarField count={150} size={0.08} color={starColor2} speed={0.06} radiusInner={3} radiusOuter={15} />
        <StarField count={800} size={0.02} color={starColor3} speed={0.02} radiusInner={1} radiusOuter={18} />
      </ParallaxGroup>
    </>
  );
}

export function AtmosphericScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-colors duration-1000">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: false }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
