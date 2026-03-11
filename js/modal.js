// Ждем, когда весь HTML загрузится
document.addEventListener('DOMContentLoaded', function() {

    // ========== НАХОДИМ ВСЕ НУЖНЫЕ ЭЛЕМЕНТЫ НА СТРАНИЦЕ ==========
    
    // 1. Находим само модальное окно (серый фон)
    const modalOverlay = document.getElementById('bookingModal');
    
    // 2. Находим все кнопки, которые открывают модалку
    // querySelectorAll находит все кнопки с такими классами
    const openButtons = document.querySelectorAll('.mobile-btn, .about-btn, .nav-btn, .service-btn');
    
    // 3. Находим кнопку закрытия (крестик)
    const closeButton = document.getElementById('closeModal');
    
    // 4. Находим форму внутри модалки
    const modalForm = document.getElementById('bookingForm');


    // ========== ФУНКЦИИ ДЛЯ РАБОТЫ С МОДАЛКОЙ ==========
    
    // Функция для ОТКРЫТИЯ модального окна
    function openModal() {
        // Добавляем класс active - он делает модалку видимой
        modalOverlay.classList.add('active');
        
        // Запрещаем прокрутку страницы за модалкой
        document.body.style.overflow = 'hidden';
    }
    
    // Функция для ЗАКРЫТИЯ модального окна
    function closeModal() {
        // Убираем класс active - модалка исчезает
        modalOverlay.classList.remove('active');
        
        // Возвращаем прокрутку страницы
        document.body.style.overflow = '';
        
        // ОЧИЩАЕМ ФОРМУ при закрытии
        if (modalForm) {
            modalForm.reset(); // Очищаем все поля
        }
    }


    // ========== ОБРАБОТЧИКИ СОБЫТИЙ (ЧТО ПО ЧЕМУ КЛИКАЕТ) ==========
    
    // Открытие модалки по клику на любую кнопку
    openButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем стандартное поведение кнопки
            openModal(); // Вызываем функцию открытия
        });
    });
    
    // Закрытие по клику на крестик
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Закрытие по клику на серый фон (вне белого окна)
    modalOverlay.addEventListener('click', function(e) {
        // Если кликнули именно на серый фон (а не на белое окно)
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        // Если нажали ESC и модалка открыта
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Отправка формы - просто показываем данные в консоли
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Отменяем отправку на сервер
            
            // Собираем данные из формы
            const formData = new FormData(modalForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
            
            // Показываем данные в консоли (F12 чтобы увидеть)
            console.log('Отправка формы:', data);
            
            // Показываем простое сообщение
            alert('Спасибо! Форма отправлена. Данные в консоли (F12)');
            
            // Закрываем модалку
            closeModal();
        });
    }
 // ========== ФОРМА В ФУТЕРЕ ==========
    
    // Находим форму в футере
    const footerForm = document.getElementById('footerBookingForm');
    
    // Если форма в футере существует
    if (footerForm) {
        
        // Отправка формы в футере
        footerForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Отменяем стандартную отправку
            
            // Собираем данные из формы
            const formData = new FormData(footerForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
            
            // Показываем данные в консоли
            console.log('Форма в футере отправлена:', data);
            
            // Показываем сообщение пользователю
            alert('Спасибо! Ваша заявка отправлена');
            
            // Очищаем форму
            footerForm.reset();
        });
        
        
    }

});