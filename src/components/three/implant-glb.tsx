"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/Dental_Implant_texture.glb";

// Match the on-screen extent the procedural implant used (its rig applies the
// final scale/position on top of this).
const TARGET_HEIGHT = 3;

/**
 * Textured GLB dental implant. Auto-centred and normalised to a fixed height so
 * it drops straight into the existing rig (mouse Y-rotation + scroll parallax)
 * regardless of the file's native units or origin.
 */
export function ImplantGLB(props: React.ComponentProps<"group">) {
  const { scene } = useGLTF(MODEL_URL);

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
    const s = TARGET_HEIGHT / (size.y || 1);
    return { object: obj, scale: s, offset: center };
  }, [scene]);

  return (
    <group {...props}>
      <group scale={scale}>
        <primitive object={object} position={[-offset.x, -offset.y, -offset.z]} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
