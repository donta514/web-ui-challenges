const shareButton = document.querySelector(".share__button");

const shareButtonActive = document.querySelector(".share__button--active");

shareButton.addEventListener("click", () => {
  if (window.innerWidth < 768) {
    shareButtonActive.classList.toggle("active");
  }
});

shareButton.addEventListener("click", () => {
  if (window.innerWidth >= 768) {
    shareButtonActive.classList.toggle("active");
  }
});
