// ---- Descargar CV según idioma ----
function descargarCV(idioma) {
    var nombreArchivo, fileUrl;
    if (idioma === 'ingles') {
        nombreArchivo = 'PLANTILLA PROFILE.pdf';
        fileUrl = 'PLANTILLA%20PROFILE.pdf';
    } else {
        nombreArchivo = 'PLANTILLA PERFIL PROFESIONAL.pdf';
        fileUrl = 'PLANTILLA%20PERFIL%20PROFESIONAL.pdf';
    }
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = nombreArchivo;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => console.error('Error al descargar el archivo:', error));
}

// ---- Menú Responsive ----
let menuVisible = false;
function mostrarOcultarMenu() {
    if (menuVisible) {
        document.getElementById("nav").classList = "";
        menuVisible = false;
    } else {
        document.getElementById("nav").classList = "responsive";
        menuVisible = true;
    }
}
function seleccionar() {
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

// ---- Animación de habilidades ----
function efectoHabilidades() {
    var skills = document.getElementById("skills");
    if (!skills) return;
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if (distancia_skills >= 300) {
        let habilidades = document.getElementsByClassName("progreso");
        if (habilidades.length >= 10) {
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
}
window.onscroll = function () {
    efectoHabilidades();
};

// ---- Testimonios ----
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('testimonialForm');
    const testimonialsDisplay = document.getElementById('testimonialsDisplay');
    const inputName = document.querySelector('input[name="nombre"]');
    const inputTestimony = document.querySelector('textarea[name="testimonio"]');
    const inputFile = document.querySelector('input[name="foto"]');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!inputName.value.trim() || !inputTestimony.value.trim() || !inputFile.files.length) {
                alert('Por favor, completa todos los campos y selecciona una imagen.');
                return;
            }
            const formData = new FormData(form);
            const reader = new FileReader();
            reader.onload = function (e) {
                const base64Image = e.target.result;
                const testimonial = {
                    nombre: formData.get('nombre'),
                    testimonio: formData.get('testimonio'),
                    foto: base64Image
                };
                saveTestimonial(testimonial);
                displayTestimonials();
                clearForm();
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
            inputName.value = '';
            inputTestimony.value = '';
            inputFile.value = '';
        }
        displayTestimonials();
    }
});

// ---- Carrusel de imágenes, botones, traducción, etc ----
const projectTexts = {
    norris: [
        { es: "Norris es un proyecto educativo diseñado para funcionar como un asistente virtual especializado en apoyar a pacientes con EPOC. Sus objetivos principales son: proporcionar un sistema para el registro de síntomas y signos vitales, facilitar la comunicación directa entre médicos y pacientes mediante un chat que conserva un historial de conversaciones, generar estadísticas relevantes para el seguimiento de la enfermedad, ofrecer un blog informativo sobre la EPOC.", en: "Norris is an educational project designed to function as a virtual assistant specializing in supporting patients with COPD. Its main objectives are to provide a system for recording symptoms and vital signs, facilitate direct communication between doctors and patients through a chat that preserves a history of conversations, generate relevant statistics for disease monitoring, and offer an informative blog about COPD." },
        { es: "Dentro del proyecto Norris, mi rol fue testing y desarrollo front-end. Realicé pruebas de funcionalidades bajo distintos escenarios y creé interfaces con HTML, CSS, JavaScript, Bootstrap y Vue, buscando una experiencia fluida y accesible.", en: "Within the Norris project, my role focused on testing and front-end development. I performed functionality testing under various scenarios and created interfaces with HTML, CSS, JavaScript, Bootstrap, and Vue, aiming for a smooth and accessible user experience." },
        { es: "El desarrollo de Norris implicó integrar varias tecnologías y la colaboración de un equipo multidisciplinario. Se usaron frameworks modernos, desde la planificación y diseño, hasta la implementación y pruebas.", en: "The development of Norris involved integrating various technologies and collaborating with a multidisciplinary team. Modern frameworks were used, from planning and design to implementation and testing." },
        { es: "Laravel (backend), MySQL y MongoDB (bases de datos), CSS, JavaScript, PHP, HTML (frontend), Bootstrap y Vue (responsive e interactividad), API de OpenAI (asistente inteligente).", en: "Laravel (backend), MySQL and MongoDB (databases), CSS, JavaScript, PHP, HTML (frontend), Bootstrap and Vue (responsive and interactivity), OpenAI API (intelligent assistant)." }
    ],
    escolar: [
        { es: "EscolarBite busca transformar la experiencia de pedido de alimentos en los cafetines UGB: acceso a menús, pedidos personalizados online, monitoreo de tiempos y notificaciones al estar listos.", en: "EscolarBite aims to transform the food ordering experience at UGB cafeterias: menu access, personalized online orders, time monitoring, and notifications when ready." },
        { es: "Fui desarrollador front-end: diseño de interfaz, experiencia atractiva, asegurando usabilidad en distintos dispositivos y navegadores e implementando interacciones dinámicas.", en: "I was the front-end developer: interface design, engaging user experience, ensuring usability across devices and browsers, and implementing dynamic interactions." },
        { es: "El desarrollo incluyó diseñar una interfaz web amigable para explorar menús, personalizar y realizar pedidos online. Se planificaron y aplicaron funcionalidades clave usando tecnologías web.", en: "Development included designing a user-friendly web interface for browsing menus, customizing and placing online orders. Key features were planned and implemented using web technologies." },
        { es: "PHP (backend), HTML5 y CSS (estructura y estilos), Bootstrap JS (responsive), SweetAlert2 (notificaciones estéticas).", en: "PHP (backend), HTML5 and CSS (structure and styling), Bootstrap JS (responsive), SweetAlert2 (aesthetic notifications)." }
    ]
};

