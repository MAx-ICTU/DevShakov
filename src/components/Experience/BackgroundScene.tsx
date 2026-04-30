import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, shaderMaterial } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { extend } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Ref } from "react";
import { Vector2 } from "three";
import type { Mesh, Points } from "three";
import { useCreativeControls } from "../../hooks/useCreativeControls";
import backgroundVertexShader from "../../shaders/backgroundDistortion.vert";
import backgroundFragmentShader from "../../shaders/backgroundDistortion.frag";

const DistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uOpacity: 0.2,
    uDistortionStrength: 0.25,
  },
  backgroundVertexShader,
  backgroundFragmentShader,
);

extend({ DistortionMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    distortionMaterial: {
      ref?: Ref<{
        uTime: number;
        uOpacity: number;
        uDistortionStrength: number;
      }>;
      uTime?: number;
      uOpacity?: number;
      uDistortionStrength?: number;
      transparent?: boolean;
      depthWrite?: boolean;
    };
  }
}

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function useMotionSignals() {
  const scrollVelocity = useRef(0);
  const transitionBoost = useRef(0);

  useEffect(() => {
    const onScrollVelocity = (event: Event) => {
      scrollVelocity.current = Number((event as CustomEvent<number>).detail) || 0;
    };

    const onTransitionBoost = (event: Event) => {
      transitionBoost.current = Number((event as CustomEvent<number>).detail) || 0;
    };

    window.addEventListener("portfolio-scroll-velocity", onScrollVelocity);
    window.addEventListener("portfolio-transition-boost", onTransitionBoost);

    return () => {
      window.removeEventListener("portfolio-scroll-velocity", onScrollVelocity);
      window.removeEventListener("portfolio-transition-boost", onTransitionBoost);
    };
  }, []);

  return { scrollVelocity, transitionBoost };
}

function useTransitionBoostState() {
  const [boost, setBoost] = useState(0);

  useEffect(() => {
    const onTransitionBoost = (event: Event) => {
      setBoost(Number((event as CustomEvent<number>).detail) || 0);
    };

    window.addEventListener("portfolio-transition-boost", onTransitionBoost);
    return () => window.removeEventListener("portfolio-transition-boost", onTransitionBoost);
  }, []);

  return boost;
}

function ParticleCloud({
  backgroundSpeed,
  cursorInfluence,
}: {
  backgroundSpeed: number;
  cursorInfluence: number;
}) {
  const pointsRef = useRef<Points>(null);
  const { scrollVelocity, transitionBoost } = useMotionSignals();
  const positions = useMemo(() => {
    const count = window.innerWidth < 768 ? 360 : 680;
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

  useFrame(({ clock, pointer }, delta) => {
    if (!pointsRef.current) return;

    const velocityPush = Math.min(Math.abs(scrollVelocity.current) * 0.002, 0.28);
    const boost = transitionBoost.current * 0.5;
    pointsRef.current.rotation.y += delta * (0.18 + velocityPush + boost) * backgroundSpeed;
    pointsRef.current.rotation.x = pointer.y * 0.035 * cursorInfluence;
    pointsRef.current.position.z = transitionBoost.current * 0.38;
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

function SoftGeometry({
  backgroundSpeed,
  cursorInfluence,
  distortionStrength,
}: {
  backgroundSpeed: number;
  cursorInfluence: number;
  distortionStrength: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const distortionRef = useRef<{ uTime: number; uOpacity: number; uDistortionStrength: number } | null>(null);
  const { transitionBoost } = useMotionSignals();

  useFrame(({ clock, pointer }, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.26 * backgroundSpeed + pointer.y * 0.002 * cursorInfluence;
      meshRef.current.rotation.y += delta * 0.18 * backgroundSpeed + pointer.x * 0.003 * cursorInfluence;
      meshRef.current.scale.setScalar(1 + transitionBoost.current * 0.08);
    }

    if (distortionRef.current) {
      distortionRef.current.uTime = clock.elapsedTime;
      distortionRef.current.uOpacity = 0.16 + transitionBoost.current * 0.12;
      distortionRef.current.uDistortionStrength = distortionStrength + transitionBoost.current * 0.55;
    }
  });

  return (
    <>
      <Float speed={1.1 * backgroundSpeed} rotationIntensity={0.18} floatIntensity={0.32}>
        <mesh ref={meshRef} position={[2.5, -0.2, -2.4]}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color="#3dd7ff" transparent opacity={0.045} wireframe />
        </mesh>
      </Float>
      <mesh position={[0.9, -0.1, -3.2]} scale={[6.8, 3.8, 1]}>
        <planeGeometry args={[1, 1, 36, 20]} />
        <distortionMaterial ref={distortionRef} transparent depthWrite={false} />
      </mesh>
    </>
  );
}

function PostProcessing({
  bloomIntensity,
  noiseStrength,
}: {
  bloomIntensity: number;
  noiseStrength: number;
}) {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) return null;

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom intensity={isMobile ? bloomIntensity * 0.55 : bloomIntensity} luminanceThreshold={0.28} luminanceSmoothing={0.72} mipmapBlur />
      {!isMobile ? <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={noiseStrength} /> : <></>}
      {!isMobile ? <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new Vector2(0.00045, 0.00035)} /> : <></>}
      <Vignette eskil={false} offset={0.32} darkness={isMobile ? 0.58 : 0.72} />
    </EffectComposer>
  );
}

export function BackgroundScene() {
  const [webglSupported, setWebglSupported] = useState(false);
  const controls = useCreativeControls();
  const transitionBoost = useTransitionBoostState();

  useEffect(() => {
    setWebglSupported(canUseWebGL());
  }, []);

  if (!webglSupported) {
    return <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_62%_36%,rgba(61,215,255,0.08),transparent_28rem),#050505]" aria-hidden="true" />;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-75" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 1.35]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <color attach="background" args={["#050505"]} />
        <ParticleCloud backgroundSpeed={controls.backgroundSpeed} cursorInfluence={controls.cursorInfluence} />
        <SoftGeometry backgroundSpeed={controls.backgroundSpeed} cursorInfluence={controls.cursorInfluence} distortionStrength={controls.distortionStrength + controls.transitionProgress * 0.4} />
        <PostProcessing bloomIntensity={controls.bloomIntensity + controls.transitionProgress * 0.22 + transitionBoost * 0.22} noiseStrength={controls.noiseStrength + transitionBoost * 0.025} />
      </Canvas>
    </div>
  );
}
