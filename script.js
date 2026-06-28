const themeBtn = document.getElementById("themeBtn");
const sunIcon = themeBtn.querySelector(".sun-icon");
const moonIcon = themeBtn.querySelector(".moon-icon");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
} else {
    document.body.classList.remove("dark-theme");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
    } else {
        localStorage.setItem("theme", "light");
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
    }
});

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
    menuBtn.classList.toggle("active");
});

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("show");
        menuBtn.classList.remove("active");
    });
});

const typing = document.getElementById("typing");
const words = ["Web Developer.", "Systems Engineer.", "Django Specialist.", "UI/UX Architect."];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    let current = words[wordIndex];

    if (!deleting) {
        typing.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typing.textContent = current.substring(0, charIndex--);
        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    setTimeout(typeEffect, deleting ? 40 : 80);
}
typeEffect();

const filters = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".card");

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        filters.forEach(b => b.classList.remove("active-filter"));
        btn.classList.add("active-filter");

        let filter = btn.dataset.filter;

        cards.forEach(card => {
            if (filter === "all" || card.classList.contains(filter)) {
                card.style.display = "block";
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0) scale(1)";
                }, 50);
            } else {
                card.style.opacity = "0";
                card.style.transform = "translateY(15px) scale(0.95)";
                setTimeout(() => {
                    card.style.display = "none";
                }, 350);
            }
        });
    });
});

const skills = document.querySelectorAll(".bar span");
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skills.forEach(skill => {
                skill.style.width = skill.dataset.width;
            });
            skillObserver.disconnect();
        }
    });
}, { threshold: 0.1 });

if (document.querySelector("#skills")) {
    skillObserver.observe(document.querySelector("#skills"));
}

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });

reveals.forEach(section => {
    revealObserver.observe(section);
});

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let message = document.getElementById("message");
    let valid = true;

    clearErrors();

    if (name.value.trim() === "") {
        showError(name, "Name cannot be empty");
        valid = false;
    }

    if (email.value.trim() === "") {
        showError(email, "Email cannot be empty");
        valid = false;
    } else if (!emailCheck(email.value)) {
        showError(email, "Please enter a valid email address");
        valid = false;
    }

    if (message.value.trim() === "") {
        showError(message, "Message cannot be empty");
        valid = false;
    }

    if (valid) {
        const successModal = document.getElementById("success");
        successModal.style.display = "block";
        form.reset();
        setTimeout(() => {
            successModal.style.display = "none";
        }, 3000);
    }
});

function showError(input, msg) {
    input.style.borderColor = "#ef4444";
    input.nextElementSibling.textContent = msg;
}

function clearErrors() {
    document.querySelectorAll(".error-msg").forEach(s => s.textContent = "");
    document.querySelectorAll("input, textarea").forEach(i => {
        i.style.borderColor = "var(--border)";
    });
}

function emailCheck(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.getElementById("top").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const topBtn = document.getElementById('top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }
});

topBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});