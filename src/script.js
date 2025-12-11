document.addEventListener('DOMContentLoaded', () => {
    const numbers = document.querySelectorAll('.resultados-numeros');

    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + (obj.dataset.suffix || '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.innerText.replace(/\D/g, ''));
                const suffix = target.innerText.replace(/[0-9]/g, '');
                target.dataset.suffix = suffix; // Store suffix like "+" or "%"
                animateValue(target, 0, endValue, 1000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    numbers.forEach(number => {
        observer.observe(number);
    });
});
