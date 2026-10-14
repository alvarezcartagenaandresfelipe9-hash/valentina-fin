/* ==========================================
   1. CANVAS DE POLVO DE ORO CHAMPAGNE
   ========================================== */
const canvas = document.getElementById('goldCanvas');
const ctx = canvas.getContext('2d');
let width, height, particles = [];

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class GoldParticle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 0.8;
        this.speedY = Math.random() * 0.5 + 0.15;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.7 + 0.3;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y > height) { this.y = 0; this.x = Math.random() * width; }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 211, 167, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(197, 160, 89, 0.8)';
        ctx.fill();
    }
}

function createParticles() {
    particles = [];
    for (let i = 0; i < 65; i++) particles.push(new GoldParticle());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => { initCanvas(); createParticles(); });
initCanvas(); createParticles(); animate();


/* ==========================================
   2. SCROLL REVEAL
   ========================================== */
function revelarAlScroll() {
    const elementos = document.querySelectorAll('.revelar');
    elementos.forEach(el => {
        const posicionTop = el.getBoundingClientRect().top;
        if (posicionTop < window.innerHeight - 80) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revelarAlScroll);
revelarAlScroll();


/* ==========================================
   3. TEST DE PIEL
   ========================================== */
let respuestasQuiz = {};

function responderQuiz(paso, opcion) {
    respuestasQuiz[paso] = opcion;

    if (paso === 1) {
        document.getElementById('quiz-paso1').classList.remove('activo');
        document.getElementById('quiz-paso2').classList.add('activo');
    } else if (paso === 2) {
        document.getElementById('quiz-paso2').classList.remove('activo');
        mostrarResultadoQuiz();
    }
}

function mostrarResultadoQuiz() {
    const resultadoBox = document.getElementById('quiz-resultado');
    const titulo = document.getElementById('resultado-titulo');
    const desc = document.getElementById('resultado-desc');
    const btn = document.getElementById('resultado-btn');

    let tratamiento = "Limpieza Facial Profunda";
    let explicacion = "Recomendado para desintoxicar poros, retirar impurezas y restaurar la vitalidad natural de tu piel.";

    if (respuestasQuiz[1] === 'seca' || respuestasQuiz[2] === 'hidratacion') {
        tratamiento = "Hidratación con Ácido Hialurónico";
        explicacion = "Ideal para devolver el agua perdida, aliviar tirantez y lograr una textura suave y brillante.";
    } else if (respuestasQuiz[2] === 'firmeza') {
        tratamiento = "Radiofrecuencia Reafirmante";
        explicacion = "Excelente para tonificar la piel, estimular el colágeno natural y definir contornos.";
    }

    titulo.textContent = tratamiento;
    desc.textContent = explicacion;
    btn.setAttribute('onclick', `reservarEspecial('${tratamiento}')`);
    resultadoBox.classList.add('activo');
}


/* ==========================================
   4. FICHAS TÉCNICAS
   ========================================== */
const datosTratamientos = {
    limpieza: {
        titulo: "Limpieza Facial Profunda",
        beneficios: "Remoción de toxinas y puntos negros, descongestión poro a poro, oxigenación celular inmediata.",
        indicaciones: "Pieles con tendencia comedogénica, poros dilatados o expuestas a contaminación urbana.",
        cuidados: "No usar maquillaje en las 12 horas posteriores y aplicar abundante protector solar FPS 50+."
    },
    hidratacion: {
        titulo: "Hidratación Ácido Hialurónico",
        beneficios: "Nutrición celular profunda, relleno de líneas finas por deshidratación y luminosidad instantánea.",
        indicaciones: "Pieles secas, tirantes, expuestas al sol o que han perdido el tono elástico natural.",
        cuidados: "Beber al menos 2L de agua al día para maximizar la fijación de las moléculas de hialurónico."
    },
    radiofrecuencia: {
        titulo: "Radiofrecuencia Reafirmante",
        beneficios: "Efecto lifting sin agujas, reactivación interna de fibroblastos y mejor definición del contorno facial.",
        indicaciones: "Flacidez leve o moderada en rostro, pómulos y cuello a partir de los 25 años.",
        cuidados: "Evitar exposiciones solares intensas el mismo día de la sesión."
    }
};

const modalFicha = document.getElementById('modalFicha');

function verDetallesTratamiento(clave) {
    const data = datosTratamientos[clave];
    document.getElementById('fichaTitulo').textContent = data.titulo;
    document.getElementById('fichaBeneficios').textContent = data.beneficios;
    document.getElementById('fichaIndicaciones').textContent = data.indicaciones;
    document.getElementById('fichaCuidados').textContent = data.cuidados;
    document.getElementById('fichaBtnAgendar').setAttribute('onclick', `reservarEspecial('${data.titulo}')`);
    modalFicha.classList.add('activo');
}

function cerrarModalFicha() {
    modalFicha.classList.remove('activo');
}


/* ==========================================
   5. COMPARADOR ANTES & DESPUÉS
   ========================================== */
function moverComparador(valor) {
    const imgAntes = document.getElementById('imgAntes');
    const linea = document.getElementById('lineaDivisor');
    imgAntes.style.width = valor + '%';
    linea.style.left = valor + '%';
}


/* ==========================================
   6. PREGUNTAS FRECUENTES Y FILTROS
   ========================================== */
function toggleFaq(boton) {
    const item = boton.parentElement;
    item.classList.toggle('activo');
    const icono = boton.querySelector('.faq-icono');
    icono.textContent = item.classList.contains('activo') ? '−' : '+';
}

function filtrarServicios(categoria, boton) {
    document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('activo'));
    boton.classList.add('activo');

    document.querySelectorAll('.tarjeta-servicio').forEach(tarjeta => {
        if (categoria === 'todos' || tarjeta.classList.contains(categoria)) {
            tarjeta.classList.remove('oculto');
        } else {
            tarjeta.classList.add('oculto');
        }
    });
}


/* ==========================================
   7. RESERVA POR WHATSAPP
   ========================================== */
const modalReserva = document.getElementById('modalReserva');
const numeroWhatsAppValentina = "573001234567";

function abrirModal() { modalReserva.classList.add('activo'); }
function cerrarModal() { modalReserva.classList.remove('activo'); }

function reservarEspecial(nombre) {
    cerrarModalFicha();
    document.getElementById('servicioSeleccionado').value = nombre;
    abrirModal();
}

function procesarReservaWhatsApp(e) {
    e.preventDefault();
    const cliente = document.getElementById('nombreCliente').value;
    const tratamiento = document.getElementById('servicioSeleccionado').value;

    const mensaje = encodeURIComponent(`Hola Valentina, mi nombre es ${cliente}. Me gustaría agendar una cita para el tratamiento: *${tratamiento}* en Glow & Care.`);
    const urlWhatsApp = `https://wa.me/${numeroWhatsAppValentina}?text=${mensaje}`;

    window.open(urlWhatsApp, '_blank');
    cerrarModal();
    document.getElementById('formReserva').reset();
}