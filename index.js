document.addEventListener("keydown", (e) => {
  // 1. Safety check: Don't hijack keys if the user is typing
  const isTyping =
    e.target.tagName === "INPUT" ||
    e.target.tagName === "TEXTAREA" ||
    e.target.isContentEditable;

  if (isTyping) return;

  // 2. Search for the key within the space-separated list
  // [aria-keyshortcuts~="ArrowRight"] matches "ArrowRight" or "n ArrowRight"
  const link = document.querySelector(
    `a[aria-keyshortcuts~="${CSS.escape(e.key)}"]`,
  );

  if (link) {
    e.preventDefault();
    link.click();
  }
});

/* Set View Transition Type from the transtionType data of the link  */
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-transition-type]");
  if (link) {
    let { transitionType, transitionAxis } = link.dataset;
    let reverse = link.dataset.reverse != null ? "reverse" : "forward";

    console.log(transitionType, transitionAxis, reverse);
    localStorage.setItem("transitionType", transitionType);
    localStorage.setItem("transitionAxis", transitionAxis);
    localStorage.setItem("transitionDirection", reverse);
  }
});

window.addEventListener("pageswap", (e) => {
  if (!e.viewTransition) return;
  const transitionType = localStorage.getItem("transitionType");
  const transitionAxis = localStorage.getItem("transitionAxis");
  const transitionDirection = localStorage.getItem("transitionDirection");

  if (transitionType) {
    e.viewTransition.types.add("page-transition");
    e.viewTransition.types.add(transitionAxis);
    e.viewTransition.types.add(transitionDirection);
  }
});

window.addEventListener("pagereveal", (e) => {
  if (!e.viewTransition) return;
  const transitionType = localStorage.getItem("transitionType");
  const transitionAxis = localStorage.getItem("transitionAxis");
  const transitionDirection = localStorage.getItem("transitionDirection");

  console.log(transitionType, transitionAxis, transitionDirection);
  if (transitionType) {
    e.viewTransition.types.add("page-transition");
    e.viewTransition.types.add(transitionType);
    e.viewTransition.types.add(transitionAxis);
    e.viewTransition.types.add(transitionDirection);
    console.log(e.viewTransition.types);
    localStorage.removeItem("transitionType");
    localStorage.removeItem("transitionAxis");
    localStorage.removeItem("transitionDirection");
  }
});