function translatePortfolioButtons(lang) {
    document.querySelectorAll('.button-portfolio').forEach(btn => {
        const es = btn.getAttribute('data-es');
        const en = btn.getAttribute('data-en');
        if (es && en) btn.querySelector('span').textContent = lang === 'ingles' ? en : es;
    });
}
function showProjectInfo(btn, proyecto, idx) {
    btn.parentElement.querySelectorAll('.button-portfolio').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const lang = document.getElementById('languageSwitcher').value;
    const cont = document.getElementById('info-' + proyecto);
    cont.textContent = projectTexts[proyecto][idx - 1][lang === 'ingles' ? 'en' : 'es'];
}

// ---- GENERAL TRANSLATE FUNCTION for all [data-es][data-en] elements ----
function translateGeneralTexts(lang) {
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
}

// ---- Carousel and Lightbox ----
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('info-norris').textContent = "";
    document.getElementById('info-escolar').textContent = "";
    document.querySelectorAll('.carousel-container').forEach(container => {
        const images = container.getAttribute('data-images').split(',');
        let idx = 0;
        const imgTag = container.querySelector('.carousel-img');
        function show(n) {
            idx = (n + images.length) % images.length;
            imgTag.src = images[idx];
        }
        imgTag.onclick = function () { openLightbox(images, idx); };
    });

    // Traducción inicial
    const select = document.getElementById('languageSwitcher');
    const lang = select.value === 'ingles' ? 'en' : 'es';
    translatePortfolioButtons(select.value);
    translateGeneralTexts(lang);
    document.querySelectorAll('.uniform-desc').forEach(desc => {
        desc.textContent = desc.getAttribute('data-' + lang);
    });
    translateTestimonials(select.value);
});

