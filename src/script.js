import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

let sc = new THREE.Scene();
sc.background = new THREE.Color("#302a73");

let size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

let camera = new THREE.PerspectiveCamera(35, size.width / size.height);
camera.position.z = 300;
camera.position.y = 0;
camera.position.x = 40;
sc.add(camera);

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

let canvas = document.querySelector(".web");

let renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

renderer.setSize(size.width, size.height);

let orbit = new OrbitControls(camera, canvas);
orbit.enableDamping = true;

let fontLoader = new FontLoader();
fontLoader.load("helvetiker_regular.typeface.json", (font) => {
  let textG = new TextGeometry("Text", {
    font: font,
    height: 0.5,
    size: 90,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textG.center();
  let materialt = new THREE.MeshBasicMaterial({ color: "white" });
  let mesht = new THREE.Mesh(textG, materialt);
  sc.add(mesht);
});

let sphere = new THREE.SphereGeometry(2, 62, 62);
let spherematerial = new THREE.MeshNormalMaterial();
let cnt = 1000;
for (let i = 0; i <= cnt; i++) {
  let mesh = new THREE.Mesh(sphere, spherematerial);
  mesh.position.x = (Math.random() - 0.5) * 300;
  mesh.position.y = (Math.random() - 0.5) * 300;
  mesh.position.z = (Math.random() - 0.5) * 300;
  sc.add(mesh)
}

let animation = () => {
  orbit.update();
  renderer.render(sc, camera);
  window.requestAnimationFrame(animation);
};
animation();
