"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * The ArchFlow mark in true 3D — premium pass.
 *
 * Geometry is rebuilt from the logo with dense curve/bevel segments so
 * every edge reads as machined metal, not low-poly. Studio lighting
 * comes from three's bundled RoomEnvironment (no network); a soft
 * contact shadow grounds the mark; drei's Float gives it life; the
 * whole group tracks the cursor with critically-damped lerp.
 */

const SILVER = new THREE.MeshPhysicalMaterial({
  color: "#e8ecf3",
  metalness: 1,
  roughness: 0.16,
  clearcoat: 1,
  clearcoatRoughness: 0.18,
  envMapIntensity: 1.35
});

const BLUE = new THREE.MeshPhysicalMaterial({
  color: "#3d4cf2",
  metalness: 0.75,
  roughness: 0.12,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  envMapIntensity: 1.6,
  iridescence: 0.25,
  iridescenceIOR: 1.4
});

function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;
    return () => {
      scene.environment = null;
      envMap.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

/** The Λ peak — flared chevron with angled foot cuts, densely beveled. */
function useApexGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 1.06);
    s.lineTo(1.02, -0.62);
    s.lineTo(0.56, -0.47);
    s.lineTo(0, 0.36);
    s.lineTo(-0.56, -0.47);
    s.lineTo(-1.02, -0.62);
    s.closePath();
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.24,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.045,
      bevelSegments: 8,
      curveSegments: 32
    });
    geo.center();
    return geo;
  }, []);
}

/** The flow ribbon — a silk-smooth tapered S-band. */
function useRibbonGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.5, -1.0);
    s.bezierCurveTo(-0.85, -0.42, -0.15, -0.36, 0.55, -0.46);
    s.bezierCurveTo(1.05, -0.53, 1.32, -0.42, 1.56, -0.2);
    s.bezierCurveTo(1.2, -0.58, 0.6, -0.78, -0.1, -0.74);
    s.bezierCurveTo(-0.72, -0.7, -1.15, -0.82, -1.5, -1.0);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.17,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.04,
      bevelSegments: 8,
      curveSegments: 64
    });
    return geo;
  }, []);
}

/** The detached fragment. */
function useFragmentGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(0.36, 0.11);
    s.lineTo(0.27, -0.13);
    s.closePath();
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.13,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.03,
      bevelSegments: 6,
      curveSegments: 16
    });
    return geo;
  }, []);
}

function Mark() {
  const group = useRef<THREE.Group>(null);
  const apexGeo = useApexGeometry();
  const ribbonGeo = useRibbonGeometry();
  const fragGeo = useFragmentGeometry();

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    // Gentle presentation sway + critically-damped cursor tracking.
    const swayY = Math.sin(t * 0.3) * 0.22;
    const targetY = swayY + state.pointer.x * 0.38;
    const targetX = -state.pointer.y * 0.22 + Math.sin(t * 0.2) * 0.03;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.06);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.06);
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.08} floatIntensity={0.5}>
        <group position={[0, 0.3, 0]} scale={0.86}>
          <mesh geometry={apexGeo} material={SILVER} castShadow />
          <mesh
            geometry={ribbonGeo}
            material={BLUE}
            position={[0, 0.02, 0.19]}
            castShadow
          />
          <mesh
            geometry={fragGeo}
            material={SILVER}
            position={[0.95, -0.98, 0.19]}
            castShadow
          />
        </group>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop="always"
      camera={{ position: [0, 0.05, 5.6], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <StudioEnvironment />
      {/* cool key + double blue rim, echoing the logo's glow */}
      <directionalLight position={[4, 5, 6]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-3.5, -1, -3]} intensity={14} color="#4353f0" distance={14} />
      <pointLight position={[3, -2.5, 2.5]} intensity={5} color="#8a96ff" distance={12} />
      <Mark />
      {/* soft grounding shadow */}
      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.55}
        scale={7}
        blur={2.6}
        far={3}
        color="#0a0d2a"
      />
    </Canvas>
  );
}
