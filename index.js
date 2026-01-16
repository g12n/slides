document.addEventListener("keydown", (e) => {
  const link = document.querySelector(
    `a[aria-keyshortcuts="${e.key}"]`
  );
  if (link) {
    e.preventDefault();
    link.click();
  }
});