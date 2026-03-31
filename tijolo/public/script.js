document.addEventListener('DOMContentLoaded', () => {

  const galleryScreens = [
    { title: 'Visão geral do projeto', content: '<iframe src="interface-video.html?hideNav=true#visao" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' },
    { title: 'Pastas por disciplina', content: '<iframe src="interface-video.html?hideNav=true#pastas" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' },
    { title: 'Notificações e histórico', content: '<iframe src="interface-video.html?hideNav=true#notificacoes" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' },
    { title: 'Convites e acessos', content: '<iframe src="interface-video.html?hideNav=true#convites" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' },
    { title: 'Progresso por área', content: '<iframe src="interface-video.html?hideNav=true#progresso" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' },
    { title: 'Nuvem pesquisável', content: '<iframe src="interface-video.html?hideNav=true#nuvem" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' },
    { title: 'Agendamento de reunião', content: '<iframe src="interface-video.html?hideNav=true#reuniao" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' }
  ];

  let currentSlideIndex = 0;
  let autoplayInterval;
  let isTransitioning = false;
  let userInteracted = false;

  function renderSlide(direction = 1) {
    isTransitioning = true;
    const screen = galleryScreens[currentSlideIndex];
    document.getElementById('slideshow-label').textContent = screen.title;
    
    const contentContainer = document.getElementById('slideshow-content');
    
    // Smooth transition out
    contentContainer.classList.remove('slide-enter');
    // Set direction of translate based on direction of navigation
    if (direction > 0) {
      contentContainer.style.transform = 'translateX(10px)';
    } else {
      contentContainer.style.transform = 'translateX(-10px)';
    }
    contentContainer.classList.add('slide-leave');
    
    setTimeout(() => {
      contentContainer.innerHTML = screen.content;
      contentContainer.classList.remove('slide-leave');
      // Set initial position for enter transition
      if (direction > 0) {
        contentContainer.style.transform = 'translateX(-10px)';
      } else {
        contentContainer.style.transform = 'translateX(10px)';
      }
      
      setTimeout(() => {
        contentContainer.style.transform = 'translateX(0)';
        contentContainer.classList.add('slide-enter');
        isTransitioning = false;
      }, 20);
    }, 300);

    // Update dots
    const dotsContainer = document.getElementById('slideshow-dots');
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < galleryScreens.length; i++) {
        const dot = document.createElement('div');
        dot.className = i === currentSlideIndex ? 'slide-dot active' : 'slide-dot';
        dot.onclick = () => {
          if (i !== currentSlideIndex && !isTransitioning) {
            userInteracted = true;
            stopAutoplay();
            const dir = i > currentSlideIndex ? 1 : -1;
            currentSlideIndex = i;
            renderSlide(dir);
          }
        };
        dotsContainer.appendChild(dot);
      }
    }
    
    // Handle arrow button states
    const prevBtn = document.getElementById('slide-prev');
    const nextBtn = document.getElementById('slide-next');
    
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === galleryScreens.length - 1;
  }

  window.nextSlide = function(manual = true) {
    if (manual) {
      userInteracted = true;
      stopAutoplay();
    }
    if (currentSlideIndex < galleryScreens.length - 1 && !isTransitioning) {
      currentSlideIndex++;
      renderSlide(1);
    }
  }

  window.prevSlide = function(manual = true) {
    if (manual) {
      userInteracted = true;
      stopAutoplay();
    }
    if (currentSlideIndex > 0 && !isTransitioning) {
      currentSlideIndex--;
      renderSlide(-1);
    }
  }

  function startAutoplay() {
    if (userInteracted) return;
    
    autoplayInterval = setInterval(() => {
      if (currentSlideIndex < galleryScreens.length - 1) {
        currentSlideIndex++;
        renderSlide(1);
      } else {
        currentSlideIndex = 0; 
        renderSlide(1);
      }
    }, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Setup autoplay and hover pause
  const wrapper = document.querySelector('.slideshow-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => {
      if (!userInteracted) stopAutoplay();
    });
    wrapper.addEventListener('mouseleave', () => {
      if (!userInteracted) startAutoplay();
    });
  }

  // Initialize first slide on load
  if (document.getElementById('slideshow-content')) {
    const screen = galleryScreens[currentSlideIndex];
    document.getElementById('slideshow-label').textContent = screen.title;
    document.getElementById('slideshow-content').innerHTML = screen.content;
    
    // Update dots
    const dotsContainer = document.getElementById('slideshow-dots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < galleryScreens.length; i++) {
      const dot = document.createElement('div');
      dot.className = i === currentSlideIndex ? 'slide-dot active' : 'slide-dot';
      dot.onclick = () => {
        if (i !== currentSlideIndex && !isTransitioning) {
          userInteracted = true;
          stopAutoplay();
          const dir = i > currentSlideIndex ? 1 : -1;
          currentSlideIndex = i;
          renderSlide(dir);
        }
      };
      dotsContainer.appendChild(dot);
    }
    
    const prevBtn = document.getElementById('slide-prev');
    if (prevBtn) prevBtn.disabled = true;
    
    startAutoplay();
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (document.getElementById('slideshow-content')) {
      if (e.key === 'ArrowRight') nextSlide(true);
      if (e.key === 'ArrowLeft') prevSlide(true);
    }
  });

  // Navegação Global das Páginas (Login, App, Landing, etc)
  window.showPage = function(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    const tgt = document.getElementById('page-' + pageId);
    if (tgt) tgt.classList.add('active');

    const nav = document.getElementById('main-nav');
    if (nav) {
      if (pageId === 'app') {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Navegação Secundária do App Mockup
  window.showAppSection = function(sectionId, element) {
    document.querySelectorAll('.app-content').forEach(s => s.style.display = 'none');
    const tgt = document.getElementById('section-' + sectionId);
    if (tgt) tgt.style.display = 'block';

    if (element) {
      document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
      element.classList.add('active');
    }
  }

  // Handle Waitlist Form
  const waitlistForm = document.getElementById('hero-waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('waitlist-email');
      const btn = document.getElementById('waitlist-btn');
      const msg = document.getElementById('waitlist-message');
      const originalText = btn.textContent;
      
      btn.textContent = 'Enviando...';
      btn.style.opacity = '0.7';
      btn.disabled = true;
      emailInput.disabled = true;
      
      try {
        const res = await fetch('/api/waitlist', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ email: emailInput.value }) 
        });
        const data = await res.json();
        
        if (data.success) {
          waitlistForm.style.display = 'none';
          msg.style.display = 'block';
        } else {
          alert('Erro: ' + (data.message || 'Falha ao solicitar acesso.'));
          btn.textContent = originalText;
          btn.style.opacity = '1';
          btn.disabled = false;
          emailInput.disabled = false;
        }
      } catch (err) {
        alert('Erro de conexão. Tente novamente.');
        btn.textContent = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
        emailInput.disabled = false;
      }
    });
  }

});