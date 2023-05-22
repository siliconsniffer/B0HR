import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let mesh, renderer, scene, raycaster, camera, controls;

let INTERSECTED;

let theta = 0;

const pointer = new THREE.Vector2();
const radius = 100;

init();
render();

function init() {

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();
    
    // camera
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 20, 20, 20 );

    raycaster = new THREE.Raycaster();
    
    // controls
    controls = new OrbitControls( camera, renderer.domElement );
    
    // ambient
    scene.add( new THREE.AmbientLight( 0x222222 ) );
    
    // light
    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 20,20, 0 );
    scene.add( light );
    
    // geometry
    const geometry = new THREE.SphereGeometry( 5, 12, 8 );
    
    // material
    const material = new THREE.MeshStandardMaterial( {
        color: 0x00ffff, 
        flatShading: true,
        transparent: true,
        opacity: 0.7,
    } );
    
    // mesh
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    document.addEventListener( 'mousemove', onPointerMove );

    window.addEventListener( 'resize', onWindowResize );
    
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onPointerMove( event ) {

  event.preventDefault();

  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function render() {

  theta += 0.1;

  camera.lookAt(scene.position);

  camera.updateMatrixWorld();

  // find intersections

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(scene.children, false);

  if (intersects.length > 0) {

    if (INTERSECTED != intersects[0].object) {

      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0xff0000);

    }

  } else {

    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

    INTERSECTED = null;

  }


  controls.update();

  renderer.render(scene, camera);

}

function animate() {

  requestAnimationFrame( animate );

  render();

}
animate();