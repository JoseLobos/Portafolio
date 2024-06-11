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

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('testimonialForm');
    const testimonialsDisplay = document.getElementById('testimonialsDisplay');
    const inputName = document.querySelector('input[name="nombre"]');
    const inputTestimony = document.querySelector('textarea[name="testimonio"]');
    const inputFile = document.querySelector('input[name="foto"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Verificar si todos los campos están llenos
        if (!inputName.value.trim() || !inputTestimony.value.trim() || !inputFile.files.length) {
            alert('Por favor, completa todos los campos y selecciona una imagen.');
            return; // Detiene la función si algún campo está vacío
        }

        const formData = new FormData(form);
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result;
            const testimonial = {
                nombre: formData.get('nombre'),
                testimonio: formData.get('testimonio'),
                foto: base64Image
            };
            saveTestimonial(testimonial);
            displayTestimonials();
            clearForm(); // Limpia el formulario después de enviar
        };
        reader.readAsDataURL(formData.get('foto'));
    });

    function saveTestimonial(testimonial) {
        let testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
        testimonials.push(testimonial);
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
    }

    function displayTestimonials() {
        const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
        testimonialsDisplay.innerHTML = '';
        testimonials.forEach(t => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h3>${t.nombre}</h3>
                <p>${t.testimonio}</p>
                <img src="${t.foto}" alt="Foto de ${t.nombre}" style="width: 150px; height: 150px; object-fit: cover;">
            `;
            testimonialsDisplay.appendChild(div);
        });
    }

    function clearForm() {
        // Limpia cada elemento del formulario
        inputName.value = '';
        inputTestimony.value = '';
        inputFile.value = '';
    }
});

function toggleTooltip(infoId) {
    const infoDiv = document.getElementById(infoId);
    if (infoDiv.classList.contains('hidden')) {
      infoDiv.classList.remove('hidden');
      infoDiv.classList.add('visible');
    } else {
      infoDiv.classList.remove('visible');
      infoDiv.classList.add('hidden');
    }
  }
  
  
  var slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
  }
  
  
  