import { Canvas } from '@react-three/fiber';
import { Environment, Float, Preload } from '@react-three/drei';
import FloatingShapes from './FloatingShapes';
import { Suspense } from 'react';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <FloatingShapes />
        </Float>
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
