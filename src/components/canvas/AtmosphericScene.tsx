"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";
import { useEnvironmentStore } from "@/store/environmentStore";

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
  layerIndex: number;
}

function StarField({ count, size, color, speed, radiusOuter, radiusInner, layerIndex }: StarFieldProps) {
  const ref = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const isDawn = theme === "dawn";

  const points = useMemo(() => {
    const rand = seededRandom(42 + layerIndex); 
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
  }, [count, radiusOuter, radiusInner, layerIndex]);

  const lastScrollY = useRef(0);
  const smoothedVelocity = useRef(0);

  useFrame((state, delta) => {
    if (ref.current) {
      const scrollY = window.scrollY || 0;
      // Calculate instantaneous velocity
      const velocity = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;
      
      // Smooth the velocity using lerp for natural inertia
      smoothedVelocity.current = THREE.MathUtils.lerp(smoothedVelocity.current, velocity, 0.05);

      // Base rotation + velocity-induced tilt
      ref.current.rotation.y -= delta * speed * 0.5;
      ref.current.rotation.x -= delta * (speed * 0.1) + (smoothedVelocity.current * 0.0002 * layerIndex);
      ref.current.rotation.z -= delta * (speed * 0.15) + (smoothedVelocity.current * 0.0001 * layerIndex);
      
      // Depth position reacts to scroll
      ref.current.position.y = (scrollY * 0.001) * layerIndex;
      
      // Parallax forward thrust based on scroll momentum
      // Pushes the particles toward the camera when scrolling fast
      ref.current.position.z = THREE.MathUtils.lerp(
        ref.current.position.z,
        smoothedVelocity.current * 0.01 * layerIndex,
        0.1
      );
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
        blending={isDawn ? THREE.NormalBlending : THREE.AdditiveBlending}
        opacity={isDawn ? 0.8 : 0.6}
      />
    </Points>
  );
}

function CinematicWorld({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const activeSection = useEnvironmentStore((state) => state.activeSection);
  
  // Target rotations and positions based on section
  const targets = useMemo(() => ({
    hero: { x: 0, y: 0, z: 0 },
    about: { x: 0.1, y: 0.2, z: -1 },
    skills: { x: -0.1, y: -0.2, z: 0.5 },
    projects: { x: 0.2, y: 0.5, z: -2 },
    experience: { x: 0, y: -0.1, z: 0 },
    certifications: { x: -0.2, y: 0.1, z: -1 },
    contact: { x: 0, y: -2, z: 4 }, // deep horizon zoom
  }), []);

  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 80;
      const targetY = (state.pointer.y * Math.PI) / 80;
      
      const sectionTarget = targets[activeSection as keyof typeof targets] || targets.hero;

      groupRef.current.rotation.y += 0.015 * (targetX + sectionTarget.y - groupRef.current.rotation.y);
      groupRef.current.rotation.x += 0.015 * (targetY + sectionTarget.x - groupRef.current.rotation.x);
      
      groupRef.current.position.z += 0.02 * (sectionTarget.z - groupRef.current.position.z);
      groupRef.current.position.y += 0.02 * (-sectionTarget.y - groupRef.current.position.y);
      
      // Global breathing
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.15) * 0.002;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function Scene() {
  const { theme } = useTheme();
  const isDawn = theme === "dawn";
  const activeSection = useEnvironmentStore((state) => state.activeSection);

  // V20 Cinematic Colors
  // #765D67, #6D3C52, #4B2138, #1B0C1A, #2D222F, #FACDC5
  const baseFogColor = isDawn ? "#fdfaf6" : "#171415"; 
  
  // Dynamic colors based on active section
  const fogColors: Record<string, string> = {
    hero: baseFogColor,
    about: isDawn ? "#fdfaf6" : "#1B0C1A",
    skills: isDawn ? "#fdfaf6" : "#1B0C1A",
    projects: isDawn ? "#fdfaf6" : "#2D222F", // deeper for projects
    experience: baseFogColor,
    certifications: isDawn ? "#fdfaf6" : "#1B0C1A",
    contact: isDawn ? "#FACDC5" : "#4B2138", // atmospheric climax
  };

  const currentFogColor = fogColors[activeSection] || baseFogColor;
  const fogColorRef = useRef(new THREE.Color(currentFogColor));

  const starColor1 = isDawn ? "#6D3C52" : "#765D67";
  const starColor2 = isDawn ? "#4B2138" : "#6D3C52"; 
  const starColor3 = isDawn ? "#2D222F" : "#FACDC5"; 

  const lightRef = useRef<THREE.DirectionalLight>(null);
  
  useFrame(() => {
    const scrollY = window.scrollY || 0;
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
    
    // Smooth fog transition
    fogColorRef.current.lerp(new THREE.Color(fogColors[activeSection] || baseFogColor), 0.02);

    if (lightRef.current) {
      lightRef.current.position.y = 10 - progress * 15;
      lightRef.current.position.x = 5 + progress * 10;
      const intensity = isDawn ? 1.0 : 0.6;
      lightRef.current.intensity = intensity - (Math.sin(progress * Math.PI) * 0.2);
    }
  });

  return (
    <>
      <color attach="background" args={[fogColorRef.current]} />
      <fog attach="fog" args={[fogColorRef.current, 5, 25]} />
      
      <ambientLight intensity={isDawn ? 0.9 : 0.4} />
      <directionalLight 
        ref={lightRef}
        position={[5, 10, 5]} 
        intensity={isDawn ? 1.0 : 0.6} 
        color={isDawn ? "#ffffff" : "#FACDC5"} 
      />

      <CinematicWorld>
        <mesh position={[0, -5, -15]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[120, 120]} />
          <meshBasicMaterial 
            color={isDawn ? "#eae4de" : "#1B0C1A"} 
            transparent 
            opacity={isDawn ? 0.8 : 0.95} 
            fog={true}
          />
        </mesh>
        
        <mesh position={[0, -2, -12]}>
          <planeGeometry args={[50, 25]} />
          <meshBasicMaterial 
            color={isDawn ? "#FACDC5" : "#6D3C52"} 
            transparent 
            opacity={isDawn ? 0.05 : 0.08} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[-5, 2, -8]}>
          <planeGeometry args={[40, 20]} />
          <meshBasicMaterial 
            color={isDawn ? "#6D3C52" : "#765D67"} 
            transparent 
            opacity={isDawn ? 0.04 : 0.06} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        <StarField count={400} size={0.06} color={starColor1} speed={0.04} radiusInner={2} radiusOuter={12} layerIndex={0.5} />
        <StarField count={150} size={0.1} color={starColor2} speed={0.06} radiusInner={3} radiusOuter={15} layerIndex={1.0} />
        <StarField count={800} size={0.03} color={starColor3} speed={0.02} radiusInner={1} radiusOuter={18} layerIndex={0.2} />
      </CinematicWorld>
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
