# Demo Slide Deck

```css
@view-transition {
	navigation: auto;
}

::view-transition-group(root) {
	animation-duration: 0.4s;
}

/*use ::view-transition-old and ::view-transition-new 
to animate the snapshots individually */

::view-transition-old(root) {
	animation-name: wipe-left-out;
}

::view-transition-new(root) {
	animation-name: wipe-left-in;
}

h1 {
	view-transition-name: headline;
}
```