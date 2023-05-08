// function animateCigarette() {
//   const cigarette = document.querySelector(".cigarette");
//   const windowHeight = window.innerHeight;
//   const offset = windowHeight / 2;
//   const startY = offset - cigarette.offsetHeight / 2;
//   const endY = document.body.offsetHeight - windowHeight - offset;

//   if (window.pageYOffset >= startY && window.pageYOffset <= endY) {
//     const progress = (window.pageYOffset - startY) / (endY - startY);
//     const size = 100 - progress * 70;
//     cigarette.style.width = `${size}%`;
//   }
// }
// export default animateCigarette;
