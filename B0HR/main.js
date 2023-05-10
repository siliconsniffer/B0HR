import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//envireoment
  const scene = new THREE.Scene();
  // sets new camera and engine (webGL)
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
  
  //light
  const ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(ambientLight)
  
  //settings for rendering
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  
  // camera positioning
  camera.position.setZ(30);
  
  //render
  renderer.render( scene, camera );

  // Points out a Mesh resembling the Grid
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(gridHelper)

// Adds mouse-controls for the camera
const controls = new OrbitControls(camera, renderer.domElement);

//Sphere in the middle
const geometry = new THREE.SphereGeometry( 2.5, 32, 32, 100)
const material = new THREE.MeshStandardMaterial( {color: 0xffffff, wireframe: true});
const sphere = new THREE.Mesh( geometry, material);
scene.add(sphere)

//Sphere in the other
const geometry1 = new THREE.SphereGeometry( 1, 16, 16, 10)
const material1 = new THREE.MeshStandardMaterial( {color: 0xffffff});
const sphere1 = new THREE.Mesh( geometry1, material1);
scene.add(sphere1)

//Blue Sphere
const elektronGeo = new THREE.SphereGeometry(3,32,16)
const elektronMat = new THREE.MeshStandardMaterial({color: 0x0006FF})
const elektron = new THREE.Mesh( elektronGeo, elektronMat);

const newElektron = elektron.clone();
newElektron.position.x = -10;

scene.add(elektron, newElektron);

elektron.position.x = 10;
sphere1.add(elektron, newElektron);


function animate() {
  requestAnimationFrame( animate );
  sphere1.rotateY(0.005);

  controls.update();

  renderer.render( scene, camera );
}

animate()