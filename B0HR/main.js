import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
renderer.render( scene, camera );

//Obama in the middle
const geometry = new THREE.SphereGeometry( 2.5, 32, 32, 100)
//const texture = new THREE.TextureLoader().load("obama.png")
const material = new THREE.MeshStandardMaterial( {color: 0xffffff});
const sphere = new THREE.Mesh( geometry, material );
scene.add(sphere)

//Adds a Pointlight and set its Position
/*const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,25,5)*/


const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight, /*pointLight*/)


// Points out a Mesh resembling the PointLight and the Grid
//const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(/*lightHelper,*/ gridHelper)

// Adds mouse-controls for the camera
const controls = new OrbitControls(camera, renderer.domElement);

function addAtom() {
  const geometry = new THREE.SphereGeometry(5, 25,25);
  const material = new THREE.MeshStandardMaterial( { color: 0x0006FF} )
  const nukleon = new THREE.Mesh( geometry, material);

}


  const elektronGeo = new THREE.SphereGeometry(3,32,16)
  const elektronMat = new THREE.MeshStandardMaterial({color: 0x0006FF})
  const elektron = new THREE.Mesh( elektronGeo, elektronMat);
  scene.add(elektron)


/*function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 25,25);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff} )
  const star = new THREE.Mesh( geometry, material);
  
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
  
}

Array(200).fill().forEach(addStar)*/

var t = 0;

function animate() {
  requestAnimationFrame( animate );
  t += 0.01;
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.003;
  sphere.rotation.z += 0.01

  elektron.position.y = 25*Math.cos(t) + 0;
  elektron.position.x = 25*Math.cos(t) + 0;
  elektron.position.z = 25*Math.sin(t) + 0;

  controls.update();

  renderer.render( scene, camera );
}

animate()