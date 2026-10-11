const loaderScreen = document.getElementById('loaderScreen');

window.addEventListener('load', () => {
    setTimeout(() => {
        if (loaderScreen) {
            loaderScreen.classList.add('hidden');
        }
    }, 1800);
});

const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

const contactButton = document.getElementById('contactButton');
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');

if (contactButton && contactModal) {
    contactButton.addEventListener('click', () => {
        setContactModalOpen(true);
    });
}

function setContactModalOpen(isOpen) {
    if (!contactModal) {
        return;
    }

    contactModal.classList.toggle('active', isOpen);
    contactModal.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
        const nameInput = document.getElementById('nama');
        if (nameInput) {
            nameInput.focus();
        }
    } else if (contactButton) {
        contactButton.focus();
    }
}

if (closeModal && contactModal) {
    closeModal.addEventListener('click', () => {
        setContactModalOpen(false);
    });
}

if (contactModal) {
    contactModal.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            setContactModalOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && contactModal.classList.contains('active')) {
            setContactModalOpen(false);
        }
    });
}

const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
    function setTheme(theme) {
        document.documentElement.dataset.theme = theme;
        const isLight = theme === 'light';

        themeToggle.textContent = isLight ? '🌙' : '☀️';
        themeToggle.setAttribute(
            'aria-label',
            isLight ? 'Ganti ke mode gelap' : 'Ganti ke mode terang'
        );
        themeToggle.title = isLight ? 'Mode gelap' : 'Mode terang';
        localStorage.setItem('theme', theme);
    }

    setTheme(localStorage.getItem('theme') || 'light');

    themeToggle.addEventListener('click', () => {
        const nextTheme =
            document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    });
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameInput = document.getElementById('nama');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subjek');
        const messageInput = document.getElementById('pesan');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const messageSubject = subjectInput ? subjectInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !messageSubject || !message) {
            alert('Silakan lengkapi semua kolom terlebih dahulu.');
            return;
        }

        const subject = encodeURIComponent(messageSubject);
        const body = encodeURIComponent(
            `Nama: ${name}\nEmail: ${email}\nSubjek: ${messageSubject}\n\nPesan:\n${message}`
        );

        window.location.href =
            `mailto:andinikanesa@gmail.com?subject=${subject}&body=${body}`;
    });
}