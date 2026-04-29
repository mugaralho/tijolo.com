document.addEventListener('DOMContentLoaded', () => {

  const SCREENS = [
    { title: 'Visão geral do projeto', html: '<iframe src="interface-video.html?hideNav=true#visao" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' },
    { title: 'Pastas por disciplina', html: '<iframe src="interface-video.html?hideNav=true#pastas" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' },
    { title: 'Notificações e histórico', html: '<iframe src="interface-video.html?hideNav=true#notificacoes" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' },
    { title: 'Convites e acessos', html: '<iframe src="interface-video.html?hideNav=true#convites" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' },
    {
  title: 'Quadro de tarefas',
  html: `
    <div style="font-family:'DM Sans',Arial,sans-serif;height:100%;display:flex;flex-direction:column;background:#fff;overflow:hidden;">
      
      <!-- TOPBAR -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 24px;border-bottom:1px solid #e5e5e5;background:#fff;flex-shrink:0;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="font-size:15px;font-weight:700;color:#111;">Residência Mourato Coelho</div>
          <div style="font-size:11px;color:#888;background:#f5f5f5;padding:3px 10px;border-radius:20px;">12 tarefas</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="font-size:11px;color:#555;background:#f5f5f5;border:1px solid #e5e5e5;padding:5px 12px;border-radius:6px;cursor:pointer;">+ Adicionar grupo</div>
          <div style="font-size:11px;color:#fff;background:#111;padding:5px 12px;border-radius:6px;cursor:pointer;">+ Nova tarefa</div>
        </div>
      </div>

      <!-- AVISO DE PERMISSÃO -->
      <div style="background:#FFFBEB;border-bottom:1px solid #FDE68A;padding:6px 24px;font-size:11px;color:#92400E;flex-shrink:0;display:flex;align-items:center;">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Somente Arquiteto Titular e perfis internos podem criar e editar tarefas
      </div>

      <!-- COLUNAS HEADER -->
      <div style="display:grid;grid-template-columns:32px 2fr 1.2fr 1fr 1fr 1fr;gap:0;padding:6px 24px;background:#f7f7f7;border-bottom:1px solid #e5e5e5;flex-shrink:0;">
        <div></div>
        <div style="font-size:10px;font-weight:700;color:#bbb;letter-spacing:1px;text-transform:uppercase;">Tarefa</div>
        <div style="font-size:10px;font-weight:700;color:#bbb;letter-spacing:1px;text-transform:uppercase;">Responsável</div>
        <div style="font-size:10px;font-weight:700;color:#bbb;letter-spacing:1px;text-transform:uppercase;">Status</div>
        <div style="font-size:10px;font-weight:700;color:#bbb;letter-spacing:1px;text-transform:uppercase;">Prazo</div>
        <div style="font-size:10px;font-weight:700;color:#bbb;letter-spacing:1px;text-transform:uppercase;">Comentários</div>
      </div>

      <!-- SCROLL AREA -->
      <div style="flex:1;overflow-y:auto;">

        <!-- GRUPO 1: ARQUITETURA -->
        <div>
          <!-- Grupo header -->
          <div style="display:flex;align-items:center;gap:8px;padding:8px 24px;background:#fff;border-bottom:1px solid #f0f0f0;cursor:pointer;">
            <div style="width:10px;height:10px;border-radius:50%;background:#2a2a3a;flex-shrink:0;"></div>
            <div style="font-size:12px;font-weight:700;color:#2a2a3a;letter-spacing:0.3px;">ARQUITETURA</div>
            <div style="font-size:10px;color:#bbb;margin-left:4px;">5 itens</div>
            <div style="margin-left:auto;font-size:10px;color:#bbb;">▾</div>
          </div>
          <!-- Linha 1 -->
          <div style="display:grid;grid-template-columns:32px 2fr 1.2fr 1fr 1fr 1fr;gap:0;padding:0 24px;border-bottom:1px solid #f5f5f5;align-items:center;min-height:40px;" onmouseenter="this.style.background='#fafafa'" onmouseleave="this.style.background='#fff'">
            <div style="width:14px;height:14px;border:1.5px solid #ddd;border-radius:3px;flex-shrink:0;"></div>
            <div style="font-size:12px;color:#111;padding:10px 0;padding-right:12px;">Desenvolver Estudo Preliminar</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:22px;height:22px;border-radius:50%;background:#2a2a3a;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;">MA</div>
              <div style="font-size:11px;color:#555;">Murilo</div>
            </div>
            <div><span style="background:#D1FAE5;color:#065F46;font-size:10px;font-weight:700;padding:3px 10px;border-radius:4px;">Concluído</span></div>
            <div style="font-size:11px;color:#888;">15/03</div>
            <div style="font-size:11px;color:#bbb;font-style:italic;">Aprovado pelo cliente</div>
          </div>
          <!-- Linha 2 -->
          <div style="display:grid;grid-template-columns:32px 2fr 1.2fr 1fr 1fr 1fr;gap:0;padding:0 24px;border-bottom:1px solid #f5f5f5;align-items:center;min-height:40px;" onmouseenter="this.style.background='#fafafa'" onmouseleave="this.style.background='#fff'">
            <div style="width:14px;height:14px;border:1.5px solid #ddd;border-radius:3px;flex-shrink:0;"></div>
            <div style="font-size:12px;color:#111;padding:10px 0;padding-right:12px;">Plantas Mapa — Revisão 02</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:22px;height:22px;border-radius:50%;background:#2a2a3a;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;">MA</div>
              <div style="font-size:11px;color:#555;">Murilo</div>
            </div>
            <div><span style="background:#FEF3C7;color:#92400E;font-size:10px;font-weight:700;padding:3px 10px;border-radius:4px;">Em andamento</span></div>
            <div style="font-size:11px;color:#D97706;font-weight:600;">22/03 ⚠</div>
            <div style="font-size:11px;color:#bbb;font-style:italic;">Ver escala 1:100</div>
          </div>
          <!-- Linha 3 -->
          <div style="display:grid;grid-template-columns:32px 2fr 1.2fr 1fr 1fr 1fr;gap:0;padding:0 24px;border-bottom:1px solid #f5f5f5;align-items:center;min-height:40px;" onmouseenter="this.style.background='#fafafa'" onmouseleave="this.style.background='#fff'">
            <div style="width:14px;height:14px;border:1.5px solid #ddd;border-radius:3px;flex-shrink:0;"></div>
            <div style="font-size:12px;color:#111;padding:10px 0;padding-right:12px;">Cortes e Elevações</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:22px;height:22px;border-radius:50%;background:#2a2a3a;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;">MA</div>
              <div style="font-size:11px;color:#555;">Murilo</div>
            </div>
            <div><span style="background:#F3F4F6;color:#6B7280;font-size:10px;font-weight:700;padding:3px 10px;border-radius:4px;">A fazer</span></div>
            <div style="font-size:11px;color:#888;">30/03</div>
            <div style="font-size:11px;color:#bbb;">—</div>
          </div>
        </div>

        <!-- GRUPO 2: ESTRUTURAL -->
        <div>
          <div style="display:flex;align-items:center;gap:8px;padding:8px 24px;background:#fff;border-bottom:1px solid #f0f0f0;border-top:1px solid #f0f0f0;cursor:pointer;">
            <div style="width:10px;height:10px;border-radius:50%;background:#4A7C6F;flex-shrink:0;"></div>
            <div style="font-size:12px;font-weight:700;color:#4A7C6F;letter-spacing:0.3px;">ESTRUTURAL</div>
            <div style="font-size:10px;color:#bbb;margin-left:4px;">3 itens</div>
            <div style="margin-left:auto;font-size:10px;color:#bbb;">▾</div>
          </div>
          <div style="display:grid;grid-template-columns:32px 2fr 1.2fr 1fr 1fr 1fr;gap:0;padding:0 24px;border-bottom:1px solid #f5f5f5;align-items:center;min-height:40px;" onmouseenter="this.style.background='#fafafa'" onmouseleave="this.style.background='#fff'">
            <div style="width:14px;height:14px;border:1.5px solid #ddd;border-radius:3px;flex-shrink:0;"></div>
            <div style="font-size:12px;color:#111;padding:10px 0;padding-right:12px;">Memorial de Cálculo</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:22px;height:22px;border-radius:50%;background:#4A7C6F;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;">RS</div>
              <div style="font-size:11px;color:#555;">Ricardo</div>
            </div>
            <div><span style="background:#D1FAE5;color:#065F46;font-size:10px;font-weight:700;padding:3px 10px;border-radius:4px;">Concluído</span></div>
            <div style="font-size:11px;color:#888;">10/03</div>
            <div style="font-size:11px;color:#bbb;font-style:italic;">Entregue via plataforma</div>
          </div>
          <div style="display:grid;grid-template-columns:32px 2fr 1.2fr 1fr 1fr 1fr;gap:0;padding:0 24px;border-bottom:1px solid #f5f5f5;align-items:center;min-height:40px;" onmouseenter="this.style.background='#fafafa'" onmouseleave="this.style.background='#fff'">
            <div style="width:14px;height:14px;border:1.5px solid #ddd;border-radius:3px;flex-shrink:0;"></div>
            <div style="font-size:12px;color:#111;padding:10px 0;padding-right:12px;">Planta de Fôrmas Rev02</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:22px;height:22px;border-radius:50%;background:#4A7C6F;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;">RS</div>
              <div style="font-size:11px;color:#555;">Ricardo</div>
            </div>
            <div><span style="background:#FEE2E2;color:#991B1B;font-size:10px;font-weight:700;padding:3px 10px;border-radius:4px;">Atrasado</span></div>
            <div style="font-size:11px;color:#DC2626;font-weight:600;">05/03 ✕</div>
            <div style="font-size:11px;color:#bbb;font-style:italic;">Aguardando revisão</div>
          </div>
        </div>

        <!-- GRUPO 3: INTERIORES -->
        <div>
          <div style="display:flex;align-items:center;gap:8px;padding:8px 24px;background:#fff;border-bottom:1px solid #f0f0f0;border-top:1px solid #f0f0f0;cursor:pointer;">
            <div style="width:10px;height:10px;border-radius:50%;background:#8b7355;flex-shrink:0;"></div>
            <div style="font-size:12px;font-weight:700;color:#8b7355;letter-spacing:0.3px;">INTERIORES</div>
            <div style="font-size:10px;color:#bbb;margin-left:4px;">2 itens</div>
            <div style="margin-left:auto;font-size:10px;color:#bbb;">▾</div>
          </div>
          <div style="display:grid;grid-template-columns:32px 2fr 1.2fr 1fr 1fr 1fr;gap:0;padding:0 24px;border-bottom:1px solid #f5f5f5;align-items:center;min-height:40px;" onmouseenter="this.style.background='#fafafa'" onmouseleave="this.style.background='#fff'">
            <div style="width:14px;height:14px;border:1.5px solid #ddd;border-radius:3px;flex-shrink:0;"></div>
            <div style="font-size:12px;color:#111;padding:10px 0;padding-right:12px;">Moodboard — Sala de Estar</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:22px;height:22px;border-radius:50%;background:#8b7355;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;">FM</div>
              <div style="font-size:11px;color:#555;">Fernanda</div>
            </div>
            <div><span style="background:#FEF3C7;color:#92400E;font-size:10px;font-weight:700;padding:3px 10px;border-radius:4px;">Em andamento</span></div>
            <div style="font-size:11px;color:#888;">25/03</div>
            <div style="font-size:11px;color:#bbb;font-style:italic;">Paleta aprovada</div>
          </div>
        </div>

      </div><!-- /scroll -->
    </div>
  `
},
    { title: 'Nuvem pesquisável', html: '<iframe src="interface-video.html?hideNav=true#nuvem" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' },
    { title: 'Agendamento de reunião', html: '<iframe src="interface-video.html?hideNav=true#reuniao" style="width: 133.33%; height: 133.33%; transform: scale(0.75); transform-origin: 0 0; border: none; pointer-events: none; background: var(--off);"></iframe>' }
  ];

  let currentSlideIndex = 0;
  let autoplayInterval;
  let isTransitioning = false;
  let userInteracted = false;

  function renderSlide(direction = 1) {
    isTransitioning = true;
    const screen = SCREENS[currentSlideIndex];
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
      contentContainer.innerHTML = screen.html;
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
      for (let i = 0; i < SCREENS.length; i++) {
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
    if (nextBtn) nextBtn.disabled = currentSlideIndex === SCREENS.length - 1;
  }

  window.nextSlide = function (manual = true) {
    if (manual) {
      userInteracted = true;
      stopAutoplay();
    }
    if (currentSlideIndex < SCREENS.length - 1 && !isTransitioning) {
      currentSlideIndex++;
      renderSlide(1);
    }
  }

  window.prevSlide = function (manual = true) {
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
    stopAutoplay(); // Ensure no duplicates

    autoplayInterval = setInterval(() => {
      // Only advance if page is visible
      if (document.hidden) return;

      if (currentSlideIndex < SCREENS.length - 1) {
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
    const screen = SCREENS[currentSlideIndex];
    document.getElementById('slideshow-label').textContent = screen.title;
    document.getElementById('slideshow-content').innerHTML = screen.html;

    // Update dots
    const dotsContainer = document.getElementById('slideshow-dots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < SCREENS.length; i++) {
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
  window.showPage = function (pageId) {
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
  window.showAppSection = function (sectionId, element) {
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
  // ── SWIPE MOBILE NO SLIDESHOW ─────────────────────
  (function() {
    var stage = document.querySelector('.slideshow-stage');
    if (!stage) return;

    var touchStartX = 0;
    var touchEndX = 0;
    var swipeThreshold = 50; // px mínimos para considerar swipe

    stage.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe para esquerda → próximo slide
          if (typeof window.nextSlide === 'function') window.nextSlide(true);
        } else {
          // Swipe para direita → slide anterior
          if (typeof window.prevSlide === 'function') window.prevSlide(true);
        }
      }
    }, { passive: true });
  })();

  // ── LIGHTBOX GALERIA ──────────────────────────────────
  var lightboxIndex = 0;
  var lightboxHintShown = false;

  window.openLightbox = function(idx) {
    lightboxIndex = (idx !== undefined) ? idx : currentSlideIndex;
    var overlay = document.getElementById('lightboxOverlay');
    if (overlay) overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    window.renderLightbox();
    // Esconde dica após 2.5s
    if (!lightboxHintShown) {
      lightboxHintShown = true;
      setTimeout(function() {
        var hint = document.getElementById('lightboxHint');
        if (hint) hint.style.opacity = '0';
      }, 2500);
    }
  }

  window.closeLightboxBtn = function() {
    var overlay = document.getElementById('lightboxOverlay');
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  window.closeLightbox = function(e) {
    if (e.target === document.getElementById('lightboxOverlay') ||
        e.target === document.getElementById('lightboxScrollContainer')) {
      window.closeLightboxBtn();
    }
  }

  window.navLightbox = function(dir) {
    var next = lightboxIndex + dir;
    if (next >= 0 && next < SCREENS.length) {
      lightboxIndex = next;
      window.renderLightbox();
      // Scroll para o topo ao navegar
      var sc = document.getElementById('lightboxScrollContainer');
      if (sc) sc.scrollTop = 0;
    }
  }

  window.renderLightbox = function() {
    var s = SCREENS[lightboxIndex];
    if (!s) return;

    // Conteúdo renderizado em largura desktop — sem redimensionamento
    var screen = document.getElementById('lightboxScreen');
    var counter = document.getElementById('lightboxCounter');
    var title = document.getElementById('lightboxTitle');
    var dots = document.getElementById('lightboxDots');

    if (screen) screen.innerHTML = s.html;
    if (counter) counter.textContent = (lightboxIndex + 1) + ' / ' + SCREENS.length;
    if (title) title.textContent = s.title;

    if (dots) {
      dots.innerHTML = SCREENS.map(function(_, i) {
        var isActive = i === lightboxIndex;
        return '<div onclick="window.navLightbox(' + (i - lightboxIndex) + ');event.stopPropagation();" style="' +
          'width:' + (isActive ? '20px' : '6px') + ';' +
          'height:6px;border-radius:3px;' +
          'background:' + (isActive ? 'white' : 'rgba(255,255,255,0.3)') + ';' +
          'cursor:pointer;transition:all 0.2s;flex-shrink:0;"></div>';
      }).join('');
    }
  }

  // Swipe horizontal para navegar entre slides no lightbox
  (function() {
    var startX = 0;
    var startY = 0;
    var isLightboxSwipe = false;

    document.addEventListener('touchstart', function(e) {
      var overlay = document.getElementById('lightboxOverlay');
      if (!overlay || overlay.style.display !== 'flex') return;
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isLightboxSwipe = true;
      }
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
      if (!isLightboxSwipe) return;
      var overlay = document.getElementById('lightboxOverlay');
      if (!overlay || overlay.style.display !== 'flex') return;
      isLightboxSwipe = false;

      var diffX = startX - e.changedTouches[0].clientX;
      var diffY = startY - e.changedTouches[0].clientY;

      // Só navega se o swipe for predominantemente horizontal
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
        window.navLightbox(diffX > 0 ? 1 : -1);
      }
    }, { passive: true });

    // ESC fecha
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') window.closeLightboxBtn();
      if (e.key === 'ArrowLeft') window.navLightbox(-1);
      if (e.key === 'ArrowRight') window.navLightbox(1);
    });
  })();
});

// ── MENU MOBILE ──────────────────────────────────────

function toggleMobileMenu() {
  const menu = document.getElementById('navMobileMenu');
  const btn = document.getElementById('navHamburger');
  if (!menu || !btn) return;
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function closeMobileMenu() {
  const menu = document.getElementById('navMobileMenu');
  const btn = document.getElementById('navHamburger');
  if (!menu || !btn) return;
  menu.classList.remove('open');
  btn.classList.remove('open');
  document.body.style.overflow = '';
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Fechar menu ao clicar fora
document.addEventListener('click', function(e) {
  const menu = document.getElementById('navMobileMenu');
  const btn = document.getElementById('navHamburger');
  if (!menu || !btn) return;
  if (menu.classList.contains('open')) {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      closeMobileMenu();
    }
  }
});