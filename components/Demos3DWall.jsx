"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float, OrbitControls, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";
import styles from "@/styles/DemosPage.module.scss";

/* ---------------------------------------------------------
   LEVEL-8: CINEMATIC GLASS VIDEO PANEL
--------------------------------------------------------- */
function VideoPanel({ item, index, total, onOpenVideo }) {
  const ref = useRef();

  // subtle animation
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.getElapsedTime();
    ref.current.rotation.y += 0.0015;
    ref.current.position.y += Math.sin(t * 0.8 + index) * 0.003;
  });

  /* IMAX-STYLE ARC PLACEMENT */
  const arc = Math.PI * 0.9;
  const t = (index / Math.max(1, total - 1)) - 0.5;
  const angle = t * arc;

  const radius = 7.8;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius - (radius - 3.2);
  const y = -0.1 + Math.sin(index * 0.4) * 0.06;

  return (
    <group ref={ref} position={[x, y, z]} rotation={[0, -angle * 1.1, 0]}>
      <Float floatIntensity={0.35} rotationIntensity={0.35} speed={0.9}>
        {/* GLASS PANEL */}
        <mesh>
          <planeGeometry args={[2.6, 1.45]} />
          <meshPhysicalMaterial
            color="#0a0c11"
            roughness={0.15}
            metalness={0.85}
            thickness={0.6}
            transmission={0.55}
            reflectivity={1}
            clearcoat={1}
          />
        </mesh>

        {/* 2D Thumbnail Overlay */}
        <Html center transform distanceFactor={1.15}>
          <div
            className={styles.videoCard3d}
            role="button"
            onClick={() => onOpenVideo(item)}
          >
            <img src={item.thumb} alt={item.title} className={styles.thumb3d} />
            <div className={styles.playBadge}>▶</div>
            <div className={styles.titleBadge}>{item.title}</div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

/* ---------------------------------------------------------
   LEVEL-8: SCENE + LIGHTING + DEPTH ROOM
--------------------------------------------------------- */
function Scene({ items, onOpenVideo }) {
  const room = useRef();
  const sweepLight = useRef();

  // animate sweeping volumetric light
  useFrame((state) => {
    if (sweepLight.current) {
      sweepLight.current.position.x = Math.sin(state.clock.elapsedTime * 0.6) * 6;
    }
  });

  return (
    <>
      {/* Ambient + fill */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 8, 6]} intensity={0.6} />

      {/* Volumetric sweeping light */}
      <spotLight
        ref={sweepLight}
        position={[0, 5, 6]}
        angle={0.6}
        intensity={2}
        penumbra={0.5}
        color="#ff7a00"
      />

      {/* Curved IMAX wall */}
      <group ref={room} rotation={[0.02, 0.02, 0]}>
        {items.map((it, i) => (
          <VideoPanel
            key={i}
            item={it}
            index={i}
            total={items.length}
            onOpenVideo={onOpenVideo}
          />
        ))}
      </group>

      {/* Subtle reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#06070c" metalness={0.4} roughness={0.95} />
      </mesh>

      {/* Sparkle particles */}
      <Sparkles
        count={60}
        scale={[20, 8, 12]}
        size={3}
        speed={0.2}
        color="#ff7a00"
        opacity={0.3}
      />
    </>
  );
}

/* ---------------------------------------------------------
   MAIN WRAPPER
--------------------------------------------------------- */
export default function Demos3DWall({ items = [], onOpenVideo = () => {} }) {
  return (
    <div className={styles.wallWrap}>
      <Canvas camera={{ position: [0, 1.7, 10], fov: 40 }} dpr={[1, 1.75]}>
        <Suspense fallback={null}>
          <Scene items={items} onOpenVideo={onOpenVideo} />

          {/* Post FX */}
          <EffectComposer multisampling={2}>
            <Bloom intensity={0.7} luminanceThreshold={0.15} />
            <DepthOfField
              focusDistance={0.015}
              focalLength={0.015}
              bokehScale={4}
            />
          </EffectComposer>

          {/* Cinematic slow orbit */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3.3}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate
            autoRotateSpeed={0.4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
