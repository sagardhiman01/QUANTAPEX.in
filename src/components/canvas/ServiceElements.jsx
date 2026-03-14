import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Torus, Octahedron, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function RotatingGear() {
    const ref = useRef();

    useFrame((state) => {
        ref.current.rotation.z = state.clock.getElapsedTime() * 0.3;
    });

    return (
        <group ref={ref}>
            <Torus args={[1, 0.15, 6, 6]} >
                <meshStandardMaterial color="#e9d5ff" roughness={0.3} metalness={0.5} />
            </Torus>
        </group>
    );
}

function FloatingDiamond() {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.y = t * 0.4;
        ref.current.rotation.x = t * 0.2;
        ref.current.position.y = Math.sin(t * 0.8) * 0.3;
    });

    return (
        <Octahedron ref={ref} args={[1]} scale={1.2}>
            <meshPhysicalMaterial
                color="#a78bfa"
                roughness={0.1}
                metalness={0.8}
                envMapIntensity={1.5}
            />
        </Octahedron>
    );
}

function ProgrammaticRing() {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.x = t * 0.2;
        ref.current.rotation.y = t * 0.15;
    });

    return (
        <group ref={ref}>
            <Torus args={[1.5, 0.12, 32, 100]}>
                <meshPhysicalMaterial
                    color="#7c3aed"
                    roughness={0.05}
                    metalness={0.9}
                    envMapIntensity={2}
                />
            </Torus>
            <Torus args={[1.8, 0.06, 32, 100]} rotation={[Math.PI / 4, 0, 0]}>
                <meshPhysicalMaterial
                    color="#c4b5fd"
                    transparent
                    opacity={0.5}
                    roughness={0.1}
                    metalness={0.3}
                />
            </Torus>
            <Sphere args={[0.2, 16, 16]} position={[1.5, 0, 0]}>
                <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={2} />
            </Sphere>
        </group>
    );
}

export function ServiceScene({ type }) {
    let Element;

    switch (type) {
        case 'gear':
            Element = RotatingGear;
            break;
        case 'diamond':
            Element = FloatingDiamond;
            break;
        case 'ring':
            Element = ProgrammaticRing;
            break;
        default:
            Element = FloatingDiamond;
    }

    return (
        <div style={{ width: '100%', height: '200px' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 40 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 3, 3]} intensity={0.8} color="#e9d5ff" />
                <pointLight position={[-2, 1, 3]} intensity={0.5} color="#818cf8" />
                <Element />
            </Canvas>
        </div>
    );
}

export function ProcessScene() {
    return (
        <div style={{ width: '120px', height: '120px', display: 'inline-block' }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 35 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 2]} intensity={0.7} color="#e9d5ff" />
                <RotatingGear />
            </Canvas>
        </div>
    );
}