// ---- Lightbox con flechas solo aquí ----
function openLightbox(imagesArr, idxStart) {
    let idx = idxStart;
    let div = document.createElement('div');
    div.className = 'lightbox-bg';
    div.innerHTML = `
        <span class="lightbox-close" style="position:absolute;top:20px;right:40px;font-size:48px;cursor:pointer;z-index:11;">&times;</span>
        <span class="lightbox-arrow lightbox-prev" style="position:absolute;left:30px;top:50%;font-size:48px;cursor:pointer;z-index:11;">&#10094;</span>
        <span class="lightbox-arrow lightbox-next" style="position:absolute;right:30px;top:50%;font-size:48px;cursor:pointer;z-index:11;">&#10095;</span>
        <img class="lightbox-img" src="${imagesArr[idx]}" alt="Imagen ampliada" style="display:block;margin:auto;max-width:85vw;max-height:80vh;border-radius:18px;box-shadow:0 8px 40px #222;">
    `;
    div.querySelector('.lightbox-close').onclick = () => { document.body.removeChild(div); window.onkeydown = null; };
    div.querySelector('.lightbox-prev').onclick = (e) => { e.stopPropagation(); idx = (idx - 1 + imagesArr.length) % imagesArr.length; div.querySelector('.lightbox-img').src = imagesArr[idx]; };
    div.querySelector('.lightbox-next').onclick = (e) => { e.stopPropagation(); idx = (idx + 1) % imagesArr.length; div.querySelector('.lightbox-img').src = imagesArr[idx]; };
    window.onkeydown = function (e) {
        if (e.key === 'ArrowRight') { idx = (idx + 1) % imagesArr.length; div.querySelector('.lightbox-img').src = imagesArr[idx]; }
        if (e.key === 'ArrowLeft') { idx = (idx - 1 + imagesArr.length) % imagesArr.length; div.querySelector('.lightbox-img').src = imagesArr[idx]; }
        if (e.key === 'Escape') { document.body.removeChild(div); window.onkeydown = null; }
    };
    div.onclick = function (e) { if (e.target === div) { document.body.removeChild(div); window.onkeydown = null; } };
    document.body.appendChild(div);
}

// --- Carrusel de testimonios ---
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

