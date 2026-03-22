((d) => {
  const $nav = d.getElementById("navbar");
  const $btn = d.getElementById("mobileToggle");
  const $menu = d.querySelector(".nav-links");

  if (!$nav || !$btn || !$menu) return;

  const closeMenu = () => {
    $nav.classList.remove("menu-open");
    $btn.setAttribute("aria-expanded", "false");
  };

  $btn.addEventListener("click", () => {
    const isOpen = $nav.classList.toggle("menu-open");
    $btn.setAttribute("aria-expanded", String(isOpen));
  });

  d.addEventListener("click", (e) => {
    if (e.target.closest(".nav-links a")) {
      closeMenu();
      return;
    }

    if (!$nav.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
})(document);

((d) => {
  const $form = d.querySelector(".contact-form");
  const $loader = d.querySelector(".contact-form-loader");
  const $response = d.querySelector(".contact-form-response h3");

  if (!$form || !$loader || !$response) return;

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("none");
    const $btn = d.getElementById("submitBtn");
    const startTime = Date.now();
    if ($btn) {
      $btn.textContent = "Enviando...";
      $btn.style.background = "var(--goldD)";
      $btn.style.color = "var(--ink)";
    }

    fetch("https://formsubmit.co/ajax/ed58b654d478ea563c349a2f51c7f3d3", {
      method: "POST",
      body: new FormData($form)
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(() => {
        $response.textContent = "Gracias por contactarte con Nexlyr. En breve nos comunicaremos con vos.";
        if ($btn) {
          const minDisplay = 600;
          const elapsed = Date.now() - startTime;
          const wait = Math.max(0, minDisplay - elapsed);
          setTimeout(() => {
            $btn.textContent = "✓ Mensaje enviado";
            $btn.style.background = "var(--green)";
            $btn.style.color = "var(--ink)";
          }, wait);
        }
        location.hash = "#gracias";
        $form.reset();
      })
      .catch((err) => {
        const message = err.statusText || "Ocurrió un error al enviar. Intentá nuevamente.";
        $response.textContent = `Error ${err.status || ""} ${message}`.trim();
        location.hash = "#gracias";
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          if (location.hash === "#gracias") {
            location.hash = "";
          }
        }, 2800);
      });
  });
})(document);
