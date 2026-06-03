(function () {
  const selector = [
    ".hero-photo img",
    ".photo-frame img",
    ".showcase-main img",
    ".showcase-strip img",
    ".gallery img",
    ".plan-card img"
  ].join(",");

  const images = Array.from(document.querySelectorAll(selector)).filter((image) => {
    return !image.closest(".site-header") && !image.classList.contains("nav-bar-image");
  });

  if (!images.length) {
    return;
  }

  const lightbox = document.createElement("div");
  lightbox.className = "property-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "圖片放大檢視");
  lightbox.innerHTML = [
    '<div class="property-lightbox__panel">',
    '  <button class="property-lightbox__close" type="button" aria-label="關閉">×</button>',
    '  <button class="property-lightbox__prev" type="button" aria-label="上一張">‹</button>',
    '  <img class="property-lightbox__image" alt="">',
    '  <button class="property-lightbox__next" type="button" aria-label="下一張">›</button>',
    '  <p class="property-lightbox__caption"></p>',
    "</div>"
  ].join("");
  document.body.appendChild(lightbox);

  const preview = lightbox.querySelector(".property-lightbox__image");
  const caption = lightbox.querySelector(".property-lightbox__caption");
  const closeButton = lightbox.querySelector(".property-lightbox__close");
  const prevButton = lightbox.querySelector(".property-lightbox__prev");
  const nextButton = lightbox.querySelector(".property-lightbox__next");
  let activeIndex = 0;

  function render(index) {
    activeIndex = (index + images.length) % images.length;
    const image = images[activeIndex];
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt || "";
    caption.textContent = image.alt || "";
    prevButton.hidden = images.length < 2;
    nextButton.hidden = images.length < 2;
  }

  function open(index) {
    render(index);
    lightbox.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
    closeButton.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    images[activeIndex].focus();
  }

  images.forEach((image, index) => {
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `放大查看：${image.alt || "圖片"}`);
    image.addEventListener("click", () => open(index));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(index);
      }
    });
  });

  closeButton.addEventListener("click", close);
  prevButton.addEventListener("click", () => render(activeIndex - 1));
  nextButton.addEventListener("click", () => render(activeIndex + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) {
      return;
    }
    if (event.key === "Escape") {
      close();
    } else if (event.key === "ArrowLeft") {
      render(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      render(activeIndex + 1);
    }
  });
})();
