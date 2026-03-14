import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DNA() {
  const groupRef = useRef();
  const particleCount = 700;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const color1 = new THREE.Color('#A2A3E9');
    const color2 = new THREE.Color('#6C63FF');
    const color3 = new THREE.Color('#E8E8FF');

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const angle = t * Math.PI * 18;
      const radius = 1.1;

      // Two intertwined helices
      const offset = (i % 2 === 0) ? 0 : Math.PI;

      pos[i * 3] = Math.cos(angle + offset) * radius;
      pos[i * 3 + 1] = (t - 0.5) * 20;
      pos[i * 3 + 2] = Math.sin(angle + offset) * radius;

      // Color based on height
      const heightFactor = Math.abs(t - 0.5) * 2;
      const mixed = heightFactor < 0.5
        ? color1.clone().lerp(color2, heightFactor * 2)
        : color2.clone().lerp(color3, (heightFactor - 0.5) * 2);
      mixed.toArray(col, i * 3);
    }
    return [pos, col];
  }, []);

  const lines = useMemo(() => {
    const lPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount / 2; i++) {
      const t = (i * 2) / particleCount;
      const angle = t * Math.PI * 18;
      const radius = 1.1;

      lPositions[i * 6] = Math.cos(angle) * radius;
      lPositions[i * 6 + 1] = (t - 0.5) * 20;
      lPositions[i * 6 + 2] = Math.sin(angle) * radius;

      lPositions[i * 6 + 3] = Math.cos(angle + Math.PI) * radius;
      lPositions[i * 6 + 4] = (t - 0.5) * 20;
      lPositions[i * 6 + 5] = Math.sin(angle + Math.PI) * radius;
    }
    return lPositions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.position.y = Math.sin(time * 0.3) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount / 2 * 2} array={lines} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#3E3F7E" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

export default function DNAHelix() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.4} />
      <DNA />
    </Canvas>
  );
}
