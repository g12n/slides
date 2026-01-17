# Slide Deck with Cross Document view transitions

This is an demonstration of [Cross-document view transitions][1] in the context of an Slide Deck.

## Basic Setup

Each slide of the slide deck is a simple html document. They share a common basic styling in `slide-layout.css` file.

```html
<a href="slide-03.html">prev</a> <a href="slide-02.html">next</a>
```

# Enable cross document view transitions

To Enable Cross Document View Transitions add these lines to your CSS code:

```css
@view-transition {
	navigation: auto;
}
```

The [CSSViewTransitionRule] [navigation property] `auto` causes the browser to apply a quick smooth transition to the navigation between pages.

# Control the speed of the transition

To help you with observing the behavior you can select the [::view-transition-group()] `root` to slow it down by applying a longer [animation-duration].

```css
::view-transition-group(root) {
	animation-duration: 3s;
}
```

You can experiment with different [css animation attributes]. For detailed observations use the [animations inspector] in chrome dev tools.

## Modify the transition animation

In the tools you will see the view transition group `root` covering the contents of your new page. It contains an image pair with two snapshots of your page. One of the old page and one of the new. d

![inspector-screenshot]

you can select these snap shots with `::view-transition-old(root)` and `::view-transition-new(root)` and apply individual animations to each of them.

```css
::view-transition-old(root) {
	animation-name: wipe-left-out;
}

::view-transition-new(root) {
	animation-name: wipe-left-in;
}
```

## Add more view transition groups

You can control the transition of more elements than just the root. To do so you create new transition groups by applying the [view-transition-name] property to the elements you want to animate.

```css
h1 {
	view-transition-name: headline;
}
```

Be aware that the selector must result in a single element because each view transition name must map to exactly one element per document.

Experiment with adding multiple transition groups and animating them individually.

## Accessibility: reduced motion

Before publishing our slide deck we wrap the code for big animations into a [prefers-reduced-motion] media query.

```css
@media (prefers-reduced-motion: no-preference) {
    /* animation code */
}
```

This way users can opt out of non essential animations. This is especially helpful to users with [vestibular disorders].


## Bonus: Implementing keyboard animation

For a more slide deck like behavior we add the [aria-keyshortcuts-Attribute] to the links in our slides. This way we can control which keys we want to use to switch forward and backward in our presentation. 

```html
<a aria-keyshortcuts="ArrowLeft p" href="slide-03.html">prev</a>
<a aria-keyshortcuts="ArrowRight n" href="slide-02.html">next</a>
```

Like all ARIA attributes, this does not add default browser behavior on its own. We have to use Javascript, to actually make they keyboard shortcuts work. 

```js
document.addEventListener("keydown", (e) => {
	// 1. Safety check: Don't hijack keys if the user is typing
	const isTyping =
		e.target.tagName === "INPUT" ||
		e.target.tagName === "TEXTAREA" ||
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
```

# Conclusion: 

You can now create any presentation you like in HTML and CSS without the use of any other software than an text editor and your browser. Explore the view transitions API for more possibilities for ways to improve your slide deck.

Try: 

- adding more elements like pictures and lists
- create different slide layouts 
- make the style your own by choosing different fonts
- experiment with different animations
- explore how to add different animations to different slides
- explore how to add different [view transition types] when navigating forward and backwards in your deck



Later you can use tools like the static site generator [eleventy] for a more comfortable workflow. 

[1]: https://developer.chrome.com/docs/web-platform/view-transitions/cross-document "Cross-document view transitions for multi-page applications by Bramus"
[CSSViewTransitionRule]: https://developer.mozilla.org/en-US/docs/Web/API/CSSViewTransitionRule
[navigation property]: https://developer.mozilla.org/en-US/docs/Web/API/CSSViewTransitionRule/navigation
[::view-transition-group()]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::view-transition-group
[animation-duration]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-duration
[css animation attributes]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation
[animations inspector]: https://developer.chrome.com/docs/devtools/css/animations
[view-transition-name]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-transition-name
[inspector-screenshot]: inpector-view-transition-group.jpeg
[view transition types]: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using_types

[prefers-reduced-motion]:https://developer.mozilla.org/de/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion

[vestibular disorders]: https://www.a11yproject.com/posts/understanding-vestibular-disorders/ "A primer to vestibular disorders"

[aria-keyshortcuts-Attribute]: https://developer.mozilla.org/de/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-keyshortcuts
[aria-keyshortcuts]: https://www.digitala11y.com/aria-properties/

[eleventy]: https://www.11ty.dev/
