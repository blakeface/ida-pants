window.onload = function() {
	// for Magic heading
	const $magicEl = document.querySelector(".magic .quote");
	const $magicAuthor = document.querySelector(".magic .author");
	$magicEl.parentNode.style.height = $magicEl.offsetHeight + "px";
	$magicAuthor.classList.remove("hidden");
};
