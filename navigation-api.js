document.addEventListener("keydown", (e) => {
  if (e.target.matches("input, textarea") || e.target.isContentEditable) return;
  const link = document.querySelector(
    `a[aria-keyshortcuts~="${CSS.escape(e.key)}"]`,
  );
  if (link) {
    e.preventDefault();
    link.click(); // This will trigger onnavigate
  }
});

navigation.onnavigate = (e) => {
  let link = e.sourceElement;
  const type = e.sourceElement?.dataset.transitionType;

  let { transitionType, transitionAxis } = link.dataset;
  let transitionDirection =
    link.dataset.reverse != null ? "reverse" : "forward";

  if (transitionType) {
    navigation.updateCurrentEntry({
      state: { transitionType, transitionAxis, transitionDirection },
    });
  }
};

window.addEventListener("pageswap", (e) => {
  if (!e.viewTransition) return;
  const state = navigation.currentEntry.getState();
  if (state?.transitionType) {
    e.viewTransition.types.add(state.transitionType);
    e.viewTransition.types.add(state.transitionAxis);
    e.viewTransition.types.add(state.transitionDirection);
  }
});

window.addEventListener("pagereveal", (e) => {
  if (!e.viewTransition) return;
  const state = navigation.activation.from?.getState();
  if (state?.transitionType) {
    e.viewTransition.types.add(state.transitionType);
    e.viewTransition.types.add(state.transitionAxis);
    e.viewTransition.types.add(state.transitionDirection);
  }
});
