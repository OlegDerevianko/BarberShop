
document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!burgerBtn || !closeMenuBtn || !mobileNav) {
        console.log('Burger elements not found');
        return;
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    document.body.appendChild(overlay);
    
    function openMenu() {
        mobileNav.classList.add('active');
        burgerBtn.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        mobileNav.classList.remove('active');
        burgerBtn.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; 
    }
    
    burgerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openMenu();
    });
    
    closeMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
    });
    
    overlay.addEventListener('click', function() {
        closeMenu();
    });
    
    const menuLinks = mobileNav.querySelectorAll('.mobile-nav__link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
});