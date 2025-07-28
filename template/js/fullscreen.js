document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("play-button");
  const iframe = document.getElementById("iframehtml5");
  const container = document.getElementById("game-container");
  const overlay = document.getElementById("play-overlay");
  const fullscreenToggle = document.getElementById("fullscreen-toggle");
  const fullscreenControls = document.getElementById("fullscreen-controls");
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  const mobileExitBtn = document.createElement("button");
  mobileExitBtn.id = "mobile-exit-btn";
  mobileExitBtn.innerHTML = "↩ BlockBlast.dev";
  document.body.appendChild(mobileExitBtn);
  fullscreenControls.style.display = "none";
  
  const originalContainerStyles = {
    width: container.style.width,
    height: container.style.height,
    position: container.style.position,
    top: container.style.top,
    left: container.style.left,
    zIndex: container.style.zIndex,
    backgroundColor: container.style.backgroundColor
  };
  
  const originalIframeStyles = {
    width: iframe.style.width,
    height: iframe.style.height,
    border: iframe.style.border
  };
  
  window.addEventListener('resize', updateContainerHeight);

  playButton.addEventListener("click", function () {
    iframe.src = "/play.html";
    iframe.style.display = "block";
    overlay.style.display = "none";
    fullscreenControls.style.display = "block";
    if (isMobile) {
      enterMobileFullscreen();
    } else {
      requestFullscreen(container);
      fullscreenControls.style.display = "block";
    }
  });

  function enterMobileFullscreen() {
    document.body.classList.add("mobile-fullscreen");
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.zIndex = "9999";
    container.style.backgroundColor = "#000";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    mobileExitBtn.style.display = "block";
    fullscreenControls.style.display = "none";
    document.body.style.overflow = "hidden";
  }

  function exitMobileFullscreen() {
    document.body.classList.remove("mobile-fullscreen");
    resetContainerStyles();
    mobileExitBtn.style.display = "none";
    fullscreenControls.style.display = "block";
    document.body.style.overflow = "";
    
    updateContainerHeight();
  }
  
  function resetContainerStyles() {
    for (const [property, value] of Object.entries(originalContainerStyles)) {
      container.style[property] = value;
    }
    for (const [property, value] of Object.entries(originalIframeStyles)) {
      iframe.style[property] = value;
    }
  }

  mobileExitBtn.addEventListener("click", exitMobileFullscreen);

  fullscreenToggle.addEventListener("click", function () {
    if (isMobile) {
      enterMobileFullscreen();
    } else {
      if (isFullscreen()) {
        exitFullscreen();
      } else {
        requestFullscreen(container);
      }
    }
  });

  function isFullscreen() {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    );
  }

  function requestFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen().catch((err) => {
        console.error("Fullscreen error:", err);
      });
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  document.addEventListener("fullscreenchange", handleFullscreenChange);
  document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
  document.addEventListener("msfullscreenchange", handleFullscreenChange);

  function handleFullscreenChange() {
    if (isFullscreen()) {
      container.classList.add("fullscreen-mode");
      fullscreenToggle.textContent = "↩ BlockBlast.dev";
    } else {
      container.classList.remove("fullscreen-mode");
      fullscreenToggle.textContent = "BlockBlast.dev ⤢";
      
      resetContainerStyles();
      
      updateContainerHeight();
      
      setTimeout(() => {
        updateContainerHeight();
      }, 100);
    }
	}
function updateContainerHeight() {
    container.style.margin = '0';
    container.style.padding = '0';
    container.style.border = '0';
    iframe.style.margin = '0';
    iframe.style.padding = '0';
    iframe.style.border = '0';
    
    const headerHeight = getHeaderHeight();
    
    if (!isFullscreen() && !document.body.classList.contains('mobile-fullscreen')) {
        const controlHeight = fullscreenControls.offsetHeight || 50;
        
        const containerHeight = `calc(100vh - ${headerHeight + controlHeight}px)`;
        
        container.style.height = containerHeight;
        container.style.position = 'relative';
        container.style.top = '0';
        container.style.left = '0';
        
        iframe.style.height = '100%';
        iframe.style.width = '100%';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        
        container.style.transition = 'height 0.2s ease';
    } else {
        container.style.height = '100%';
        container.style.width = '100%';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.zIndex = '9999';
        
        iframe.style.height = '100%';
        iframe.style.width = '100%';
    }
    
    void container.offsetWidth;
}

function getHeaderHeight() {
    const header = document.querySelector('.page-header');
    return header ? header.offsetHeight : 0;
}

function setupFullscreenListener() {
    document.addEventListener('fullscreenchange', updateContainerHeight);
    document.addEventListener('webkitfullscreenchange', updateContainerHeight);
    document.addEventListener('mozfullscreenchange', updateContainerHeight);
    document.addEventListener('MSFullscreenChange', updateContainerHeight);
}

function setupResizeListener() {
    window.addEventListener('resize', updateContainerHeight);
}

setupFullscreenListener();
setupResizeListener();

window.addEventListener('load', updateContainerHeight);
});