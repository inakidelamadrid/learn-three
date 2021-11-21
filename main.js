import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // near clipping plane
    1000, // far clipping plane
  );
  const renderer = new THREE.WebGLRenderer(); // webgl renderer or others for older browsers
  renderer.setClearColor(0xEEEEEE, 1.0); // set background color
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; // enable shadow
  
  const axes = new THREE.AxesHelper(40);
  scene.add(axes);

  const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;
  scene.add(plane);


  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  cube.position.x = -4;
  cube.position.y = 3
  cube.position.z = 0
  cube.castShadow = true;

  scene.add(cube)

  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff});
  const sphere  = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.position.x = 30;
  sphere.position.y = 4;
  sphere.position.z = 0;
  sphere.castShadow = true;
  scene.add(sphere)

  const spotlight = new THREE.SpotLight(0xffffff);
  spotlight.position.set(-40, 60, -10);
  scene.add(spotlight);
  spotlight.castShadow = true;

  // three will use a canvas element to render the scene
  document.querySelector('#app').append(renderer.domElement)

  camera.position.x = -30
  camera.position.y  = 40
  camera.position.z = 30

  camera.lookAt(scene.position)

  let step = 0

  function renderScene() {
    cube.rotation.x += 0.02
    cube.rotation.y += 0.02
    cube.rotation.z += 0.02

    step += 0.04
    sphere.position.x = 20 + 10 * Math.cos(step)
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }
  // Initiate function or other initializations here
  renderScene();
