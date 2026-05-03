document.addEventListener("keydown", (e) => {
	// 1. Safety check: Don't hijack keys if the user is typing
	const isTyping =
		e.target.tagName === "INPUT" ||
		e.target.tagName === "TEXTAREA" ||
		e.target.isContentEditable;

	if (isTyping) return;

	// 2. Search for the key within the space-separated list
	// [aria-keyshortcuts~="ArrowRight"] matches "ArrowRight" or "n ArrowRight"
	const link = document.querySelector(`a[aria-keyshortcuts~="${CSS.escape(e.key)}"]`);

	if (link) {
		e.preventDefault();
		link.click();
	}
});

/* Set View Transition Type from the transtionType data of the link  */
document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-transition-type]");
    if (link) {
        localStorage.setItem("transitionType", link.dataset.transitionType);
    }
});

window.addEventListener("pageswap",  (e) => {
	if (!e.viewTransition) return;
	const transitionType = localStorage.getItem("transitionType");
	if (transitionType) {
		e.viewTransition.types.add(transitionType);
	}
});

window.addEventListener("pagereveal",  (e) => {
	if (!e.viewTransition) return;
	const transitionType = localStorage.getItem("transitionType");
	if (transitionType) {
		e.viewTransition.types.add(transitionType);
    localStorage.removeItem("transitionType")
	}
});
