// ------------------------------------------------
// 1. MODO CLARO / OSCURO
// ------------------------------------------------
const modoSwitch = document.getElementById("modoSwitch");

modoSwitch.addEventListener("change", () => {
    document.body.classList.toggle("modo-claro");

    // Guardar preferencia en localStorage
    if (document.body.classList.contains("modo-claro")) {
        localStorage.setItem("tema", "claro");
    } else {
        localStorage.setItem("tema", "oscuro");
    }
});

// Cargar tema guardado
document.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = localStorage.getItem("tema");

    if (temaGuardado === "claro") {
        document.body.classList.add("modo-claro");
        modoSwitch.checked = true;
    }
});


// ------------------------------------------------
// 2. MOSTRAR / OCULTAR BOTÓN "VOLVER ARRIBA"
// ------------------------------------------------
const btnTop = document.getElementById("btnTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
});

// acción del botón
btnTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});


// ------------------------------------------------
// 3. ANIMACIONES ENTRADA CON INTERSECTION OBSERVER
// ------------------------------------------------

// Elementos que deben animarse
const elementosAnimados = document.querySelectorAll(".fade-in, .slide-up");

// Configuración del observador
const observer = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.2, // se activa cuando el 20% del elemento aparece
    }
);

// Iniciar observación
elementosAnimados.forEach((el) => observer.observe(el));


// ------------------------------------------------
// 4. SUAVIZAR SCROLL EN LINKS DEL MENÚ
// ------------------------------------------------
document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const destino = document.querySelector(e.target.getAttribute("href"));
        destino.scrollIntoView({ behavior: "smooth" });
    });
});
