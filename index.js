document.addEventListener("keydown", (e) => {
  // 1. Safety check: Don't hijack keys if the user is typing
  const isTyping = e.target.tagName === 'INPUT' || 
                   e.target.tagName === 'TEXTAREA' || 
                   e.target.isContentEditable;
  
  if (isTyping) return;

  // 2. Search for the key within the space-separated list
  // [aria-keyshortcuts~="ArrowRight"] matches "ArrowRight" or "n ArrowRight"
  const link = document.querySelector(`a[aria-keyshortcuts~="${e.key}"]`);

  if (link) {
    e.preventDefault();
    link.click();
  }
});