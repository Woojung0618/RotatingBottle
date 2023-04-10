const loader = new THREE.TextureLoader();
const texture = loader.load('soju.png');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

let isRotating = false;
let rotationSpeed = 0.75;
let rotationDuration = 4500; // 5 seconds
let rotationStartTime = 0;

function rotateBox() {
  if (!isRotating) {
    isRotating = true;
    rotationStartTime = Date.now();
    document.getElementById("win-message").style.display = "none";
  }
}

function animate() {
  requestAnimationFrame(animate);

  if (isRotating) {
    const rotationTime = Date.now() - rotationStartTime;
    if (rotationTime >= rotationDuration) {
      isRotating = false;
      rotationSpeed = 0;
      document.getElementById("win-message").style.display = "block";
    } else {
      rotationSpeed = (rotationDuration - rotationTime) / rotationDuration * (Math.random() * 0.5 + 0.1);
    }
    box.rotation.z += rotationSpeed;
  }

  renderer.render(scene, camera);
}

animate();