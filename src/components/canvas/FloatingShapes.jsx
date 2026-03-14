import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

function CodeSnippet({ text, position, color, scale, speed, rotation }) {
  const textRef = useRef()
  
  // Create a slow, floating oscillation
  useFrame((state) => {
    if (!textRef.current) return
    const time = state.clock.getElapsedTime()
    // Small vertical floating motion
    textRef.current.position.y = position[1] + Math.sin(time * speed) * 0.2
    // Small gentle rotation back and forth
    textRef.current.rotation.y = rotation[1] + Math.sin(time * speed * 0.5) * 0.1
    textRef.current.rotation.z = rotation[2] + Math.cos(time * speed * 0.3) * 0.05
  })

  return (
    <Text
      ref={textRef}
      position={position}
      scale={scale}
      rotation={rotation}
      color={color}
      fontSize={1}
      maxWidth={10}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="left"
      anchorX="center"
      anchorY="middle"
    >
      {text}
      <meshBasicMaterial color={color} toneMapped={false} />
    </Text>
  )
}

export default function FloatingShapes() {
  const snippets = useMemo(() => [
    { 
      text: "const app = express();\napp.listen(5000);", 
      position: [-4, 2, -5], color: '#8b5cf6', scale: 0.8, speed: 0.8, rotation: [0, 0.2, -0.1] 
    },
    { 
      text: "<motion.div\n  animate={{ opacity: 1 }}\n/>", 
      position: [4, -1, -3], color: '#d946ef', scale: 0.7, speed: 1.2, rotation: [0, -0.3, 0.1] 
    },
    { 
      text: "function build() {\n  return success;\n}", 
      position: [-3, -4, -4], color: '#fde047', scale: 0.6, speed: 1.5, rotation: [0, 0.4, 0.2] 
    },
    { 
      text: "import * as THREE\nfrom 'three';", 
      position: [5, 4, -6], color: '#c084fc', scale: 0.9, speed: 0.9, rotation: [0, -0.2, -0.1] 
    },
  ], [])

  return (
    <group>
      {snippets.map((snippet, i) => (
        <CodeSnippet key={i} {...snippet} />
      ))}
    </group>
  )
}
