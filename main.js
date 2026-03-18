// Set Copyright Year
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const interactiveElements = document.querySelectorAll('a, button, .grid-item');

if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseout', () => {
      cursor.style.opacity = 0;
  });
  document.addEventListener('mouseover', () => {
      cursor.style.opacity = 1;
  });
}

// Scroll Reveal Animations Using Intersection Observer
const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale-up, .reveal-blur');

const revealOptions = {
  threshold: 0.05, // Trigger extremely early when scrolling down
  rootMargin: "0px 0px -10% 0px"
};

const revealObserver = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, revealOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Text Splitting Logic for Staggered Reveals
// Text Splitting Logic for Staggered Reveals
const splitLettersElements = document.querySelectorAll('.split-letters');
splitLettersElements.forEach(el => {
  const text = el.textContent || '';
  el.innerHTML = '';
  // Force flex to handle spans gracefully
  el.style.display = 'flex';
  el.style.flexWrap = 'wrap';
  
  text.split('').forEach((char, i) => {
    if (char === '\n') {
      const br = document.createElement('div');
      br.style.flexBasis = '100%';
      br.style.height = '0';
      el.appendChild(br);
      return;
    }
    const span = document.createElement('span');
    span.innerText = char === ' ' ? '\u00A0' : char; // Keep hard spaces intact
    span.style.transitionDelay = `${i * 0.05}s`;
    span.className = 'char-reveal';
    el.appendChild(span);
  });
});

const splitWordsElements = document.querySelectorAll('.split-words');
splitWordsElements.forEach(el => {
  const words = (el.textContent || '').split(' ');
  el.innerHTML = '';
  // Force flex to handle span spacing seamlessly
  el.style.display = 'flex';
  el.style.flexWrap = 'wrap';
  el.style.justifyContent = 'center';
  el.style.gap = '0.3em'; // Clean gap between words

  words.forEach((word, i) => {
    if (word.trim() !== "") {
      const span = document.createElement('span');
      span.innerText = word;
      span.style.transitionDelay = `${i * 0.08}s`;
      span.className = 'word-reveal';
      el.appendChild(span);
    }
  });
});

// Initial Load Animation
function triggerInitialAnimations() {
  const slideUpElements = document.querySelectorAll('.slide-up, .split-letters, .split-words');
  slideUpElements.forEach(el => {
    el.classList.add('is-visible');
  });
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // Fire slightly next tick to allow DOM to settle if just became interactive
  setTimeout(triggerInitialAnimations, 50);
} else {
  window.addEventListener('DOMContentLoaded', triggerInitialAnimations);
  window.addEventListener('load', triggerInitialAnimations); // fallback
}
