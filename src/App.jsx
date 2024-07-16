import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Trail } from "@react-three/drei";
import { useRef, useState } from "react";
import { Physics } from "@react-three/rapier";
import "./App.css";

const Sphere = ({ position, size, color }) => {
  const ref = useRef();
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  useFrame((state, delta) => {
    const speed = active ? 1.5 : hover ? 0.2 : 1;
    ref.current.rotation.z += delta * speed;
    ref.current.rotation.y += delta * speed;
    ref.current.position.x = Math.sin(state.clock.elapsedTime) * Math.PI * 0.75;
    ref.current.position.z = Math.cos(state.clock.elapsedTime) * Math.PI * 0.75;
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * Math.PI * 0.5;
  });
  return (
    <Trail width={0.25} color={"gray"} length={10} decay={1} local={false}>
      <mesh
        position={position}
        ref={ref}
        onClick={(event) => setActive(!active)}
        onPointerEnter={(hover) => (hover.stopPropagation(), setHover(true))}
        onPointerLeave={() => setHover(false)}
      >
        <sphereGeometry args={size} />
        <meshStandardMaterial
          color={active ? "hotpink" : hover ? "red" : color}
          wireframe
        />
      </mesh>
    </Trail>
  );
};

function App() {
  return (
    <Canvas>
      <OrbitControls
        maxDistance={25}
        minDistance={1}
        makeDefault
        enableZoom={false}
      />
      <directionalLight intensity={0.75} position={(0, 0, 2)} />
      <ambientLight intensity={0.25} />
      <axesHelper args={[5]} />

      <Sphere position={[-4, 2, -4]} color={"ForestGreen"} size={[0.01]} />
      {/* <Sphere position={[-1, -2, 0]} color={"DarkOrange"} />
      <Sphere color={"Gold"} />
      <Sphere color={"SandyBrown"} /> */}
    </Canvas>
  );
}

export default App;
