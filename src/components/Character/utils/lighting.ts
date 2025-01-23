import * as THREE from "three";
import { RGBELoader } from "three-stdlib";

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;

  const pointLight = new THREE.PointLight(0xffffff, 0);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);
  scene.add(directionalLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function turnOnLights() {
    // Use requestAnimationFrame for smooth transitions
    let intensity = 0;
    const targetIntensity = 1;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      intensity = progress * targetIntensity;
      directionalLight.intensity = intensity;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);

    // Animate character rim
    const rim = document.querySelector(".character-rim") as HTMLElement;
    if (rim) {
      rim.style.transform = "translateY(55%)";
      rim.style.opacity = "1";
      rim.style.transition = "all 2s ease 0.2s";
    }
  }

  function setPointLight(light: THREE.Object3D | null) {
    if (light) {
      pointLight.position.copy(light.position);
    }
  }

  return { turnOnLights, setPointLight };
};

export default setLighting;
