import { splitTextAndAnimate, fadeInElement } from '../../utils/animations';

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");
  
  // Background transition
  document.body.style.transition = 'background-color 0.5s ease';
  setTimeout(() => {
    document.body.style.backgroundColor = "#0b080c";
  }, 1000);

  // Text animations
  splitTextAndAnimate('.landing-info h3, .landing-intro h2, .landing-intro h1');
  splitTextAndAnimate('.landing-h2-info');
  
  // Fade in animations
  const elements = document.querySelectorAll('.landing-info-h2, .header, .icons-section, .nav-fade');
  elements.forEach(element => {
    if (element instanceof HTMLElement) {
      fadeInElement(element, { delay: 0.8, duration: 1.2, y: 0 });
    }
  });
}
