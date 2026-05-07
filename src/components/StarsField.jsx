import { Clouds, Cloud, Stars, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import moonimg from "../assets/moon_4k.webp";

function Moon() {
  const texture = useTexture(moonimg);

  return (
    <mesh position={[3, 1, -5]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function Space() {
  const ref = useRef(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
    state.camera.position.set(
      Math.sin(t * 0.05) * 0.8,
      Math.cos(t * 0.05) * 0.3,
      5,
    );

    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={ref}>
      <Clouds>
        <Cloud
          segments={40}
          bounds={[10, 3, 3]}
          volume={8}
          color="#000000"
          opacity={0.3}
        />
        <Cloud seed={2} scale={2} volume={5} color="#ffffff" fade={50} />
      </Clouds>

      <Stars
        radius={100}
        depth={60}
        count={6000}
        factor={6}
        speed={0.02}
        fade
      />
      <Stars
        radius={100}
        depth={60}
        count={3000}
        factor={4}
        speed={0.05}
        fade
      />

      <Moon />
    </group>
  );
}

export default function StarsField() {
  return (
    <Canvas
      className="absolute inset-0 h-full w-full"
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Space />
    </Canvas>
  );
}
