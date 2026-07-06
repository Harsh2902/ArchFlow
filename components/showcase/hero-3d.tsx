"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * The ArchFlow mark, rebuilt as real 3D geometry from the brand logo:
 *
 *   1. The Λ peak       — polished silver-white metal, beveled extrude
 *   2. The flow ribbon  — glossy royal-blue S-curve crossing in front
 *   3. The fragment     — the small detached white triangle, lower right
 *
 * Environment lighting comes from three's bundled RoomEnvironment
 * (no network fetch), which is what makes the metal read as metal.
 * Motion: gentle sway + float + lerped mouse parallax. ~2k triangles.
 */

const SILVER = new THREE.MeshPhysicalMaterial({
  color: "#dfe4ec",
  metalness: 0.9,
  roughness: 0.22,
  clearcoat: 0.8,
  clearcoatRoughness: 0.25,
  envMapIntensity: 1.15
});

const BLUE = new THREE.MeshPhysicalMaterial({
  color: "#4353f0",
  metalness: 0.55,
  roughness: 0.18,
  clearcoat: 1,
  clearcoatRoughness: 0.12,
  envMapIntensity: 1.3
});

/** Sets scene.environment from the locally-bundled RoomEnvironment. */
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

/** The Λ peak — an open chevron with angled bottom cuts. */
function useApexGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 1.08); // apex
    s.lineTo(1.0, -0.58); // right outer bottom
    s.lineTo(0.56, -0.44); // right inner bottom (angled cut)
    s.lineTo(0, 0.34); // inner apex
    s.lineTo(-0.56, -0.44); // left inner bottom
    s.lineTo(-1.0, -0.58); // left outer bottom
    s.closePath();
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3,
      curveSegments: 12
    });
    geo.center();
    return geo;
  }, []);
}

/** The flow ribbon — a tapered S-curve band, pointed at both tips. */
function useRibbonGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.45, -0.95); // left tip (low)
    // top edge sweeping up-right with an S
    s.bezierCurveTo(-0.7, -0.42, -0.1, -0.38, 0.5, -0.45);
    s.bezierCurveTo(0.95, -0.5, 1.25, -0.38, 1.5, -0.18); // right tip (high)
    // bottom edge back to the left tip — tighter curve creates the taper
    s.bezierCurveTo(1.05, -0.62, 0.45, -0.78, -0.25, -0.72);
    s.bezierCurveTo(-0.8, -0.68, -1.15, -0.8, -1.45, -0.95);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 3,
      curveSegments: 24
    });
    return geo;
  }, []);
}

/** The detached fragment triangle, lower right. */
function useFragmentGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(0.34, 0.1);
    s.lineTo(0.26, -0.12);
    s.closePath();
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2
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

    // Gentle presentation sway — never a full spin; this is a logo, not a coin.
    const swayY = Math.sin(t * 0.35) * 0.28;
    const swayX = Math.sin(t * 0.22) * 0.05;

    // Lerped mouse parallax on top of the sway.
    const targetY = swayY + state.pointer.x * 0.22;
    const targetX = swayX - state.pointer.y * 0.12;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.05);

    // Slow float.
    g.position.y = Math.sin(t * 0.6) * 0.05;
  });

  return (
    <group ref={group}>
      {/* Λ peak */}
      <mesh geometry={apexGeo} material={SILVER} position={[0, 0.12, 0]} />
      {/* flow ribbon — in front, crossing the legs */}
      <mesh
        geometry={ribbonGeo}
        material={BLUE}
        position={[0, 0.06, 0.16]}
      />
      {/* fragment */}
      <mesh
        geometry={fragGeo}
        material={SILVER}
        position={[0.92, -0.92, 0.16]}
      />
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="always"
      camera={{ position: [0, 0, 4.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <StudioEnvironment />
      {/* soft key + blue rim to echo the logo's glow */}
      <directionalLight position={[3, 4, 5]} intensity={0.6} color="#ffffff" />
      <pointLight
        position={[-3, -1.5, -2]}
        intensity={10}
        color="#5865f2"
        distance={12}
      />
      <pointLight
        position={[2.5, -2.5, 2]}
        intensity={4}
        color="#8a96ff"
        distance={10}
      />
      <Mark />
    </Canvas>
  );
}
