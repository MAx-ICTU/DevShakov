import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ShaderMaterial } from "three";

type DisintegrationTransitionProps = {
  active: boolean;
  imageUrl: string;
  onComplete: () => void;
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

const vertexShader = `
  varying vec2 vUv;
  uniform float uProgress;
  uniform float uTime;
  uniform float uNoiseStrength;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float n = hash(floor(uv * 42.0));
    float wave = sin((uv.y + uTime * 0.22) * 18.0) * 0.025;
    pos.x += (n - 0.5) * uProgress * uNoiseStrength * 0.72;
    pos.y += wave * uProgress;
    pos.z += n * uProgress * 0.13;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uNoiseStrength;
  uniform float uPixelSize;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(41.0, 289.0))) * 45758.5453);
  }

  void main() {
    vec2 pixelUv = floor(vUv * uPixelSize) / uPixelSize;
    float noise = hash(pixelUv * vec2(61.0, 47.0) + uTime * 0.08);
    float edge = smoothstep(uProgress - 0.26, uProgress + 0.18, noise);
    vec2 push = vec2(noise - 0.5, hash(pixelUv + 2.0) - 0.5) * uProgress * uNoiseStrength * 0.035;
    vec2 uv = pixelUv + push;

    float rgbShift = 0.0025 * uProgress;
    vec4 color;
    color.r = texture2D(uTexture, uv + vec2(rgbShift, 0.0)).r;
    color.g = texture2D(uTexture, uv).g;
    color.b = texture2D(uTexture, uv - vec2(rgbShift, 0.0)).b;
    color.a = texture2D(uTexture, uv).a;

    float verticalFade = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
    float alpha = (1.0 - edge) * verticalFade;
    alpha *= 1.0 - smoothstep(0.82, 1.0, uProgress);

    if (alpha < 0.015) discard;
    gl_FragColor = vec4(color.rgb, alpha);
  }
`;

function DissolvePlane({ imageUrl, onComplete }: { imageUrl: string; onComplete: () => void }) {
  const materialRef = useRef<ShaderMaterial | null>(null);
  const texture = useTexture(imageUrl);
  const { viewport, size } = useThree();
  const isMobile = size.width < 768;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uResolution: { value: [size.width, size.height] },
      uNoiseStrength: { value: isMobile ? 0.38 : 0.58 },
      uPixelSize: { value: isMobile ? 76 : 128 },
    }),
    [texture, size.width, size.height, isMobile],
  );

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return undefined;

    material.uniforms.uProgress.value = 0;
    const tween = gsap.to(material.uniforms.uProgress, {
      value: 1,
      duration: 1.32,
      ease: "power2.inOut",
      onComplete,
    });

    return () => {
      tween.kill();
    };
  }, [onComplete]);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, isMobile ? 80 : 160, isMobile ? 52 : 100]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function DisintegrationTransition({ active, imageUrl, onComplete }: DisintegrationTransitionProps) {
  const [webglSupported, setWebglSupported] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setWebglSupported(supportsWebGL());
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!active || (webglSupported && !reducedMotion)) return undefined;

    const timeout = window.setTimeout(onComplete, reducedMotion ? 120 : 780);
    return () => window.clearTimeout(timeout);
  }, [active, onComplete, reducedMotion, webglSupported]);

  if (!active) return null;

  if (!webglSupported || reducedMotion) {
    return (
      <div
        className="fixed inset-0 z-[95] bg-[#050505] opacity-95 transition-opacity duration-500"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[95] bg-[#050505]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(61,215,255,0.08),transparent_32rem)]" />
      <Canvas
        camera={{ position: [0, 0, 1.4], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <DissolvePlane imageUrl={imageUrl} onComplete={onComplete} />
      </Canvas>
    </div>
  );
}
