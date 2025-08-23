// Navegación suave para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function (evento) {
        evento.preventDefault();
        const objetivo = document.querySelector(this.getAttribute('href'));
        if (objetivo) {
            objetivo.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
