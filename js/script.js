// ================= EMAILJS =================
(function(){
    emailjs.init("l7nmj2hdaFgx7CvpS");
})();

// ================= SCROLL SUAVE =================
function scrollToSection(targetId) {
    const section = document.querySelector(targetId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btnMenuHero = document.getElementById("btn-hero-menu");
    if (btnMenuHero) {
        btnMenuHero.addEventListener("click", () => scrollToSection("#menu"));
    }

    const btnReservaHero = document.getElementById("btn-hero-reserva");
    if (btnReservaHero) {
        btnReservaHero.addEventListener("click", () => scrollToSection("#reservas"));
    }
});

// ================= BLOQUEAR FECHAS =================
const fechaInput = document.getElementById("fecha");
let hoy = new Date().toISOString().split("T")[0];
fechaInput.setAttribute("min", hoy);

// ================= TEL SOLO NÚMEROS =================
document.getElementById("telefono").addEventListener("input", function() {
    this.value = this.value.replace(/\D/g, "");
});

// ================= MENÚ =================
function abrirMenu(tipo) {
    const modal = document.getElementById("modal");
    const contenedor = document.getElementById("contenidoMenu");

    modal.style.display = "block";

    let html = `<h2>${tipo}</h2>`;

    for (let i = 1; i <= 3; i++) {
        html += `
        <div class="platillo">
            <img src="assets/${tipo}${i}.jpg">
            <div>
                <h3>${tipo} ${i}</h3>
                <p>$${50 + i}</p>
                <p>Descripción del producto.</p>
            </div>
        </div>`;
    }

    contenedor.innerHTML = html;
}

function cerrarMenu() {
    document.getElementById("modal").style.display = "none";
}

// ================= RESERVA PRO (MEJORADO 🔥) =================
document.getElementById("reservaForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let valido = true;

    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let telefono = document.getElementById("telefono");
    let fecha = document.getElementById("fecha");
    let hora = document.getElementById("hora");
    let personas = document.getElementById("personas");

    // LIMPIAR ERRORES
    document.querySelectorAll(".mensaje-error").forEach(e => e.textContent = "");
    document.querySelectorAll("input").forEach(i => i.classList.remove("input-error", "input-ok"));

    // ================= VALIDACIONES =================

    if (nombre.value.trim() === "") {
        error(nombre, "errorNombre", "Ingresa tu nombre");
        valido = false;
    } else ok(nombre);

    if (apellido.value.trim() === "") {
        error(apellido, "errorApellido", "Ingresa tu apellido");
        valido = false;
    } else ok(apellido);

    if (!/^[0-9]{10}$/.test(telefono.value)) {
        error(telefono, "errorTelefono", "Debe tener 10 dígitos");
        valido = false;
    } else ok(telefono);

    if (personas.value <= 0) {
        error(personas, "errorPersonas", "Número inválido");
        valido = false;
    } else ok(personas);

    // 🔥 NUEVO: VALIDAR FECHA VACÍA
    if (fecha.value === "") {
        error(fecha, "errorFecha", "Selecciona una fecha");
        valido = false;
    } else {
        ok(fecha);
    }

    // 🔥 NUEVO: VALIDAR HORA VACÍA
    if (hora.value === "") {
        error(hora, "errorHora", "Selecciona una hora");
        valido = false;
    } else {
        ok(hora);
    }

    // 🔒 SI YA FALLÓ, NO SIGUE (evita errores con split)
    if (!valido) return;

    // ================= LÓGICA DE HORARIO =================
    let fechaSeleccionada = new Date(fecha.value);
    let ahora = new Date();

    let dia = fechaSeleccionada.getDay();
    let apertura = (dia >= 5) ? 8 : 7;
    let cierre = (dia >= 5) ? 23 : 22;

    let horaNum = parseInt(hora.value.split(":")[0]);

    if (horaNum < apertura || horaNum >= cierre) {
        error(hora, "errorHora", "Fuera de horario");
        valido = false;
    } else ok(hora);

    if (fechaSeleccionada.toDateString() === ahora.toDateString()) {
        if (horaNum <= ahora.getHours()) {
            error(hora, "errorHora", "Hora ya pasó");
            valido = false;
        }
    }

    if (!valido) return;

    // ================= ENVÍO =================
    let templateParams = {
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: telefono.value,
        fecha: fecha.value,
        hora: hora.value,
        personas: personas.value
    };

    emailjs.send("service_go5m4wk", "template_dhxtmar", templateParams)
    .then(() => {
        document.getElementById("mensajeExito").style.display = "block";
        document.getElementById("reservaForm").reset();
    });
});

// ================= FUNCIONES =================
function error(input, id, mensaje) {
    input.classList.add("input-error");
    document.getElementById(id).textContent = mensaje;
}

function ok(input) {
    input.classList.add("input-ok");
}

// ================= HEADER INTELIGENTE =================
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        header.classList.add("header-hide");
    } else {
        header.classList.remove("header-hide");
    }

    lastScroll = currentScroll;
});

// ================= ANIMACIÓN SCROLL =================
// ================= ANIMACIÓN PRO (OPTIMIZADA) =================
const elementos = document.querySelectorAll(".animar");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.2
});

elementos.forEach(el => observer.observe(el));