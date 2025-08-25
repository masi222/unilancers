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

// Funcionalidad de calculadora
function calcularTarifa() {
    const horas = parseFloat(document.getElementById('horas').value);
    const categoria = parseFloat(document.getElementById('categoria').value);
    const complejidad = parseFloat(document.getElementById('complejidad').value);
    const resultado = document.getElementById('resultado');

    if (!horas || !categoria || !complejidad) {
        alert('Por favor, completa todos los campos');
        return;
    }

    if (horas <= 0) {
        alert('Las horas deben ser mayor a 0');
        return;
    }

    const precioBase = horas * categoria;
    const precioFinal = precioBase * complejidad;
    const descuento = horas > 40 ? 0.9 : 1; // 10% descuento para proyectos grandes
    const precioConDescuento = precioFinal * descuento;

    resultado.style.display = 'block';
    resultado.innerHTML = `
        <strong>Estimación del Proyecto:</strong><br>
        Horas: ${horas}h<br>
        Precio base: ${precioBase.toFixed(2)}<br>
        Con complejidad: ${precioFinal.toFixed(2)}<br>
        ${horas > 40 ? `Con descuento (10%): <strong>${precioConDescuento.toFixed(2)}</strong>` : `<strong>Total: ${precioFinal.toFixed(2)}</strong>`}
    `;
}

// Intersection Observer para animaciones
const opcionesObservador = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.style.opacity = '1';
            entrada.target.style.transform = 'translateY(0)';
        }
    });
}, opcionesObservador);

// Observar todas las tarjetas de servicios y freelancers
document.querySelectorAll('.tarjeta-servicio, .tarjeta-freelancer').forEach(tarjeta => {
    tarjeta.style.opacity = '0';
    tarjeta.style.transform = 'translateY(30px)';
    tarjeta.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observador.observe(tarjeta);
});

// Efectos hover para tarjetas de servicios
document.querySelectorAll('.tarjeta-servicio').forEach(tarjeta => {
    tarjeta.addEventListener('mouseenter', (evento) => {
        const icono = evento.target.querySelector('.icono-servicio');
        if (icono) {
            icono.style.transform = 'scale(1.1) rotate(5deg)';
            icono.style.transition = 'transform 0.3s ease';
        }
    });

    tarjeta.addEventListener('mouseleave', (evento) => {
        const icono = evento.target.querySelector('.icono-servicio');
        if (icono) {
            icono.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});
