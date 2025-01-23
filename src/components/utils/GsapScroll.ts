import * as THREE from "three";
import { createCharacterTimeline } from '../../utils/scrollAnimations';

export function setCharTimeline(character: THREE.Object3D, camera: THREE.PerspectiveCamera) {
  if (!character || !camera) return;
  
  const screenLight = character.getObjectByName("screenlight") as THREE.PointLight;
  const monitor = character.getObjectByName("Plane004");
  
  if (!screenLight || !monitor) return;
  
  const timeline = createCharacterTimeline(character, camera, screenLight, monitor);
  
  return () => timeline.destroy();
}

export function setAllTimeline() {
  const careerSection = document.querySelector(".career-section") as HTMLElement;
  const careerTimeline = document.querySelector(".career-timeline") as HTMLElement;
  const careerInfoBoxes = document.querySelectorAll(".career-info-box");
  const careerDot = document.querySelector(".career-dot") as HTMLElement;

  if (!careerSection || !careerTimeline || !careerDot) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Timeline animations
        careerTimeline.style.maxHeight = "100%";
        careerTimeline.style.opacity = "1";
        careerTimeline.style.transition = "max-height 0.5s, opacity 0.1s";

        // Info box animations
        careerInfoBoxes.forEach((box, index) => {
          if (box instanceof HTMLElement) {
            box.style.opacity = "1";
            box.style.transition = `opacity 0.5s ${index * 0.1}s`;
          }
        });

        // Dot animation
        careerDot.style.animationIterationCount = "1";
        careerDot.style.transition = "all 0.1s 0.3s";

        // Section movement for larger screens
        if (window.innerWidth > 1024) {
          careerSection.style.transform = "translateY(20%)";
          careerSection.style.transition = "transform 0.5s 0.2s";
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(careerSection);
}
