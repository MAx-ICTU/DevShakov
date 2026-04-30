import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Mesh, Points } from "three";

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function ParticleCloud() {
  const pointsRef = useRef<Points>(null);
  const positions = useMemo(() => {
    const count = 680;
    const data = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 2.5 + Math.random() * 6.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 4.4;

      data[index * 3] = Math.cos(angle) * radius;
      data[index * 3 + 1] = height;
      data[index * 3 + 2] = Math.sin(angle) * radius - 2;
    }

    return data;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y = clock.elapsedTime * 0.035 + pointer.x * 0.08;
    pointsRef.current.rotation.x = pointer.y * 0.035;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8fdfff" size={0.018} sizeAttenuation transparent opacity={0.38} depthWrite={false} />
    </points>
  );
}

function SoftGeometry() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x = clock.elapsedTime * 0.11 + pointer.y * 0.08;
    meshRef.current.rotation.y = clock.elapsedTime * 0.08 + pointer.x * 0.12;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.32}>
      <mesh ref={meshRef} position={[2.5, -0.2, -2.4]}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#3dd7ff" transparent opacity={0.045} wireframe />
      </mesh>
    </Float>
  );
}

export function BackgroundScene() {
  const [webglSupported, setWebglSupported] = useState(false);

  useEffect(() => {
    setWebglSupported(canUseWebGL());
  }, []);

  if (!webglSupported) {
    return <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_62%_36%,rgba(61,215,255,0.08),transparent_28rem),#050505]" aria-hidden="true" />;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-75" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 1.45]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <color attach="background" args={["#050505"]} />
        <ParticleCloud />
        <SoftGeometry />
      </Canvas>
    </div>
  );
}
