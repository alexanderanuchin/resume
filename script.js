
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
document.addEventListener('DOMContentLoaded', function () {
    // Находим все кнопки "Показать полностью"
    const toggleButtons = document.querySelectorAll('.toggle-button');

    toggleButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Находим соседний элемент (p) с классом clamped-text
            const textBlock = button.previousElementSibling;

            // Проверяем, развернут ли уже текст
            if (textBlock.classList.contains('expanded')) {
                // Снова свернуть
                textBlock.classList.remove('expanded');
                button.textContent = 'Показать полностью';
            } else {
                // Развернуть текст
                textBlock.classList.add('expanded');
                button.textContent = 'Свернуть';
            }
        });
    });
});

function initializeMetalloScroll(scrollWidth) {
    gsap.to(".metallo-scroll", {
        x: scrollWidth,
        ease: "none",
        scrollTrigger: {
            trigger: ".metallo-magic",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: ".metallo-magic",
        },
    });
}


function setupResponsiveMetalloScroll() {
    if (window.innerWidth >= 720 && window.innerWidth <= 990) {
        initializeMetalloScroll("-85%");
    } else if (window.innerWidth >= 991 && window.innerWidth <= 1189) {
        initializeMetalloScroll("-70%");
    } else if (window.innerWidth >= 1190 && window.innerWidth <= 1489) {
        initializeMetalloScroll("-55%");
    } else if (window.innerWidth >= 1490) {
        initializeMetalloScroll("-30%");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setupResponsiveMetalloScroll();
});


// Перезапуск анимации при изменении размеров окна
window.addEventListener("resize", () => {
    document.location.reload();
});

// Инициализация emailJS (подставьте свой USER_ID)
emailjs.init("ВАШ_EMAILJS_USER_ID");

function sendEmail(e) {
    e.preventDefault();
    const check = document.getElementById('checkAgree');
    if (!check.checked) {
        alert('Пожалуйста, примите условия перед отправкой.');
        return;
    }
    // Собираем данные формы
    const form = document.getElementById('contactForm');
    // Отправка с помощью emailJS
    emailjs.sendForm('ВАШ_SERVICE_ID', 'ВАШ_TEMPLATE_ID', '#contactForm')
        .then(function (response) {
            alert('Сообщение успешно отправлено!');
            form.reset();
        }, function (error) {
            alert('Ошибка при отправке. Попробуйте позже.');
        });
}


