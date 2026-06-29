"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * A procedurally modelled dental implant — ceramic molar crown, a metallic
 * abutment collar and a tapered, helically threaded titanium/copper post.
 * Built entirely from primitives so it ships with zero binary assets.
 */
export function Implant(props: React.ComponentProps<"group">) {
  // ── Crown: a lathed ceramic profile (neck → bulge → domed top) ──
  const crownGeometry = useMemo(() => {
    const profile: THREE.Vector2[] = [
      new THREE.Vector2(0.02, 0.0),
      new THREE.Vector2(0.34, 0.0),
      new THREE.Vector2(0.46, 0.05),
      new THREE.Vector2(0.6, 0.22),
      new THREE.Vector2(0.69, 0.46),
      new THREE.Vector2(0.71, 0.7),
      new THREE.Vector2(0.66, 0.95),
      new THREE.Vector2(0.54, 1.16),
      new THREE.Vector2(0.36, 1.32),
      new THREE.Vector2(0.18, 1.42),
      new THREE.Vector2(0.05, 1.46),
      new THREE.Vector2(0.0, 1.47),
    ];
    const geo = new THREE.LatheGeometry(profile, 96);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // ── Threads: a tube swept along a tapering helix ──
  const threadGeometry = useMemo(() => {
    const turns = 13;
    const segments = turns * 40;
    const yTop = 0.0;
    const yBottom = -1.45;
    const rTop = 0.34;
    const rBottom = 0.13;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * turns * Math.PI * 2;
      const r = THREE.MathUtils.lerp(rTop, rBottom, t);
      const y = THREE.MathUtils.lerp(yTop, yBottom, t);
      pts.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, segments, 0.05, 12, false);
  }, []);

  // ── Core post: tapered cylinder beneath the threads ──
  const coreGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.3, 0.11, 1.45, 48, 1, false);
    geo.translate(0, -0.725, 0);
    return geo;
  }, []);

  const titanium = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#c5853f"),
        metalness: 1,
        roughness: 0.28,
        clearcoat: 0.5,
        clearcoatRoughness: 0.35,
        envMapIntensity: 1.4,
      }),
    [],
  );

  const ceramic = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#f4eadd"),
        metalness: 0,
        roughness: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        sheen: 0.6,
        sheenColor: new THREE.Color("#ffe9d0"),
        sheenRoughness: 0.5,
        envMapIntensity: 0.9,
        ior: 1.5,
        specularIntensity: 1,
      }),
    [],
  );

  const goldCollar = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#e3bd78"),
        metalness: 1,
        roughness: 0.22,
        clearcoat: 0.7,
        clearcoatRoughness: 0.2,
        envMapIntensity: 1.5,
        emissive: new THREE.Color("#ff8a3a"),
        emissiveIntensity: 0.18,
      }),
    [],
  );

  return (
    <group {...props}>
      {/* Crown */}
      <mesh geometry={crownGeometry} material={ceramic} position={[0, 0.34, 0]} castShadow receiveShadow />

      {/* Abutment collar */}
      <mesh material={goldCollar} position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.27, 0.34, 0.2, 48]} />
      </mesh>
      <mesh material={goldCollar} position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.32, 0.12, 48]} />
      </mesh>

      {/* Post core + threads */}
      <mesh geometry={coreGeometry} material={titanium} castShadow receiveShadow />
      <mesh geometry={threadGeometry} material={titanium} castShadow />

      {/* Rounded apex */}
      <mesh material={titanium} position={[0, -1.46, 0]} castShadow>
        <sphereGeometry args={[0.12, 32, 24]} />
      </mesh>
    </group>
  );
}
