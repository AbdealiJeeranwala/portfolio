import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { SplitText } from "gsap-trial/SplitText";

interface ParaElement extends HTMLElement {
  observer?: IntersectionObserver;
  splitWords?: HTMLSpanElement[];
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  
  const paras = document.querySelectorAll<ParaElement>(".para");
  const titles = document.querySelectorAll<ParaElement>(".title");

  const animateElement = (element: ParaElement, isTitle: boolean = false) => {
    // Clean up previous observers
    if (element.observer) {
      element.observer.disconnect();
    }

    // Split text
    const text = element.textContent || '';
    element.textContent = '';
    
    const words = text.split(' ').map(word => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = `translateY(80px) ${isTitle ? 'rotate(10deg)' : ''}`;
      span.style.transition = `all ${isTitle ? '0.8s' : '1s'} ease-out`;
      span.textContent = word + ' ';
      return span;
    });

    element.splitWords = words;
    words.forEach(word => element.appendChild(word));

    // Create observer
    element.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        words.forEach((word, index) => {
          setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0) rotate(0)';
          }, index * (isTitle ? 30 : 20));
        });
        element.observer?.disconnect();
      }
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -10% 0px'
    });

    element.observer.observe(element);
  };

  paras.forEach(para => animateElement(para));
  titles.forEach(title => animateElement(title, true));

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
