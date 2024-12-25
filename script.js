gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

document.addEventListener('DOMContentLoaded', () => {
    // Развёртывание текста "Показать полностью"
    const toggleButtons = document.querySelectorAll('.toggle-button');
    toggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const textBlock = button.previousElementSibling;
            if (!textBlock) return;

            if (textBlock.classList.contains('expanded')) {
                textBlock.classList.remove('expanded');
                button.textContent = 'Показать полностью';
            } else {
                textBlock.classList.add('expanded');
                button.textContent = 'Свернуть';
            }
        });
    });

    setupResponsiveMetalloScroll();
});

function initializeMetalloScroll(scrollWidth) {
    gsap.to('.metallo-scroll', {
        x: scrollWidth,
        ease: 'none',
        scrollTrigger: {
            trigger: '.metallo-magic',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: '.metallo-magic',
        },
    });
}

function setupResponsiveMetalloScroll() {
    const width = window.innerWidth;
    let scrollX = '-30%'; // по умолчанию для больших экранов

    // Подбираем оптимальные breakpoints (пример)
    if (width < 720) {
        // Для телефонов или узких экранов
        scrollX = '-100%';
    } else if (width >= 720 && width < 991) {
        scrollX = '-85%';
    } else if (width >= 991 && width < 1190) {
        scrollX = '-70%';
    } else if (width >= 1190 && width < 1490) {
        scrollX = '-55%';
    } else {
        scrollX = '-30%';
    }

    initializeMetalloScroll(scrollX);
}

// Вместо перезагрузки - корректно пересчитываем ScrollTrigger
window.addEventListener('resize', () => {
    // Сбросим все предыдущие ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill(true));
    setupResponsiveMetalloScroll();
    ScrollTrigger.refresh();
});

// EmailJS (пример)
emailjs.init('g93Fpx6b31GM-rhdR');
function sendEmail(event) {
    event.preventDefault();
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const message = document.getElementById("message");
    if (!userName.value.trim() || !userEmail.value.trim() || !message.value.trim()) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userEmail.value.trim())) {
        alert("Введите корректный Email.");
        return;
    }
    emailjs
        .send("service_wreecri", "template_syzkmnp", {
            name: userName.value,
            email: userEmail.value,
            message: message.value,
        })
        .then(() => {
            alert("Ваше сообщение успешно отправлено!");
            document.getElementById("contactForm").reset();
        })
        .catch((error) => {
            console.error("Ошибка при отправке:", error);
            alert("Произошла ошибка при отправке сообщения. Попробуйте позже.");
        });
}