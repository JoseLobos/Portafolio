function descargarCV(idioma) {
    var nombreArchivo, fileUrl;

    if (idioma === 'ingles') {
        nombreArchivo = 'PLANTILLA PROFILE.pdf';
        fileUrl = 'PLANTILLA%20PROFILE.pdf';
    } else {
        nombreArchivo = 'PLANTILLA PERFIL PROFESIONAL.pdf';
        fileUrl = 'PLANTILLA%20PERFIL%20PROFESIONAL.pdf';
    }

    // Realizar la solicitud para descargar el archivo
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
            // Crear un enlace temporal
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = nombreArchivo;

            // Agregar el enlace al documento
            document.body.appendChild(link);

            // Simular un clic en el enlace para iniciar la descarga
            link.click();

            // Eliminar el enlace del documento
            document.body.removeChild(link);
        })
        .catch(error => console.error('Error al descargar el archivo:', error));
}


let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("photoshop");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("drupal");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
    }
}

//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
} 

  
function nextImage(clickedElement) {
    // Obtiene el contenedor del proyecto específico donde se hizo clic
    const projectContainer = clickedElement.closest('.proyecto');
  
    // Obtiene todas las imágenes dentro de este contenedor específico
    const images = projectContainer.querySelectorAll('img.imagen-proyecto');
    
    // Encuentra la imagen actual que se muestra
    let currentImageIndex = Array.from(images).findIndex(img => img.style.display === 'block');
    
    // Oculta la imagen actual
    images[currentImageIndex].style.display = 'none';
    
    // Determina el índice de la siguiente imagen
    let nextImageIndex = (currentImageIndex + 1) % images.length;
    
    // Muestra la siguiente imagen
    images[nextImageIndex].style.display = 'block';
  }

  
  function showTooltip(element) {
    // Selecciona el tooltip correcto dentro de este proyecto
    const tooltip = element.querySelector('.tooltip-content, .tooltip-content-proyecto2'); // Añade más selectores según sea necesario
    if (tooltip) {
      tooltip.style.display = 'block';
    }
  }
  
  function hideTooltip(element) {
    // Selecciona el tooltip correcto dentro de este proyecto
    const tooltip = element.querySelector('.tooltip-content, .tooltip-content-proyecto2'); // Añade más selectores según sea necesario
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  }
  
  document.getElementById('languageSwitcher').addEventListener('change', function() {
    var selectedLanguage = this.value;
    // Encuentra todos los elementos que tienen atributos de datos de traducción
    document.querySelectorAll('[data-es], [data-en]').forEach(element => {
        if (selectedLanguage === 'ingles') {
            element.textContent = element.dataset.en;
        } else {
            element.textContent = element.dataset.es;
        }
    });
});

  




  