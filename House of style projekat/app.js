const initSlider = () =>{

    const imageList= document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

               //  Handle scrollbar thumb drag //
        scrollbarThumb.addEventListener("mousedown",(e) =>{
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

                // Update thumb position on mouse move //

        const handleMouseMove = (e) => {
            const deltaX= e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition =  sliderScrollbar.getBoundingClientRect().width- scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition)) ;
            const scrollPosition = (boundedPosition/maxThumbPosition)* maxScrollLeft;
            scrollbarThumb.style.left = `${newThumbPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

                // Remove event listeners on mouse up //
        const handleMouseUp= () =>{
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

                // Event listeners for drag interaction //
        
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    })

                    // Slide images according to the slide button clicks //
    slideButtons.forEach(button => {
        button.addEventListener("click", () =>{
            const direction = button.id === "prev-slide" ? -.5 : .5;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior:"smooth" });
        });
    });

    const handleSlideButtons = () =>{
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >=maxScrollLeft ? "none" : "block";
    }

    const updateScrollThumbPosition = () =>{
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left= `${thumbPosition}px`;
    }


    imageList.addEventListener("scroll",() =>{
        handleSlideButtons();
        updateScrollThumbPosition();
    })
}

window.addEventListener("load", initSlider);


document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navbar = document.querySelector('.navbar ul');

  // Toggle navigation on hamburger menu click
  hamburgerMenu.addEventListener('click', function () {
    hamburgerMenu.classList.toggle('active');
    navbar.classList.toggle('show');
  });

  // Close navigation on outside click
  document.addEventListener('click', function (event) {
    if (!navbar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
      closeMenu();
    }
  });

  // Close navigation on escape key press
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  // Close menu when a menu item is clicked
  navbar.addEventListener('click', function () {
    closeMenu();
  });

  function closeMenu() {
    hamburgerMenu.classList.remove('active');
    navbar.classList.remove('show');
  }
});

// Toggle navigation on hamburger menu click
hamburgerMenu.addEventListener('click', function () {
  hamburgerMenu.classList.toggle('active');
  navbar.classList.toggle('show');
});

// Close navigation on hamburger icon click
hamburgerMenu.addEventListener('click', function (event) {
  if (event.target === hamburgerMenu) {
    closeMenu();
  }
});

  
  