// Función para actualizar el contenido según el idioma
function updateContent(lang) {
    // Actualiza el atributo lang del HTML
    document.documentElement.lang = lang;
    
    // Actualiza todos los elementos con data-lang-key
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        element.textContent = translations[lang][key];
    });

    // Guarda la preferencia del usuario
    localStorage.setItem('preferredLanguage', lang);
}

// Función para inicializar el idioma
function initializeLanguage() {
    // Obtiene el idioma guardado o usa el predeterminado (es)
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'es';
    
    // Actualiza el selector al idioma guardado
    document.getElementById('languageSelector').value = savedLanguage;
    
    // Actualiza el contenido
    updateContent(savedLanguage);
}

// Evento para el selector de idioma
document.getElementById('languageSelector').addEventListener('change', (e) => {
    updateContent(e.target.value);
});

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('ultimaPagina', 'home');
    cargarContenido('home');
    
    // Inicializa el idioma
    initializeLanguage();
});

// Manejar el botón "atrás" del navegador
window.onpopstate = function(event) {
    // Extrae la página de la URL actual
    const ultimaPagina = localStorage.getItem('ultimaPagina');
    cargarContenido(ultimaPagina);
};

// Evento para cambiar el body de la página principal
function cargarContenido(pagina) {
    saveLastVisitedPage();
    fetch(`/resources/contenidos/${pagina}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('contenido-principal').innerHTML = html;
        });
}

function saveLastVisitedPage(){
    if(document.getElementById("home"))
        localStorage.setItem('ultimaPagina', 'home');
    else if(document.getElementById("contact"))
        localStorage.setItem('ultimaPagina', 'contact');
    else if(document.getElementById("aboutUs"))
        localStorage.setItem('ultimaPagina', 'aboutUs');
    else if(document.getElementById("commissionWork"))
        localStorage.setItem('ultimaPagina', 'commissionWork');
    else if(document.getElementById("projects"))
        localStorage.setItem('ultimaPagina', 'projects');
}