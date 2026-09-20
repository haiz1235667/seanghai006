if (typeof document === 'undefined') {
  for (let i = 1; i <= 100; i++) {
    console.log(`${i}. Sorry Baby ❤️`);
  }
} else {
  const messages = [
    { title: 'Sorry Baby', subtitle: 'You are my peace, my joy, and my favorite place to be.' },
    { title: 'I Love You', subtitle: 'Every second with you feels softer, warmer, and more beautiful.' },
    { title: 'Forever', subtitle: 'I am grateful for your heart, your patience, and your love.' },
    { title: 'You Matter', subtitle: 'My favorite memories are the ones made with you.' },
    { title: 'Always', subtitle: 'I promise to keep choosing you with all my heart.' }
  ];

  const title = document.getElementById('title');
  const subtitle = document.getElementById('subtitle');
  const hearts = document.getElementById('hearts');
  const glow = document.getElementById('glow');

  function createHeart() {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = '❤';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${4 + Math.random() * 4}s`;
    heart.style.fontSize = `${24 + Math.random() * 26}px`;
    heart.style.opacity = `${0.5 + Math.random() * 0.5}`;
    hearts.appendChild(heart);

    setTimeout(() => heart.remove(), 9000);
  }

  function renderMessage() {
    const current = messages[Math.floor(Math.random() * messages.length)];
    title.textContent = current.title;
    subtitle.textContent = current.subtitle;

    title.classList.remove('animate');
    subtitle.classList.remove('animate');
    glow.classList.remove('pulse');

    void title.offsetWidth;
    void subtitle.offsetWidth;
    void glow.offsetWidth;

    title.classList.add('animate');
    subtitle.classList.add('animate');
    glow.classList.add('pulse');
  }

  setInterval(() => {
    createHeart();
    renderMessage();
  }, 2200);

  renderMessage();
  for (let i = 0; i < 15; i++) createHeart();
}