
document.getElementById("year").textContent=new Date().getFullYear();
const grid = document.querySelector('.site-footer-marquee__grid');
if (grid) {
    const clone = grid.cloneNode(true);
    document.querySelector('.site-footer-marquee__track').appendChild(clone);
}


const wrapper = document.querySelector(".wrapper"), 
  carousel = document.querySelector(".carousel"),
  images = document.querySelectorAll(".news-articles"), 
  buttons = document.querySelectorAll(".button");

let imageIndex = 0; 
let intervalId;


const autoSlide = () => {
  
  intervalId = setInterval(() => {
    imageIndex++;
    slideImage();
  }, 3000);
};


const slideImage = () => {
  
  imageIndex = imageIndex >= images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;

  
  carousel.style.transform = `translateX(-${imageIndex * 100}%)`; 
};


const updateClick = (e) => {
  
  clearInterval(intervalId);

 
  imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage();

  
  autoSlide();
};


autoSlide();


buttons.forEach((button) => button.addEventListener("click", updateClick));


wrapper.addEventListener("mouseover", () => clearInterval(intervalId));


wrapper.addEventListener("mouseleave", autoSlide);

///////////////////////////////////////////////////////////////////////////////////////////////

let nextDom = document.getElementById('arrow-next');
let prevDom = document.getElementById('arrow-prev');
let carouselDom = document.querySelector('.carousel-a');
let SliderDom = carouselDom.querySelector('.carousel-list');
let thumbnailBorderDom = document.querySelector('.carousel-a .thumbnail');
let timeDom = document.querySelector('.carousel-a .time');

let currentIndex = 0;
let isTransitioning = false;
let autoSlideTimer;

// Initialize carousel
function initCarousel() {
    const slides = SliderDom.querySelectorAll('.carousal-list-item');
    const thumbnails = thumbnailBorderDom.querySelectorAll('.carousal-list-item');
    
    // Set initial active states
    slides[currentIndex].classList.add('active');
    thumbnails[currentIndex].classList.add('active');
    
    // Start auto-slide
    startAutoSlide();
}

// Event listeners
nextDom.onclick = function() {
    if (!isTransitioning) {
        showSlider('next');
    }
}

prevDom.onclick = function() {
    if (!isTransitioning) {
        showSlider('prev');
    }
}

function showSlider(direction) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    const slides = SliderDom.querySelectorAll('.carousal-list-item');
    const thumbnails = thumbnailBorderDom.querySelectorAll('.carousal-list-item');
    const totalSlides = slides.length;
    
    // Remove active classes
    slides[currentIndex].classList.remove('active');
    thumbnails[currentIndex].classList.remove('active');
    
    // Update index
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % totalSlides;
    } else {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    }
    
    // Add active classes
    slides[currentIndex].classList.add('active');
    thumbnails[currentIndex].classList.add('active');
    
    // Reset progress bar
    timeDom.classList.remove('running');
    timeDom.classList.add('reset');
    
    setTimeout(() => {
        timeDom.classList.remove('reset');
        timeDom.classList.add('running');
        isTransitioning = false;
    }, 100);
    
    // Restart auto-slide
    clearTimeout(autoSlideTimer);
    startAutoSlide();
}

function startAutoSlide() {
    // Reset progress bar
    timeDom.classList.remove('running', 'reset');
    setTimeout(() => {
        timeDom.classList.add('running');
    }, 100);
    
    autoSlideTimer = setTimeout(() => {
        if (!isTransitioning) {
            showSlider('next');
        }
    }, 7000);
}

// Thumbnail click navigation
function setupThumbnailNavigation() {
    const thumbnails = thumbnailBorderDom.querySelectorAll('.carousal-list-item');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            if (index !== currentIndex && !isTransitioning) {
                const slides = SliderDom.querySelectorAll('.carousal-list-item');
                
                // Remove active classes
                slides[currentIndex].classList.remove('active');
                thumbnails[currentIndex].classList.remove('active');
                
                // Update index
                currentIndex = index;
                
                // Add active classes
                slides[currentIndex].classList.add('active');
                thumbnails[currentIndex].classList.add('active');
                
                // Restart auto-slide
                clearTimeout(autoSlideTimer);
                startAutoSlide();
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    setupThumbnailNavigation();
});

// Pause auto-slide when user hovers over carousel
carouselDom.addEventListener('mouseenter', function() {
    clearTimeout(autoSlideTimer);
    timeDom.classList.remove('running');
});

carouselDom.addEventListener('mouseleave', function() {
    startAutoSlide();
});
