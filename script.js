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

// Alternancia del menú móvil
const botonMenuMovil = document.querySelector('.boton-menu-movil');
const menuNavegacion = document.querySelector('.menu-navegacion');

botonMenuMovil.addEventListener('click', () => {
    menuNavegacion.style.display = menuNavegacion.style.display === 'flex' ? 'none' : 'flex';
});

// Fondo del encabezado al hacer scroll
window.addEventListener('scroll', () => {
    const encabezado = document.querySelector('header');
    if (window.scrollY > 100) {
        encabezado.style.background = 'rgba(15, 15, 35, 0.95)';
    } else {
        encabezado.style.background = 'rgba(15, 15, 35, 0.8)';
    }
});

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
document.querySelectorAll('.tarjeta-servicio, .tarjeta-freelancer, .miembro-equipo').forEach(tarjeta => {
    tarjeta.style.opacity = '0';
    tarjeta.style.transform = 'translateY(30px)';
    tarjeta.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observador.observe(tarjeta);
});

// Sistema de calificación para freelancers (interactivo)
document.querySelectorAll('.tarjeta-freelancer').forEach(tarjeta => {
    const estrellas = tarjeta.querySelectorAll('.estrella');
    estrellas.forEach((estrella, indice) => {
        estrella.addEventListener('mouseenter', () => {
            estrellas.forEach((e, i) => {
                e.style.color = i <= indice ? '#fbbf24' : '#374151';
            });
        });
        
        estrella.addEventListener('mouseleave', () => {
            estrellas.forEach(e => {
                e.style.color = e.textContent === '★' ? '#fbbf24' : '#374151';
            });
        });
    });
});

// Efecto de escritura dinámica para el título principal
function maquinaDeEscribir(elemento, texto, velocidad = 100) {
    let i = 0;
    elemento.innerHTML = '';
    
    function escribir() {
        if (i < texto.length) {
            elemento.innerHTML += texto.charAt(i);
            i++;
            setTimeout(escribir, velocidad);
        }
    }
    escribir();
}

// Inicializar efecto de escritura cuando la página se carga
window.addEventListener('load', () => {
    const tituloPrincipal = document.querySelector('.titulo-principal');
    const textoOriginal = tituloPrincipal.textContent;
    maquinaDeEscribir(tituloPrincipal, textoOriginal, 80);
});

// Validación de formulario para calculadora
document.querySelectorAll('.entrada-calculadora').forEach(entrada => {
    entrada.addEventListener('input', (evento) => {
        const valor = evento.target.value;
        if (evento.target.type === 'number' && valor < 0) {
            evento.target.value = 0;
        }
    });
});

// Agregar efecto de partículas flotantes
function crearParticulasFlotantes() {
    const contenedorParticulas = document.createElement('div');
    contenedorParticulas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(contenedorParticulas);

    for (let i = 0; i < 50; i++) {
        const particula = document.createElement('div');
        particula.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #6366f1, #ec4899);
            border-radius: 50%;
            opacity: 0.3;
            animation: particula-flotante ${Math.random() * 20 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        contenedorParticulas.appendChild(particula);
    }
}

// Agregar CSS para animación de partículas
const estiloParticulas = document.createElement('style');
estiloParticulas.textContent = `
    @keyframes particula-flotante {
        0% {
            opacity: 0;
            transform: translateY(100vh) scale(0);
        }
        10% {
            opacity: 0.3;
            transform: translateY(90vh) scale(1);
        }
        90% {
            opacity: 0.3;
            transform: translateY(-10vh) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-20vh) scale(0);
        }
    }
`;
document.head.appendChild(estiloParticulas);

// Inicializar partículas
crearParticulasFlotantes();

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

// Agregar funcionalidad de búsqueda
function agregarFuncionBusqueda() {
    const contenedorBusqueda = document.createElement('div');
    contenedorBusqueda.style.cssText = `
        text-align: center;
        margin: 2rem 0;
    `;
    
    const entradaBusqueda = document.createElement('input');
    entradaBusqueda.type = 'text';
    entradaBusqueda.placeholder = 'Buscar freelancers por habilidad...';
    entradaBusqueda.className = 'entrada-calculadora';
    entradaBusqueda.style.maxWidth = '400px';
    
    contenedorBusqueda.appendChild(entradaBusqueda);
    
    const seccionFreelancers = document.getElementById('freelancers');
    const cuadriculaFreelancers = seccionFreelancers.querySelector('.cuadricula-freelancers');
    
    seccionFreelancers.insertBefore(contenedorBusqueda, cuadriculaFreelancers);
    
    entradaBusqueda.addEventListener('input', (evento) => {
        const terminoBusqueda = evento.target.value.toLowerCase();
        const tarjetasFreelancer = document.querySelectorAll('.tarjeta-freelancer');
        
        tarjetasFreelancer.forEach(tarjeta => {
            const habilidad = tarjeta.querySelector('.habilidad-freelancer').textContent.toLowerCase();
            const nombre = tarjeta.querySelector('.nombre-freelancer').textContent.toLowerCase();
            
            if (habilidad.includes(terminoBusqueda) || nombre.includes(terminoBusqueda)) {
                tarjeta.style.display = 'block';
                tarjeta.style.animation = 'aparecerGradual 0.5s ease';
            } else {
                tarjeta.style.display = terminoBusqueda === '' ? 'block' : 'none';
            }
        });
    });
}

// Inicializar función de búsqueda
agregarFuncionBusqueda();

// Agregar animación aparecerGradual
const estiloAparecerGradual = document.createElement('style');
estiloAparecerGradual.textContent = `
    @keyframes aparecerGradual {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(estiloAparecerGradual);

// Funcionalidad de modal de contacto
function agregarModalContacto() {
    const htmlModal = `
        <div id="modalContacto" style="
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        ">
            <div style="
                background: var(--tarjeta-oscura);
                border-radius: 20px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                border: 1px solid var(--borde-cristal);
            ">
                <h3 style="margin-bottom: 1rem; color: var(--texto-claro);">Contáctanos</h3>
                <input type="text" placeholder="Tu nombre" class="entrada-calculadora">
                <input type="email" placeholder="Tu email" class="entrada-calculadora">
                <textarea placeholder="Tu mensaje" class="entrada-calculadora" rows="4"></textarea>
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button class="boton boton-primario" onclick="enviarMensaje()">Enviar</button>
                    <button class="boton boton-secundario" onclick="cerrarModal()">Cancelar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', htmlModal);
}

// Funciones del modal
window.abrirModal = () => {
    document.getElementById('modalContacto').style.display = 'flex';
};

window.cerrarModal = () => {
    document.getElementById('modalContacto').style.display = 'none';
};

window.enviarMensaje = () => {
    alert('¡Mensaje enviado! Te contactaremos pronto.');
    cerrarModal();
};

// Inicializar modal de contacto
agregarModalContacto();

console.log('🚀 Plataforma UniLancers cargada exitosamente!');