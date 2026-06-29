"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/Denture_Duo_texture.glb";
const DRACO_PATH = "/draco/"; // local Draco decoder (no CDN)
const TARGET_DIAG = 4.1; // oversized but ~0.75× of before (less screen-filling)
const X_OFFSET = 1.4; // shifted further to the right
const Y_OFFSET = 0.9; // sits lower in the frame (was too high)
const LOOK_DOWN = 0.42; // base X tilt → the mouth looks down at the viewer

/**
 * Oversized denture for the Technology section. Fixed high in the frame and
 * tilted to look down at the viewer; it rotates to face the cursor (Y for
 * left/right, a slight X for up/down) on top of that base pose. Never translates.
 */
function Denture() {
  const { scene } = useGLTF(MODEL_URL, DRACO_PATH);
  const spin = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { object, scale, offset } = useMemo(() => {
    const obj = scene.clone(true);
    obj.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    const box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const diag = Math.hypot(size.x, size.z) || 1;
    return { object: obj, scale: TARGET_DIAG / diag, offset: center };
  }, [scene]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_state, delta) => {
    const g = spin.current;
    if (!g) return;
    const k = 1 - Math.pow(0.0016, delta);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.current.x * 0.85, k);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.current.y * 0.18, k);
  });

  return (
    <group position={[X_OFFSET, Y_OFFSET, 0]} rotation={[LOOK_DOWN, 0, 0]}>
      <group ref={spin}>
        <group scale={scale}>
          <primitive object={object} position={[-offset.x, -offset.y, -offset.z]} />
        </group>
      </group>
    </group>
  );
}

/** Frameless denture viewer — transparent, no chrome. */
export default function DentureScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 0.1, 6], fov: 32 }}
      style={{ position: "absolute", inset: 0, background: "transparent" }}
    >
      <ambientLight intensity={0.22} color="#ffffff" />

      {/* RED accent from BEHIND, raking the gums → the reds get richer */}
      <pointLight position={[0, -0.4, -4]} intensity={46} color="#ff1620" distance={16} />
      <pointLight position={[2.2, 0.6, -3]} intensity={24} color="#ff2a2e" distance={13} />

      <Suspense fallback={null}>
        <Denture />
        <Environment resolution={256} environmentIntensity={0.5}>
          <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 2, 5]} scale={[6, 6, 1]} />
          <Lightformer form="rect" intensity={1.6} color="#ff3a30" position={[0, -1, -4]} scale={[6, 5, 1]} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL, DRACO_PATH);
