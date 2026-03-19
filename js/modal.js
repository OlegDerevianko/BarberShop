document.addEventListener('DOMContentLoaded', function() {
    
    const modalOverlay = document.getElementById('bookingModal');    
    const openButtons = document.querySelectorAll('.mobile-btn, .about-btn, .nav-btn, .service-btn');    
    const closeButton = document.getElementById('closeModal');    
    const modalForm = document.getElementById('bookingForm');

    function openModal() {
        modalOverlay.classList.add('active');        
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modalOverlay.classList.remove('active');        
        document.body.style.overflow = '';
                
        if (modalForm) {
            modalForm.reset();
        }
    }

    openButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); 
            openModal(); 
        });
    });
    
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const formData = new FormData(modalForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
            
            console.log('Отправка формы:', data);
            
            alert('Спасибо! Форма отправлена. Данные в консоли (F12)');
            
            closeModal();
        });
    }
    
    const footerForm = document.getElementById('footerBookingForm');
    
    if (footerForm) {
        
        footerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(footerForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
            
            console.log('Форма в футере отправлена:', data);
            
            alert('Спасибо! Ваша заявка отправлена');
            
            footerForm.reset();
        });
        
        
    }

});