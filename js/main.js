/* ── Projects Carousel ── */

(function () {
  const track = document.getElementById('projects-track');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');
  const cards = track.querySelectorAll('.project-card');
  const totalCards = cards.length;

  let currentIndex = 0;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w > 1024) return 3;
    if (w > 768) return 2;
    return 1;
  }

  function getGap() {
    return 2; // matches CSS gap: 2px
  }

  function update() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, totalCards - visibleCount);

    // Clamp currentIndex
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    // Calculate the offset
    // Each card width = (trackWrapperWidth - gap*(visibleCount-1)) / visibleCount
    // Offset = currentIndex * (cardWidth + gap)
    const wrapperWidth = track.parentElement.offsetWidth;
    const gap = getGap();
    const cardWidth = (wrapperWidth - gap * (visibleCount - 1)) / visibleCount;
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    // Update button states
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex >= maxIndex;
  }

  btnPrev.addEventListener('click', function () {
    currentIndex--;
    update();
  });

  btnNext.addEventListener('click', function () {
    currentIndex++;
    update();
  });

  // Recalculate on resize
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(update, 100);
  });

  // Initial state
  update();
})();
