window.onload = function() {
  initMagicSection()
};

window.addEventListener('resize', () => initMagicSection());


function initMagicSection() {
  const $magicEl = document.querySelector(".magic .quote");
  const $magicAuthor = document.querySelector(".magic .author");
  
  console.log($magicEl.offsetHeight, $magicEl.parentNode)
  $magicEl.parentNode.style.height = $magicEl.offsetHeight + "px";
	$magicAuthor.classList.remove("hidden");
}
