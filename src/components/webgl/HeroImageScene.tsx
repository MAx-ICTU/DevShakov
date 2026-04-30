import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject, PointerEvent } from "react";
import { MathUtils, Vector2 } from "three";
import type { ShaderMaterial, Texture } from "three";
import heroImageVertexShader from "../../shaders/heroImage.vert";
import heroImageFragmentShader from "../../shaders/heroImage.frag";

type HeroImageSceneProps = {
  imageUrl: string;
  alt: string;
  className?: string;
};

type HeroImagePlaneProps = {
  imageUrl: string;
  mouseRef: MutableRefObject<Vector2>;
  hoverRef: MutableRefObject<number>;
  transitionRef: MutableRefObject<number>;
};

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function HeroImagePlane({ imageUrl, mouseRef, hoverRef, transitionRef }: HeroImagePlaneProps) {
  const materialRef = useRef<ShaderMaterial | null>(null);
  const texture = useTexture(imageUrl) as Texture;
  const { viewport, size } = useThree();
  const image = texture.image as HTMLImageElement | undefined;
  const imageAspect = image ? image.width / image.height : 1;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uProgress: { value: 0 },
      uDistortionStrength: { value: size.width < 768 ? 0.35 : 0.58 },
      uOpacity: { value: 1 },
      uPlaneAspect: { value: size.width / Math.max(size.height, 1) },
      uImageAspect: { value: imageAspect },
    }),
    [imageAspect, size.height, size.width, texture],
  );

  useFrame(({ clock }, delta) => {
    const material = materialRef.current;
    if (!material) return;

    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uMouse.value.lerp(mouseRef.current, 1 - Math.exp(-delta * 10));
    material.uniforms.uHover.value = MathUtils.lerp(material.uniforms.uHover.value, hoverRef.current, 1 - Math.exp(-delta * 9));
    material.uniforms.uProgress.value = MathUtils.lerp(material.uniforms.uProgress.value, transitionRef.current, 1 - Math.exp(-delta * 5));
    material.uniforms.uPlaneAspect.value = size.width / Math.max(size.height, 1);
    material.uniforms.uImageAspect.value = imageAspect;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 48, 32]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={heroImageVertexShader}
        fragmentShader={heroImageFragmentShader}
      />
    </mesh>
  );
}

export function HeroImageScene({ imageUrl, alt, className = "" }: HeroImageSceneProps) {
  const [webglSupported, setWebglSupported] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const mouseRef = useRef(new Vector2(0.5, 0.5));
  const hoverRef = useRef(0);
  const transitionRef = useRef(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);
    setWebglSupported(finePointer && !reduced && canUseWebGL());
  }, []);

  useEffect(() => {
    const handleBoost = (event: Event) => {
      transitionRef.current = Number((event as CustomEvent<number>).detail) || 0;
    };

    window.addEventListener("portfolio-transition-boost", handleBoost);
    return () => window.removeEventListener("portfolio-transition-boost", handleBoost);
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseRef.current.set((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
    hoverRef.current = 1;
  };

  const handlePointerLeave = () => {
    hoverRef.current = 0;
  };

  if (!webglSupported || reducedMotion) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        className={`h-full w-full object-cover object-[50%_25%] grayscale contrast-105 brightness-[0.82] ${className}`}
      />
    );
  }

  return (
    <div className={`relative h-full w-full ${className}`} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <img src={imageUrl} alt={alt} className="sr-only" />
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 1.35], fov: 50 }}
        dpr={[1, 1.35]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <HeroImagePlane imageUrl={imageUrl} mouseRef={mouseRef} hoverRef={hoverRef} transitionRef={transitionRef} />
      </Canvas>
    </div>
  );
}
