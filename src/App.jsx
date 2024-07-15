import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Trail } from "@react-three/drei";
import { useRef, useState } from "react";
import "./App.css";

const Sphere = ({ position, size, color }) => {
  const ref = useRef();
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  useFrame((state, delta) => {
    const speed = setActive ? 5 : 1;
    ref.current.rotation.z += delta * speed;
    ref.current.rotation.y += delta * speed;
    ref.current.position.x = Math.sin(state.clock.elapsedTime) * Math.PI * 0.75;
    ref.current.position.z = Math.cos(state.clock.elapsedTime) * Math.PI * 0.75;
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * Math.PI * 0.5;
    // console.log(state.clock.elapsedTime);
  });
  return (
    <Trail width={0.25} color={"gray"} length={67} decay={1} local={false}>
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
      <OrbitControls maxDistance={25} minDistance={1} makeDefault />
      <directionalLight intensity={0.75} position={(0, 0, 2)} />
      <ambientLight intensity={0.25} />
      {/* <axesHelper args={[5]} /> */}

      <Sphere position={[-4, 2, -4]} color={"ForestGreen"} />
      {/* <Sphere position={[-1, -2, 0]} color={"DarkOrange"} />
      <Sphere color={"Gold"} />
      <Sphere color={"SandyBrown"} /> */}
    </Canvas>
  );
}

export default App;
