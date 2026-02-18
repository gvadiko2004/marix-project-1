document.addEventListener("DOMContentLoaded", () => {
  const waitlist = document.querySelector("#waitlist");
  if (waitlist) {
    const base = [
      waitlist.querySelector(".pill"),
      waitlist.querySelector(".hero__title"),
      waitlist.querySelector(".hero__subtitle"),
      waitlist.querySelector(".form-card"),
    ].filter(Boolean);

    const fields = Array.from(waitlist.querySelectorAll(".form-card .field"));
    const btn = waitlist.querySelector(".form-card .btn");
    const note = waitlist.querySelector(".form-note");
    const dot = waitlist.querySelector(".pill__dot");

    const setInitial = (el, y = 18, blur = 6) => {
      el.style.opacity = "0";
      el.style.transform = `translate3d(0,${y}px,0)`;
      el.style.filter = `blur(${blur}px)`;
      el.style.willChange = "transform, opacity, filter";
    };

    const setInitialFade = (el) => {
      el.style.opacity = "0";
      el.style.willChange = "opacity";
    };

    const cleanup = (el) => {
      el.style.opacity = "";
      el.style.transform = "";
      el.style.filter = "";
      el.style.willChange = "";
    };

    base.forEach((el) => setInitial(el, 18, 6));
    fields.forEach((el) => setInitial(el, 14, 4));

    if (btn) {
      btn.style.opacity = "0";
      btn.style.transform = "translate3d(0,14px,0) scale(.98)";
      btn.style.willChange = "transform, opacity";
    }

    if (note) setInitialFade(note);
    if (dot) dot.style.willChange = "transform, opacity";

    const reveal = () => {
      waitlist.classList.add("is-inview");
      base.forEach(cleanup);
      fields.forEach(cleanup);
      if (btn) cleanup(btn);
      if (note) cleanup(note);
      if (dot) dot.style.willChange = "";
    };

    const ioWaitlist = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        reveal();
        ioWaitlist.disconnect();
      },
      { threshold: 0.01 }
    );

    ioWaitlist.observe(waitlist);
  }

  const cards = Array.from(document.querySelectorAll(".wrap-cards__content"));
  if (!cards.length) return;

  const setInitialCard = (el) => {
    el.style.opacity = "0";
    el.style.transform = "translate3d(0,14px,0)";
    el.style.filter = "blur(6px)";
    el.style.willChange = "transform, opacity, filter";
  };

  const cleanupCard = (el) => {
    el.style.opacity = "";
    el.style.transform = "";
    el.style.filter = "";
    el.style.willChange = "";
  };

  cards.forEach((wrap) => {
    const icon = wrap.querySelector(".card__icon");
    const title = wrap.querySelector(".card__title");
    const items = Array.from(wrap.querySelectorAll(".card__list li"));
    if (icon) setInitialCard(icon);
    if (title) setInitialCard(title);
    items.forEach(setInitialCard);
  });

  const ioCards = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const wrap = entry.target;
        wrap.classList.add("is-active");

        const icon = wrap.querySelector(".card__icon");
        const title = wrap.querySelector(".card__title");
        const items = Array.from(wrap.querySelectorAll(".card__list li"));

        if (icon) cleanupCard(icon);
        if (title) cleanupCard(title);
        items.forEach(cleanupCard);

        ioCards.unobserve(wrap);
      });
    },
    { threshold: 0.01 }
  );

  cards.forEach((wrap) => ioCards.observe(wrap));
});
