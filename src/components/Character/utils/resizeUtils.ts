import * as THREE from "three";

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character: THREE.Object3D
) {
  if (!canvasDiv.current) return;
  let canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width;
  const height = canvas3d.height;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  
  // Remove ScrollTrigger references and use native scroll handling
  updateCharacterPosition(character, camera);
}

function updateCharacterPosition(character: THREE.Object3D, camera: THREE.PerspectiveCamera) {
  const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  // Add your character animation logic here based on scroll progress
  character.position.y = Math.sin(scrollProgress * Math.PI) * 2;
  camera.lookAt(character.position);
}
