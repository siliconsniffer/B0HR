import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import "./App.css";

const Sphere = ({ position, size, color }) => {
  const ref = useRef();
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    ref.current.rotation.z += delta;
    ref.current.rotation.y += 0.5 * delta;
    ref.current.position.x = Math.sin(state.clock.elapsedTime) * Math.PI * 2;
    ref.current.position.z = Math.cos(state.clock.elapsedTime) * Math.PI * 2;
    // console.log(state.clock.elapsedTime);
  });
  return (
    <mesh position={position} ref={ref} onClick={(event) => setActive(!active)}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={active ? "hotpink" : color} />
    </mesh>
  );
};

function App() {
  return (
    <Canvas>
      <OrbitControls maxDistance={25} minDistance={1} makeDefault />
      <directionalLight intensity={0.75} position={(0, 0, 2)} />
      <ambientLight intensity={0.25} />
      <axesHelper args={[5]} />

      <Sphere position={[-4, 2, -4]} color={"ForestGreen"} />
      <Sphere position={[-1, -2, 0]} color={"DarkOrange"} />
      <Sphere color={"Gold"} />
      <Sphere color={"SandyBrown"} />
    </Canvas>
  );
}

export default App;
