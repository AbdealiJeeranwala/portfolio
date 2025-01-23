import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { eyebrowBoneNames, typingBoneNames } from "../../../data/boneData";

const setAnimations = (gltf: GLTF) => {
  let character = gltf.scene;
  let mixer = new THREE.AnimationMixer(character);

  function setupAnimation(clipName: string, options: { loop?: boolean; timeScale?: number } = { loop: true, timeScale: 1 }) {
    const clip = gltf.animations.find(clip => clip.name === clipName);
    if (clip) {
      const action = mixer.clipAction(clip);
      action.setLoop(options.loop !== false ? THREE.LoopRepeat : THREE.LoopOnce, 1);
      action.clampWhenFinished = !options.loop;
      action.timeScale = options.timeScale || 1;
      return action;
    }
    return null;
  }

  // Setup initial animations
  const introAction = setupAnimation("introAnimation", { loop: false, timeScale: 1 });
  introAction?.play();

  // Setup keyboard animations with both loop and timeScale
  ["key1", "key2", "key5", "key6"].forEach(name => {
    const action = setupAnimation(name, { loop: true, timeScale: 1.2 });
    action?.play();
  });

  // Setup typing animation
  const typingAction = createBoneAction(gltf, mixer, "typing", typingBoneNames);
  if (typingAction) {
    typingAction.enabled = true;
    typingAction.timeScale = 1.2;
    typingAction.play();
  }

  function startIntro() {
    const introAction = setupAnimation("introAnimation", { loop: false, timeScale: 1 });
    introAction?.reset().play();
    
    setTimeout(() => {
      const blinkAction = setupAnimation("Blink");
      blinkAction?.fadeIn(0.5).play();
    }, 2500);
  }

  function hover(gltf: GLTF, hoverDiv: HTMLDivElement) {
    let eyeBrowUpAction = createBoneAction(
      gltf,
      mixer,
      "browup",
      eyebrowBoneNames
    );
    let isHovering = false;
    if (eyeBrowUpAction) {
      eyeBrowUpAction.setLoop(THREE.LoopOnce, 1);
      eyeBrowUpAction.clampWhenFinished = true;
      eyeBrowUpAction.enabled = true;
    }
    const onHoverFace = () => {
      if (eyeBrowUpAction && !isHovering) {
        isHovering = true;
        eyeBrowUpAction.reset();
        eyeBrowUpAction.enabled = true;
        eyeBrowUpAction.setEffectiveWeight(4);
        eyeBrowUpAction.fadeIn(0.5).play();
      }
    };
    const onLeaveFace = () => {
      if (eyeBrowUpAction && isHovering) {
        isHovering = false;
        eyeBrowUpAction.fadeOut(0.6);
      }
    };
    if (!hoverDiv) return;
    hoverDiv.addEventListener("mouseenter", onHoverFace);
    hoverDiv.addEventListener("mouseleave", onLeaveFace);
    return () => {
      hoverDiv.removeEventListener("mouseenter", onHoverFace);
      hoverDiv.removeEventListener("mouseleave", onLeaveFace);
    };
  }

  return { mixer, startIntro, hover };
};

const createBoneAction = (
  gltf: GLTF,
  mixer: THREE.AnimationMixer,
  clip: string,
  boneNames: string[]
): THREE.AnimationAction | null => {
  const AnimationClip = THREE.AnimationClip.findByName(gltf.animations, clip);
  if (!AnimationClip) {
    console.error(`Animation "${clip}" not found in GLTF file.`);
    return null;
  }

  const filteredClip = filterAnimationTracks(AnimationClip, boneNames);

  return mixer.clipAction(filteredClip);
};

const filterAnimationTracks = (
  clip: THREE.AnimationClip,
  boneNames: string[]
): THREE.AnimationClip => {
  const filteredTracks = clip.tracks.filter((track) =>
    boneNames.some((boneName) => track.name.includes(boneName))
  );

  return new THREE.AnimationClip(
    clip.name + "_filtered",
    clip.duration,
    filteredTracks
  );
};

export default setAnimations;
