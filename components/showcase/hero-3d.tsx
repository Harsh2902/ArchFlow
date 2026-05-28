"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/**
 * The hero showpiece: a slowly rotating low-poly arch (half-torus) in
 * matte slate with an emerald rim light. Supporting, not dominant.
 *
 * Triangle budget: 16 radial × 48 tubular × 2 ≈ 1,536 — well under the
 * 5,000 cap. One key light + ambient + a single emerald rim light.
 *
 * frameloop is "always" because the object rotates continuously; the
 * scene is trivially cheap (<0.5ms/frame) so this is the right call,
 * and the Canvas only mounts once the hero is in view (see
 * hero-backdrop.tsx) so it costs nothing before then.
 */

const MAX_PARALLAX = 0.087; // ~5 degrees in radians

function Arch() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Continuous slow Y-axis rotation — ambient, not spinning.
    mesh.rotation.y += delta * 0.12;

    // Gentle mouse parallax on X tilt, smoothed with lerp, capped at ~5°.
    const targetX = state.pointer.y * MAX_PARALLAX;
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetX, 0.04);

    // Subtle group drift toward the cursor on X for depth.
    const targetPosX = state.pointer.x * 0.15;
    mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, targetPosX, 0.04);
  });

  return (
    <mesh ref={meshRef} position={[0, -0.2, 0]}>
      {/* radius, tube, radialSegments, tubularSegments, arc=PI (half = arch) */}
      <torusGeometry args={[1.15, 0.34, 16, 48, Math.PI]} />
      <meshStandardMaterial
        color="#334155"
        roughness={0.62}
        metalness={0.12}
        emissive="#0b1220"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="always"
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.45} />
      {/* key light, cool white, front-right */}
      <directionalLight position={[3, 2, 4]} intensity={0.9} color="#e2e8f0" />
      {/* emerald rim light from behind-left */}
      <pointLight
        position={[-2.5, -1, -2.5]}
        intensity={6}
        color="#10b981"
        distance={10}
      />
      <Arch />
    </Canvas>
  );
}
