document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.BlockJam_logobg');
    elements.forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = words.join('-');
    });
});
document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".video");
  const playButton = document.querySelector(".play-button");
  const videoContainer = document.querySelector(".video-container");
  playButton.addEventListener("click", function () {
    if (video.paused) {
      video.play();
      playButton.style.display = "none";
    } else {
      video.pause();
      playButton.style.display = "flex";
    }
  });
  video.addEventListener("ended", function () {
    playButton.style.display = "flex";
  });
  videoContainer.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });
  video.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
      return false;
    },
    false,
  );
});
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentNode;
    const isActive = item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach((otherItem) => {
      otherItem.classList.remove("active");
    });
    if (!isActive) {
      item.classList.add("active");
      setTimeout(() => {
        item.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  });
});
document.querySelector(".faq-item").classList.add("active");
document.addEventListener("DOMContentLoaded", function () {
  var e = document.querySelector(".BlockJam_back-to-top");
  window.addEventListener("scroll", function () {
    window.pageYOffset > 300
      ? e.classList.add("visible")
      : e.classList.remove("visible");
  }),
    e.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
}),
  (document.onkeydown = function (e) {
    32 == (e = e || window.event).keyCode &&
      (document.getElementById("messageBox").style.visibility = "hidden");
  });
document
  .querySelector(".BlockJam_hamburger")
  .addEventListener("click", function (e) {
    e.stopPropagation();
    const isActive = this.classList.toggle("BlockJam_active");
    const mobileMenu = document.querySelector(".BlockJam_mobile-menu");
    if (isActive) {
      mobileMenu.classList.add("BlockJam_active");
      document.body.style.overflow = "hidden";
    } else {
      mobileMenu.classList.remove("BlockJam_active");
      document.body.style.overflow = "";
    }
    const lines = this.querySelectorAll(".BlockJam_hamburger-line");
    if (isActive) {
      lines[0].style.transform = "translateY(8px) rotate(45deg)";
      lines[1].style.opacity = "0";
      lines[2].style.transform = "translateY(-8px) rotate(-45deg)";
    } else {
      lines.forEach((line) => {
        line.style.transform = "";
        line.style.opacity = "";
      });
    }
  });
document.addEventListener("click", function (e) {
  if (
    !e.target.closest(".BlockJam_hamburger") &&
    !e.target.closest(".BlockJam_mobile-menu")
  ) {
    const hamburger = document.querySelector(".BlockJam_hamburger");
    if (hamburger.classList.contains("BlockJam_active")) {
      hamburger.classList.remove("BlockJam_active");
      document
        .querySelector(".BlockJam_mobile-menu")
        .class.remove("BlockJam_active");
      document.body.style.overflow = "";
      const lines = hamburger.querySelectorAll(".BlockJam_hamburger-line");
      lines.forEach((line) => {
        line.style.transform = "";
        line.style.opacity = "";
      });
    }
  }
});
