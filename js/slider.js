document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        console.log('Слайдер отключен на мобильных устройствах');
        return; 
    }
    
    const track = document.querySelector('.slider__track');
    const slides = document.querySelectorAll('.slider__slide');
    const prevBtn = document.querySelector('.button-prev');
    const nextBtn = document.querySelector('.button-next');
    const paginationDots = document.querySelectorAll('.pagination__dot');
    
    if (!track || !slides.length || !prevBtn || !nextBtn || !paginationDots.length) {
        console.log('Slider elements not found');
        return;
    }
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    function updateSlider(index) {
        if (index < 0) {
            currentIndex = slideCount - 1;
        } else if (index >= slideCount) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        paginationDots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('pagination__dot--active');
            } else {
                dot.classList.remove('pagination__dot--active');
            }
        });
    }
    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateSlider(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateSlider(currentIndex + 1);
    });
    
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            updateSlider(index);
        });
    });
    
    updateSlider(0);
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            updateSlider(currentIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            updateSlider(currentIndex - 1);
        }
    }
});