const shareButton = document.querySelector(".share__button");
const imgIcon = shareButton.querySelector(".icon");
const shareButtonActive = document.querySelector(".share__button--active");

shareButton.addEventListener("click", () => {
  if (window.innerWidth < 768) {
    shareButtonActive.classList.toggle("active");
  }
});

shareButton.addEventListener("click", () => {
  if (window.innerWidth >= 768) {
    shareButtonActive.classList.toggle("active");

    if (shareButtonActive.classList.contains("active")) {
      shareButton.style.background = "hsl(214, 17%, 51%)";
      imgIcon.src = "./images/icon-share-white.svg";
    } else {
      shareButton.style.background = ""; // Reset to default
      imgIcon.src = "./images/icon-share.svg";
    }
  }
});
