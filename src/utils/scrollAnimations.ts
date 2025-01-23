import * as THREE from "three";

interface ScrollTimeline {
  trigger: string;
  start: string;
  end: string;
  onProgress: (progress: number) => void;
}

export class ScrollAnimationManager {
  private timelines: ScrollTimeline[] = [];
  private observers: IntersectionObserver[] = [];

  addTimeline(timeline: ScrollTimeline) {
    this.timelines.push(timeline);
    this.setupObserver(timeline);
  }

  private setupObserver(timeline: ScrollTimeline) {
    const element = document.querySelector(timeline.trigger);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progress = entry.intersectionRatio;
            timeline.onProgress(progress);
          }
        });
      },
      {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100),
        rootMargin: `${timeline.start} 0px ${timeline.end} 0px`
      }
    );

    observer.observe(element);
    this.observers.push(observer);
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.timelines = [];
    this.observers = [];
  }
}

export function createCharacterTimeline(
  character: THREE.Object3D,
  camera: THREE.PerspectiveCamera,
  screenLight: THREE.Light,
  monitor: THREE.Object3D
) {
  const manager = new ScrollAnimationManager();

  // Landing section animation
  manager.addTimeline({
    trigger: ".landing-section",
    start: "top top",
    end: "bottom top",
    onProgress: (progress) => {
      character.rotation.y = progress * 0.7;
      camera.position.z = 24.7 - (progress * 2.7);
      const model = document.querySelector(".character-model") as HTMLElement;
      if (model) {
        model.style.transform = `translateX(${progress * -25}%)`;
      }
      if (screenLight instanceof THREE.Light) {
        screenLight.intensity = progress * 0.5;
      }
    }
  });

  // About section animation
  manager.addTimeline({
    trigger: ".about-section",
    start: "center 55%",
    end: "bottom top",
    onProgress: (progress) => {
      camera.position.z = 24.7 + (progress * 50.3);
      camera.position.y = 13.1 - (progress * 4.7);
      character.rotation.y = 0.7 + (progress * 0.22);
      character.rotation.x = progress * 0.12;
      monitor.position.y = progress * -10;
      monitor.position.z = progress * 2;
    }
  });

  return manager;
} 