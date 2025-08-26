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

// Observar todas las tarjetas de servicios, freelancers y equipo
document.querySelectorAll('.tarjeta-servicio, .tarjeta-freelancer, .miembro-equipo').forEach(tarjeta => {
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

// Modal de Contacto
function abrirModal() {
    document.getElementById('modal-contacto').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modal-contacto').style.display = 'none';
}

function enviarMensaje() {
    const nombre = document.getElementById('nombre-contacto').value;
    const email = document.getElementById('email-contacto').value;
    const mensaje = document.getElementById('mensaje-contacto').value;

    if (!nombre || !email || !mensaje) {
        alert('Por favor, completa todos los campos del formulario');
        return;
    }

    alert('Mensaje enviado con éxito');
    cerrarModal();
}

// Modal de Servicios
const datosServicios = {
    'desarrollo-web': {
        titulo: 'Desarrollo Web',
        detalle: 'Ofrecemos soluciones completas para sitios web y aplicaciones modernas, incluyendo desarrollo frontend con HTML, CSS y JavaScript, y backend con Node.js o Python. Proyectos personalizados, optimizados para SEO y adaptados a dispositivos móviles.'
    },
    'diseno-grafico': {
        titulo: 'Diseño Gráfico',
        detalle: 'Creamos identidades visuales únicas, desde logos y branding hasta interfaces de usuario y materiales promocionales. Trabajamos con herramientas como Adobe Photoshop, Illustrator y Figma para garantizar diseños modernos y atractivos.'
    },
    'tutorias-academicas': {
        titulo: 'Tutorías Académicas',
        detalle: 'Sesiones personalizadas en matemáticas, programación (Python, Java, C++), idiomas (inglés, español) y otras materias. Nuestros tutores son estudiantes destacados con experiencia en enseñanza y metodologías adaptadas a tus necesidades.'
    },
    'apps-moviles': {
        titulo: 'Apps Móviles',
        detalle: 'Desarrollamos aplicaciones móviles para Android e iOS usando frameworks como React Native y Flutter. Desde prototipos hasta aplicaciones completas, ofrecemos soluciones funcionales y optimizadas para tus ideas.'
    },
    'redaccion-contenido': {
        titulo: 'Redacción y Contenido',
        detalle: 'Producimos contenido de alta calidad, incluyendo artículos, copywriting para marketing, corrección de textos y guiones. Ideal para blogs, sitios web y campañas publicitarias, con un enfoque en claridad y creatividad.'
    },
    'analisis-datos': {
        titulo: 'Análisis de Datos',
        detalle: 'Realizamos análisis estadísticos, visualización de datos y reportes detallados usando herramientas como Python, R y Tableau. Perfecto para negocios que buscan insights valiosos a partir de sus datos.'
    }
};

function abrirModalServicio(id) {
    const servicio = datosServicios[id];
    if (servicio) {
        document.getElementById('titulo-servicio').textContent = servicio.titulo;
        document.getElementById('detalle-servicio').textContent = servicio.detalle;
        document.getElementById('modal-servicio').style.display = 'flex';
    }
}

function cerrarModalServicio() {
    document.getElementById('modal-servicio').style.display = 'none';
}

// Modal de Freelancers
const datosFreelancers = {
    'ana-jimenez': {
        nombre: 'Ana Jiménez',
        detalle: 'Desarrolladora Frontend con 3 años de experiencia en React y Vue.js. Especializada en interfaces responsivas y optimización de rendimiento web. Ha trabajado en proyectos para startups y pequeñas empresas.'
    },
    'carlos-martinez': {
        nombre: 'Carlos Martínez',
        detalle: 'Diseñador UX/UI con experiencia en Figma y Adobe XD. Crea interfaces intuitivas y atractivas, enfocándose en la experiencia del usuario. Ha diseñado aplicaciones móviles y sitios web para diversos clientes.'
    },
    'lucia-ramirez': {
        nombre: 'Lucía Ramírez',
        detalle: 'Tutora de matemáticas con experiencia en álgebra, cálculo y estadística. Ofrece sesiones personalizadas para estudiantes de secundaria y universidad, con un enfoque práctico y dinámico.'
    },
    'diego-garcia': {
        nombre: 'Diego García',
        detalle: 'Desarrollador Mobile especializado en Flutter y React Native. Ha desarrollado aplicaciones para Android e iOS, incluyendo juegos y herramientas de productividad, con un enfoque en rendimiento y usabilidad.'
    }
};

function abrirModalFreelancer(id) {
    const freelancer = datosFreelancers[id];
    if (freelancer) {
        document.getElementById('nombre-freelancer').textContent = freelancer.nombre;
        document.getElementById('detalle-freelancer').textContent = freelancer.detalle;
        document.getElementById('modal-freelancer').style.display = 'flex';
    }
}

function cerrarModalFreelancer() {
    document.getElementById('modal-freelancer').style.display = 'none';
}

// Búsqueda de freelancers
function agregarFuncionBusqueda() {
    const entradaBusqueda = document.getElementById('busqueda-freelancers');
    entradaBusqueda.addEventListener('input', () => {
        const termino = entradaBusqueda.value.toLowerCase();
        document.querySelectorAll('.tarjeta-freelancer').forEach(tarjeta => {
            const nombre = tarjeta.querySelector('.nombre-freelancer').textContent.toLowerCase();
            const habilidad = tarjeta.querySelector('.habilidad-freelancer').textContent.toLowerCase();
            tarjeta.style.display = (nombre.includes(termino) || habilidad.includes(termino)) ? 'block' : 'none';
        });
    });
}

// Partículas flotantes
function crearParticulasFlotantes() {
    const contenedor = document.querySelector('.animacion-fondo');
    const particulas = 30;
    for (let i = 0; i < particulas; i++) {
        const particula = document.createElement('div');
        particula.classList.add('particula-flotante');
        particula.style.left = `${Math.random() * 100}vw`;
        particula.style.animationDelay = `${Math.random() * 10}s`;
        particula.style.animationDuration = `${Math.random() * 10 + 5}s`;
        contenedor.appendChild(particula);
    }
}

// Efecto de escritura
function maquinaDeEscribir() {
    const frases = [
        'Conecta con el Mejor Talento Estudiantil',
        'Proyectos de Calidad a Precios Estudiantiles',
        'Encuentra tu Freelancer Ideal'
    ];
    let indiceFrase = 0;
    let indiceLetra = 0;
    let textoActual = '';
    const elemento = document.querySelector('.titulo-principal');
    const velocidadEscritura = 100;
    const velocidadBorrado = 50;
    const pausa = 2000;

    function escribir() {
        if (indiceLetra < frases[indiceFrase].length) {
            textoActual += frases[indiceFrase][indiceLetra];
            elemento.textContent = textoActual;
            indiceLetra++;
            setTimeout(escribir, velocidadEscritura);
        } else {
            setTimeout(borrar, pausa);
        }
    }

    function borrar() {
        if (indiceLetra > 0) {
            textoActual = textoActual.slice(0, -1);
            elemento.textContent = textoActual;
            indiceLetra--;
            setTimeout(borrar, velocidadBorrado);
        } else {
            indiceFrase = (indiceFrase + 1) % frases.length;
            setTimeout(escribir, 500);
        }
    }

    escribir();
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    crearParticulasFlotantes();
    maquinaDeEscribir();
    agregarFuncionBusqueda();
});