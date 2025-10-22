        // Variables globales para lightbox
let currentIndex = 0;
const images = [
    "assets/img/flyer1.jpg",
    "assets/img/flyer2.jpg",
    "assets/img/flyer3.jpg",
    "assets/img/admisiones.jpg"
    // Agregar más imágenes aquí según sea necesario
];

// Funciones de lightbox
function openLightbox(index) {
    currentIndex = index;
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = images[currentIndex];
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeSlide(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    document.getElementById("lightbox-img").src = images[currentIndex];
}

// Navegación con teclado (← → Esc)
document.addEventListener("keydown", function(e) {
    if (document.getElementById("lightbox").style.display === "flex") {
        if (e.key === "ArrowLeft") changeSlide(-1);
        if (e.key === "ArrowRight") changeSlide(1);
        if (e.key === "Escape") closeLightbox();
    }
});
        // WhatsApp contact options functionality
        const whatsappButton = document.getElementById('whatsappButton');
        const heroWhatsappButton = document.getElementById('heroWhatsappButton');
        const whatsappOptions = document.querySelector('.whatsapp-options');
        const whatsappClose = document.querySelector('.whatsapp-close');

        function toggleWhatsappOptions() {
            whatsappOptions.classList.toggle('active');
        }

        function closeWhatsappOptions() {
            whatsappOptions.classList.remove('active');
        }

        whatsappButton.addEventListener('click', toggleWhatsappOptions);
        heroWhatsappButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleWhatsappOptions();
        });
        whatsappClose.addEventListener('click', closeWhatsappOptions);

        // Close options when clicking outside
        document.addEventListener('click', function(e) {
            if (!whatsappButton.contains(e.target) && 
                !whatsappOptions.contains(e.target) && 
                !heroWhatsappButton.contains(e.target)) {
                closeWhatsappOptions();
            }
        });

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const navMenu = document.getElementById('navMenu');

        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Cambiar ícono entre hamburguesa y X
            const icon = mobileMenuButton.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const topBorderHeight = 8;
                const targetPosition = targetSection.offsetTop - headerHeight - topBorderHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.backgroundColor = '#F5F5DC';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = '#F5F5DC';
                header.style.boxShadow = 'var(--shadow)';
            }
        });

        // Toggle WhatsApp menu for admissions
        function toggleWhatsappMenu() {
            const menu = document.getElementById("whatsapp-menu");
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        }

        // Toggle WhatsApp dropdown in footer
        function toggleWhatsappDropdown() {
            const dropdown = document.querySelector('.whatsapp-dropdown .dropdown-menu');
            dropdown.classList.toggle('show');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            const dropdown = document.querySelector('.whatsapp-dropdown .dropdown-menu');
            const trigger = document.querySelector('.whatsapp-dropdown .whatsapp-icon');
            
            if (!dropdown.contains(e.target) && !trigger.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        // Update copyright year
        document.getElementById("year").textContent = new Date().getFullYear();
// Funcionalidad para la sección unificada de especialidades y equipo
function initSpecialtiesTeam() {
    // Filtrado por categorías
    const navItems = document.querySelectorAll('.nav-item');
    const specialtyItems = document.querySelectorAll('.specialty-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Actualizar navegación activa
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar especialidades
            specialtyItems.forEach(specialty => {
                if (category === 'all' || specialty.getAttribute('data-category') === category) {
                    specialty.classList.remove('hidden');
                } else {
                    specialty.classList.add('hidden');
                }
            });
        });
    });
    
    // Cerrar todos los detalles al cambiar categoría
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            specialtyItems.forEach(specialty => {
                specialty.classList.remove('active');
            });
        });
    });
}

// Funcionalidad para mostrar/ocultar detalles de especialidad
function toggleSpecialtyDetails(element) {
    const specialtyItem = element.closest('.specialty-item');
    
    // Cerrar otros elementos abiertos
    document.querySelectorAll('.specialty-item.active').forEach(item => {
        if (item !== specialtyItem) {
            item.classList.remove('active');
        }
    });
    
    // Alternar el elemento actual
    specialtyItem.classList.toggle('active');
}

// Cerrar detalles al hacer clic fuera
document.addEventListener('click', function(e) {
    if (!e.target.closest('.specialty-header') && !e.target.closest('.specialty-details')) {
        document.querySelectorAll('.specialty-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initSpecialtiesTeam();
});