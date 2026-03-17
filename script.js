((d) => {
  const $btn = d.querySelector(".menu-btn");
  const $menu = d.querySelector(".menu");

  if (!$btn || !$menu) return;

  const closeMenu = () => {
    $menu.classList.remove("is-active");
    $btn.classList.remove("is-open");
    $btn.setAttribute("aria-expanded", "false");
  };

  $btn.addEventListener("click", () => {
    const isOpen = $menu.classList.toggle("is-active");
    $btn.classList.toggle("is-open", isOpen);
    $btn.setAttribute("aria-expanded", String(isOpen));
  });

  d.addEventListener("click", (e) => {
    if (e.target.matches(".menu a")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
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

    fetch("https://formsubmit.co/ajax/nexlyr.dev@gmail.com", {
      method: "POST",
      body: new FormData($form)
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(() => {
        $response.textContent = "Gracias por contactarte con ENFOCATE. En breve nos comunicaremos con vos.";
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