// ---- Testimonios multilenguaje ----
function translateTestimonials(lang) {
    // Bloque de testimonios con ES/EN
    const testimonialData = [
        {
            es: `Usulután 10 de junio de 2024\n\nYo Herbert René Cordero Henríquez, Licenciado de profesión y docente de la Universidad Gerardo Barrios, doy mi recomendación por este medio  de José Alexander Salinas Lobos quien es estudiante, cursando la carrera de Ingeniería en Sistemas y Redes Informáticas y conozco desde hace 4 años.
Como estudiante ha mostrado respeto a los docentes y compañeros, completa dedicación a las actividades y proyectos de estudio. Demuestra poseer buenas habilidades, trabajo en equipo y disponibilidad en los quehaceres de la Facultad de Ciencia y Tecnología y gran sentido de responsabilidad.
Es una excelente persona, con ganas de aprender y habilidades sociales; su forma de pensar estratégica le hace muy apta para desarrollar cualquier tarea. Por su aptitud y actitud tiene grandes intentos por superarse. Por lo que estoy seguro de que llegará a ser una persona exitosa en la vida y en su carrera profesional.
Docente de la Facultad de Ciencia y Tecnología
Centro Regional Usulután`,
            en: `Usulután, June 10, 2024\n\nI, Herbert René Cordero Henríquez, Bachelor by profession and professor at Universidad Gerardo Barrios, hereby recommend José Alexander Salinas Lobos, who is a student pursuing a degree in Computer Systems and Network Engineering and whom I have known for 4 years.
As a student, he has shown respect for teachers and classmates, complete dedication to activities and study projects. He demonstrates good skills, teamwork, and availability in the Faculty of Science and Technology and a great sense of responsibility.
He is an excellent person, eager to learn and with strong social skills; his strategic thinking makes him very capable of carrying out any task. Due to his aptitude and attitude, he is determined to improve himself. Therefore, I am sure he will become a successful person in life and his professional career.
Faculty of Science and Technology Teacher
Usulután Regional Center`
        },
        {
            es: `Yo Oscar Roberto Torres Rodríguez, Licenciado en Computación del origen y domicilio de Santa Elena y actualmente docente tiempo completo de la Facultad de Ciencias y Tecnologías de la Universidad Gerardo Barrios de Usulután, HAGO CONSTAR QUE:
José Alexander Salinas Lobo, es estudiante del ciclo VII de Ingeniería en Sistemas y Redes Informática, de la Universidad “Gerardo Barrios”, afirmo que él es una persona de excelente conducta, honrado, intachable, responsable en todos sus actos y en cuanto a su rol como estudiante es disciplinado, autodidacta, investigador, integral, trabaja en equipo. Afirmo que ha adquirido muchos conocimientos en el área de redes y base de datos, por ello está dispuesto a compartir todos sus conocimientos a una sociedad en progreso.
Email: ortorres@ugb.edu.sv`,
            en: `I, Oscar Roberto Torres Rodríguez, Bachelor in Computer Science, originally from and residing in Santa Elena and currently a full-time professor at the Faculty of Science and Technology at Universidad Gerardo Barrios de Usulután, HEREBY CERTIFY THAT:
José Alexander Salinas Lobo, is a seventh-term student in Computer Systems and Network Engineering at Universidad Gerardo Barrios. I affirm that he is a person of excellent conduct, honest, upright, responsible in all his actions, and as a student, he is disciplined, self-taught, a researcher, well-rounded, and a team player. I confirm that he has acquired a lot of knowledge in networking and databases and is therefore willing to share all his knowledge with a society in progress.
Email: ortorres@ugb.edu.sv`
        },
        {
            es: `Usulután, 06 de junio de 2024
Reciba un cordial y respetuoso saludo. A través de estas líneas deseo hacer de su conocimiento que USI0910201, Salinas Lobos José Alexander quien es estudiante de la carrera de ingeniería en sistemas y redes informáticas, es un estudiante con una destacada actitud. Ha demostrado ser un ordenado, responsable y fiel cumplidor de sus tareas. Siempre ha manifestado preocupación por mejorar, actualizar y actualizar sus conocimientos.
Durante este ciclo I-2024 se ha desempeñado de forma excelente en la asignatura de robótica, desarrollando un robot basado en software y hardware libre.
Ing. Marvin Parada
marvin.parada@ugb.edu.sv
Docente tiempo completo
Universidad Gerardo Barrios`,
            en: `Usulután, June 6, 2024
Receive a cordial and respectful greeting. Through these lines, I would like to inform you that USI0910201, Salinas Lobos José Alexander, who is a student in Computer Systems and Network Engineering, is a student with an outstanding attitude. He has shown himself to be organized, responsible, and a faithful fulfiller of his tasks. He has always shown concern for improving and updating his knowledge.
During this term I-2024, he performed excellently in the robotics course, developing a robot based on free software and hardware.
Eng. Marvin Parada
marvin.parada@ugb.edu.sv
Full-time professor
Universidad Gerardo Barrios`
        }
    ];

    document.querySelectorAll('.mySlides q').forEach((q, i) => {
        q.textContent = testimonialData[i][lang === 'ingles' ? 'en' : 'es'];
    });
}

// ---- Listener de idioma: traduce TODO ----
document.getElementById('languageSwitcher').addEventListener('change', function() {
    const lang = this.value === 'ingles' ? 'en' : 'es';

    translateGeneralTexts(lang); // Títulos, presentaciones, secciones
    document.querySelectorAll('.uniform-desc').forEach(desc => {
        desc.textContent = desc.getAttribute('data-' + lang);
    });
    translateTestimonials(this.value); // Testimonios
    translatePortfolioButtons(this.value); // Botones del portafolio

    // Si hay info activa en portafolio, la actualiza
    ['norris', 'escolar'].forEach(pr => {
        const cont = document.getElementById('info-' + pr);
        if (cont && cont.textContent.trim()) {
            const idx = Array.from(document.querySelectorAll('.portfolio-card')).find(c => c.querySelector('#info-' + pr))
                .querySelector('.button-portfolio.active').getAttribute('onclick').match(/\d+/)[0];
            cont.textContent = projectTexts[pr][idx - 1][lang];
        }
    });
});

// Traducción inicial por seguridad
window.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('languageSwitcher');
    const lang = select.value === 'ingles' ? 'en' : 'es';
    translateGeneralTexts(lang);
    document.querySelectorAll('.uniform-desc').forEach(desc => {
        desc.textContent = desc.getAttribute('data-' + lang);
    });
    translateTestimonials(select.value);
    translatePortfolioButtons(select.value);
});
