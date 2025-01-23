export function splitTextAndAnimate(
  selector: string,
  options = { delay: 0.3, duration: 1.2 }
) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    const text = element.textContent || '';
    element.textContent = '';
    
    const chars = text.split('');
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(80px)';
      span.style.filter = 'blur(5px)';
      span.style.transition = `all ${options.duration}s ease-in-out`;
      span.style.transitionDelay = `${options.delay + (index * 0.025)}s`;
      element.appendChild(span);

      // Trigger animation
      requestAnimationFrame(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
        span.style.filter = 'blur(0)';
      });
    });
  });
}

export function fadeInElement(
  element: HTMLElement,
  options: { delay: number; duration: number; y: number }
) {
  element.style.opacity = '0';
  element.style.transform = `translateY(${options.y}px)`;
  element.style.transition = `all ${options.duration}s ease-in-out`;
  element.style.transitionDelay = `${options.delay}s`;

  requestAnimationFrame(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  });
} 