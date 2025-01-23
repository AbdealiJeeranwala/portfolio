export function splitText(selector: string) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    const text = element.textContent || '';
    element.textContent = '';
    
    const words = text.split(' ');
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      
      const chars = word.split('');
      chars.forEach((char, charIndex) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(100%)';
        span.style.opacity = '0';
        span.style.transition = `transform 0.5s ease ${(wordIndex * 0.1) + (charIndex * 0.03)}s, opacity 0.5s ease ${(wordIndex * 0.1) + (charIndex * 0.03)}s`;
        
        requestAnimationFrame(() => {
          span.style.transform = 'translateY(0)';
          span.style.opacity = '1';
        });
        
        wordSpan.appendChild(span);
      });
      
      element.appendChild(wordSpan);
      // Add space between words
      if (wordIndex < words.length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
    });
  });
}

function setSplitText(selector: string = '.landing-info h3, .landing-intro h2, .landing-intro h1, .landing-h2-info') {
  splitText(selector);
  initializeSmooth();
  initializeScrollTrigger();
}

export function initializeSmooth() {
  // Use native smooth scroll instead of GSAP ScrollSmoother
  document.documentElement.style.scrollBehavior = 'smooth';
}

export function initializeScrollTrigger() {
  // Use Intersection Observer for scroll animations
  const observerOptions = {
    threshold: [0, 0.25, 0.5, 0.75, 1]
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  // Observe elements that need scroll-based animations
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
}

export default setSplitText;
