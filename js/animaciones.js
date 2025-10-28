// ===== EFECTOS DE ENTRADA =====
document.addEventListener("DOMContentLoaded", () => {
const elementos = document.querySelectorAll(".fade-in, .slide-up");

const observer = new IntersectionObserver((entradas) => {
entradas.forEach((entrada) => {
if (entrada.isIntersecting) {
entrada.target.classList.add("visible");
}
});
}, { threshold: 0.2 });

elementos.forEach((el) => observer.observe(el));
});

// ===== BOTÓN VOLVER ARRIBA =====
const btnTop = document.getElementById("btnTop");

window.onscroll = () => {
if (document.documentElement.scrollTop > 300) {
btnTop.style.display = "block";
} else {
btnTop.style.display = "none";
}
};

btnTop.addEventListener("click", () => {
window.scrollTo({
top: 0,
behavior: "smooth"
});
});

// ===== MODO OSCURO / CLARO =====
const switchModo = document.getElementById("modoSwitch");
const cuerpo = document.body;

// Mantener preferencia guardada
if (localStorage.getItem("modo") === "light") {
cuerpo.classList.add("light");
switchModo.checked = true;
}

switchModo.addEventListener("change", () => {
cuerpo.classList.toggle("light");
if (cuerpo.classList.contains("light")) {
localStorage.setItem("modo", "light");
} else {
localStorage.setItem("modo", "dark");
}
});
