const loader = new THREE.TextureLoader();
let texture = loader.load("./images/soju.png");

function changeTexture(name) {
  const loader = new THREE.TextureLoader();
  const newTexture = loader.load(`./images/${name}.png`);
  material.map = newTexture;
  material.needsUpdate = true;
  document.getElementById("win-message").style.display = "none";

  // 버튼 이미지에 해당하는 문구를 표시
  let message = "";
  switch (name) {
    case "soju":
      message = "병돌리기 시~ 작!";
      color = "#008000";
      hoverColor = "FF0000";
      break;
    case "coffee":
      message = "오늘의 커피 요정은 ~?";
      color = "#8A4B08";
      hoverColor = "#F7BE81";
      break;
    case "finger":
      message = "술래는 바로 너!";
      color = "#FA58F4";
      hoverColor = "#2EFE9A";
      break;
    default:
      message = "병돌리기 시~ 작!";
      color = "#008000";
      hoverColor = "FF0000";
  }
  document.querySelector("button").textContent = message;
  document.querySelector("button").style.backgroundColor = color;

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = hoverColor;
    });
    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = color;
    });
  });
}

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

const geometry = new THREE.BoxGeometry(0.8, 1, 1);
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
      rotationSpeed =
        ((rotationDuration - rotationTime) / rotationDuration) *
        (Math.random() * 0.5 + 0.1);
    }
    box.rotation.z += rotationSpeed;
  }

  renderer.render(scene, camera);
}

animate();
