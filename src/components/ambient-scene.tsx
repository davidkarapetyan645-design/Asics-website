"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type AmbientSceneProps = {
  accent: string;
  ambient: [string, string];
  reducedMotion: boolean;
};

function SceneObjects({ accent, ambient, reducedMotion }: AmbientSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    groupRef.current.rotation.y = elapsed * 0.08;
    groupRef.current.rotation.x = Math.sin(elapsed * 0.28) * 0.14;
    groupRef.current.position.y = Math.sin(elapsed * 0.52) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      <pointLight color={accent} intensity={18} position={[2.2, 2.5, 4]} />
      <pointLight color={ambient[0]} intensity={8} position={[-3, -1, 2]} />
      <pointLight color={ambient[1]} intensity={9} position={[0, 3, -1]} />

      <group ref={groupRef} position={[0, 0, -1.8]}>
        <Float
          floatIntensity={reducedMotion ? 0.12 : 0.7}
          rotationIntensity={reducedMotion ? 0.1 : 0.7}
          speed={reducedMotion ? 0.55 : 1.35}
        >
          <mesh position={[-1.6, 0.8, -1.1]}>
            <icosahedronGeometry args={[1.12, 4]} />
            <meshPhysicalMaterial
              clearcoat={1}
              color={ambient[0]}
              emissive={ambient[0]}
              emissiveIntensity={0.35}
              metalness={0.25}
              opacity={0.16}
              roughness={0.15}
              transparent
            />
          </mesh>
        </Float>

        <Float
          floatIntensity={reducedMotion ? 0.08 : 0.45}
          rotationIntensity={reducedMotion ? 0.08 : 0.55}
          speed={reducedMotion ? 0.45 : 1.05}
        >
          <mesh position={[1.55, -0.55, -1.5]}>
            <sphereGeometry args={[0.85, 40, 40]} />
            <meshPhysicalMaterial
              clearcoat={1}
              color={ambient[1]}
              emissive={ambient[1]}
              emissiveIntensity={0.35}
              metalness={0.2}
              opacity={0.1}
              roughness={0.1}
              transparent
            />
          </mesh>
        </Float>

        <Float
          floatIntensity={reducedMotion ? 0.04 : 0.3}
          rotationIntensity={reducedMotion ? 0.05 : 0.35}
          speed={reducedMotion ? 0.35 : 0.95}
        >
          <mesh position={[0.5, -1.1, -1.2]} rotation={[1.2, 0.2, 0.4]}>
            <torusGeometry args={[1.7, 0.11, 26, 120]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.55}
              opacity={0.32}
              transparent
            />
          </mesh>
        </Float>
      </group>

      <Sparkles
        color={accent}
        count={reducedMotion ? 18 : 30}
        noise={1}
        opacity={0.8}
        scale={[8, 5, 4]}
        size={3.8}
        speed={reducedMotion ? 0.08 : 0.24}
      />
    </>
  );
}

export function AmbientScene(props: AmbientSceneProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ fov: 42, position: [0, 0, 6.6] }}
        dpr={[1, 1.2]}
        frameloop={props.reducedMotion ? "demand" : "always"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <SceneObjects {...props} />
      </Canvas>
    </div>
  );
}
