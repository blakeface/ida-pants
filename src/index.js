document.addEventListener("DOMContentLoaded", () => init(true));
window.addEventListener("resize", () => init(false));

function init(shouldUnregister) {
  magic();
  if (shouldUnregister) {
    stopListening();
  }
}

function stopListening() {
  document.removeEventListener("DOMContentLoaded", init);
}

// js for magic section
function magic() {
  // i hate this but have to wait till style is applied
  const $magicEl = document.querySelector(".magic .quote");
  $magicEl.parentNode.style.height = $magicEl.offsetHeight + "px";
}
