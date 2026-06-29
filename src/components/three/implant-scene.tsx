"use client";

import { useRef, useReducer, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { ImplantGLB } from "./implant-glb";

const BASE_Y = -0.1;
const BASE_SCALE = 0.59;
const DROP_HEIGHT = 4.2; // starts this far above its resting spot, off-frame
const REVEAL_EVENT = "denta:reveal";

/**
 * The implant rig:
 *  • MOUSE  → rotates ONLY about its Y axis (turntable), following the cursor.
 *  • SCROLL → rises and recedes faster than the surrounding hero text, so the
 *             object reads as a foreground "hero" element telling a story as the
 *             section parallaxes away.
 *
 * Pointer is tracked on `window` (not via R3F's canvas pointer) because the
 * canvas is `pointer-events: none` so it never intercepts UI interactions.
 */
function Rig({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointerX = useRef(0);
  const scroll = useRef(0);
  // Under reduced-motion the model simply starts at rest (no drop-in).
  const revealed = useRef(reduced);

  useEffect(() => {
    if (reduced) return;
    // If the loader already finished before this mounted, reveal immediately.
    if ((window as unknown as { __dentaRevealed?: boolean }).__dentaRevealed) {
      revealed.current = true;
    }
    const onReveal = () => {
      revealed.current = true;
    };
    const onMove = (e: PointerEvent) => {
      pointerX.current = (e.clientX / window.innerWidth) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    };
    onScroll();
    window.addEventListener(REVEAL_EVENT, onReveal);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener(REVEAL_EVENT, onReveal);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  useFrame((_state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = scroll.current; // 0 at top → 1 after one viewport of scroll

    const targetRy = pointerX.current * Math.PI * 0.75; // mouse → Y spin (~±135°), a touch wider
    // Held above the frame until the loader clears, then floats down to rest
    // (and thereafter follows the scroll parallax).
    const restY = BASE_Y + p * 1.9;
    const targetY = revealed.current ? restY : BASE_Y + DROP_HEIGHT;
    const targetScale = BASE_SCALE * (1 - p * 0.18); // recede slightly with depth

    const k = 1 - Math.pow(0.0026, delta); // position / scale damping
    const kRot = 1 - Math.pow(0.0013, delta); // snappier, freer mouse-follow
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRy, kRot);
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, k);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetScale, k));
  });

  return (
    <group ref={group} position={[0, reduced ? BASE_Y : BASE_Y + DROP_HEIGHT, 0]} scale={BASE_SCALE}>
      {/* Jewel rim-light glow at the crown ↔ post joint */}
      <pointLight position={[0, 0.18, 0.85]} intensity={6} color="#ff8a5a" distance={3.2} />
      <ImplantGLB />
    </group>
  );
}

export default function ImplantScene() {
  const [reduced] = useReducer(
    () => true,
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 0.2, 6], fov: 32 }}
      style={{ background: "transparent" }}
    >
      {/* Cinematic blood-warm lighting */}
      <ambientLight intensity={0.35} color="#ff9d7e" />
      <directionalLight
        position={[-3.5, 5, 4]}
        intensity={3.4}
        color="#ffc098"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
      >
        <orthographicCamera attach="shadow-camera" args={[-4, 4, 4, -4, 0.1, 20]} />
      </directionalLight>
      <pointLight position={[4, -1.5, 2.5]} intensity={30} color="#ff5230" distance={14} />
      <pointLight position={[-2, 1, -4]} intensity={24} color="#e83820" distance={16} />

      {/* (1) Soft pure-white key from directly above — a light source on top of the implant */}
      <spotLight
        position={[0, 6, 1.5]}
        angle={0.6}
        penumbra={0.85}
        decay={1.3}
        intensity={55}
        color="#ffffff"
      />
      {/* (2) Red accent from the front-right, lifting the implant's shadowed (dark) side */}
      <pointLight position={[2.6, 0.35, 2.6]} intensity={30} color="#ff2630" distance={11} />

      <Suspense fallback={null}>
        <Rig reduced={reduced} />
        <ContactShadows
          position={[0, -2.05, 0]}
          opacity={0.5}
          scale={9}
          blur={3}
          far={4}
          color="#2a0f04"
          resolution={512}
        />
        {/* Self-contained warm studio environment for PBR reflections */}
        <Environment resolution={256} environmentIntensity={0.85}>
          <Lightformer
            form="rect"
            intensity={3}
            color="#ff9a66"
            position={[-4, 3, 4]}
            scale={[7, 7, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2.3}
            color="#ff4a2a"
            position={[4, -1, 3]}
            scale={[5, 6, 1]}
          />
          <Lightformer
            form="circle"
            intensity={2.6}
            color="#ffd8c4"
            position={[0, 4, -3]}
            scale={4}
          />
          <Lightformer
            form="rect"
            intensity={1.2}
            color="#5a0c06"
            position={[0, -4, -4]}
            scale={[12, 5, 1]}
          />
        </Environment>
      </Suspense>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
