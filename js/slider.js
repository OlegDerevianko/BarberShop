document.addEventListener('DOMContentLoaded', function() {
    // Проверяем ширину экрана
    if (window.innerWidth <= 768) {
        console.log('Слайдер отключен на мобильных устройствах');
        return; // Выходим из функции, слайдер не работает
    }
    
    const track = document.querySelector('.slider__track');
    const slides = document.querySelectorAll('.slider__slide');
    const prevBtn = document.querySelector('.button-prev');
    const nextBtn = document.querySelector('.button-next');
    const paginationDots = document.querySelectorAll('.pagination__dot');
    
    // Проверяем, есть ли все элементы на странице
    if (!track || !slides.length || !prevBtn || !nextBtn || !paginationDots.length) {
        console.log('Slider elements not found');
        return;
    }
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Функция обновления слайдера
    function updateSlider(index) {
        // Зацикливание
        if (index < 0) {
            currentIndex = slideCount - 1;
        } else if (index >= slideCount) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        // Двигаем трек
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Обновляем пагинацию
        paginationDots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('pagination__dot--active');
            } else {
                dot.classList.remove('pagination__dot--active');
            }
        });
    }
    
    // Кнопки вперед/назад
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateSlider(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateSlider(currentIndex + 1);
    });
    
    // Пагинация
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            updateSlider(index);
        });
    });
    
    // Инициализация первого слайда
    updateSlider(0);
    
    // Опционально: свайп для мобильных
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
            // Свайп влево - следующий слайд
            updateSlider(currentIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Свайп вправо - предыдущий слайд
            updateSlider(currentIndex - 1);
        }
    }
});