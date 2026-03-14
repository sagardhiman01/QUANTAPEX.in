import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSphere({ isMobile }) {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  // Doubled particle count for smoother, denser appearance
  const particlesCount = 12000;

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    const colorInside = new THREE.Color('#3E3F7E');
    const colorMid = new THREE.Color('#6C63FF');
    const colorOutside = new THREE.Color('#E8E8FF');

    for (let i = 0; i < particlesCount; i++) {
      // Spherical distribution with slight variance
      const r = 2.2 + (Math.random() - 0.5) * 0.6;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color gradient from inside to outside
      const dist = Math.sqrt(x * x + y * y + z * z) / 2.5;
      const mixedColor = dist < 0.5
        ? colorInside.clone().lerp(colorMid, dist * 2)
        : colorMid.clone().lerp(colorOutside, (dist - 0.5) * 2);
      mixedColor.toArray(colors, i * 3);

      // Varying sizes for sparkle effect, adjusted for mobile
      const baseSize = isMobile ? 0.003 : 0.015;
      sizes[i] = baseSize + Math.random() * (isMobile ? 0.01 : 0.025);
    }
    return [positions, colors, sizes];
  }, [particlesCount, isMobile]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      // Smoothly interpolate mouse position
      mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.05);
      mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.05);

      // Add mouse movement offset to rotation for parallax interaction
      pointsRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.5;
      pointsRef.current.rotation.x = Math.sin(t * 0.3) * 0.05 - mouse.current.y * 0.5;

      // Gentle breathing scale
      const scale = 1 + Math.sin(t * 0.4) * 0.03;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particlesCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Orbital ring of particles circling the sphere
function OrbitalRing({ radius, tilt, speed, count, color }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [radius, count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * speed;
      pointsRef.current.rotation.x = tilt;
      pointsRef.current.rotation.z = Math.sin(t * 0.2) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={color}
        transparent
        opacity={0.5}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Inner glow effect using a transparent sphere
function InnerGlow() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      const scale = 1 + Math.sin(t * 0.6) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.8, 32, 32]} />
      <meshBasicMaterial
        color="#3E3F7E"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export default function Hero3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="hero-canvas-container" style={{ pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <fog attach="fog" args={['#000000', 10, 25]} />
        <ambientLight intensity={0.2} />
        
        <group scale={isMobile ? 0.75 : 1} position={isMobile ? [0, -0.5, 0] : [0, 0, 0]}>
          <ParticleSphere isMobile={isMobile} />
          <OrbitalRing radius={3.2} tilt={0.5} speed={0.15} count={300} color="#A2A3E9" />
          <OrbitalRing radius={3.6} tilt={-0.3} speed={-0.1} count={200} color="#6C63FF" />
          <OrbitalRing radius={2.8} tilt={0.8} speed={0.2} count={150} color="#C7C8F2" />
          <InnerGlow />
        </group>
        
        <Preload all />
      </Canvas>
    </div>
  );
}
