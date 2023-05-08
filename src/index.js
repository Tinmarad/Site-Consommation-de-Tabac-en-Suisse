// "use strict";
var clopeHaut = document.querySelector(".clope_haut");
var cendre = document.querySelector(".clope_cendre");
var clopebas = document.querySelector(".clope_bas");
var pageHeight = document.body.scrollHeight - window.innerHeight;

var isScrolling = false;

function fadeIn(el) {
  el.style.opacity = 1;
}
function fadeOut(el) {
  el.style.opacity = 0;
}

window.addEventListener("scroll", function () {
  var scrollPosition = window.pageYOffset;
  var parallaxValueHaut = (scrollPosition / pageHeight) * +110.5;
  var parallaxValueCendre = (scrollPosition / pageHeight) * +110.5;

  clopeHaut.style.backgroundPosition = "center " + parallaxValueHaut + "px";
  cendre.style.backgroundPosition = "center " + parallaxValueCendre + "px";
  fadeIn(cendre);

  if (parallaxValueHaut <= 180) {
    clopeHaut.classList.remove("rotate-90");
    clopebas.classList.remove("rotate-90");
    cendre.classList.remove("rotate-90");
    clopeHaut.classList.add("rotate-90-reverse");
    clopebas.classList.add("rotate-90-reverse");
    cendre.classList.add("rotate-90-reverse");
  }
  if (parallaxValueHaut >= 180 && parallaxValueHaut <= 290) {
    clopeHaut.classList.add("rotate-90");
    clopebas.classList.add("rotate-90");
    cendre.classList.add("rotate-90");
    clopeHaut.classList.remove("rotate-90-reverse");
    clopebas.classList.remove("rotate-90-reverse");
    cendre.classList.remove("rotate-90-reverse");
  }
  if (parallaxValueHaut >= 290) {
    clopeHaut.classList.remove("rotate-90");
    clopebas.classList.remove("rotate-90");
    cendre.classList.remove("rotate-90");
    clopeHaut.classList.add("rotate-90-reverse");
    clopebas.classList.add("rotate-90-reverse");
    cendre.classList.add("rotate-90-reverse");
  }
});

const onScrollStop = (callback) => {
  let isScrolling;
  window.addEventListener(
    "scroll",
    (e) => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        callback();
      }, 150);
    },
    false
  );
};

onScrollStop(() => {
  fadeOut(cendre);
});
