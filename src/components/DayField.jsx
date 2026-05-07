import { Cloud, Clouds, Sky } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function MovingClouds() {
  const cloudRef = useRef(null);

  useFrame((_, delta) => {
    if (cloudRef.current) {
      cloudRef.current.position.x += delta * 0.5;

      if (cloudRef.current.position.x > 10) {
        cloudRef.current.position.x = -10;
      }
    }
  });

  return (
    <Clouds ref={cloudRef} position={[-10, 1, 0]}>
      <Cloud segments={20} bounds={[6, 2, 2]} volume={3} opacity={0.8} />
    </Clouds>
  );
}

export default function DayField() {
  return (
    <Canvas
      className="absolute inset-0 h-full w-full"
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} />

      <Sky sunPosition={[100, 20, 100]} />

      <MovingClouds />
    </Canvas>
  );
}
