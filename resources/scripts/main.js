// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    cargarHeader();
    cargarFooter();
});

//#region Carga dinámica de header y footer

// Carga el Div del menú superior de la página
function cargarHeader(){
    fetch("/resources/contenidos/headerContent.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("header-place").innerHTML = html;
            // Mover el event listener aquí, después de que el contenido se haya cargado
            document.getElementById('languageSelector').addEventListener('change', (e) => {
                updateContent(e.target.value);
            });
            // También puedes inicializar el idioma aquí
            initializeLanguage();
        });
}
// Carga el Div del footer de la página
function cargarFooter(){
    fetch("/resources/contenidos/footerContent.html")
    .then(response => response.text())
    .then(html => {
        if(document.getElementById('footer-place') != null)
            document.getElementById('footer-place').innerHTML = html;
    });
}

//#endregion

//#region Ajuste de idioma

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

//#endregion