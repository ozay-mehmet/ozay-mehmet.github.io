let stars = [];
const STAR_COUNT = 500;
let starCanvas, starCtx, animationId, loadingScreenDiv, progressBarFill, progressInterval;
let currentProgress = 0;
const LOAD_DURATION = 3000;

function initializeLoadingScreen() {
    loadingScreenDiv = document.createElement('div');
    loadingScreenDiv.id = 'loadingScreen';
    Object.assign(loadingScreenDiv.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        backgroundColor: '#000', zIndex: '10000', display: 'flex',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    });
    document.body.appendChild(loadingScreenDiv);

    starCanvas = document.createElement('canvas');
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    Object.assign(starCanvas.style, {
        position: 'absolute', top: '0', left: '0', zIndex: '-1'
    });
    loadingScreenDiv.appendChild(starCanvas);
    starCtx = starCanvas.getContext('2d');

    const loadingText = document.createElement('div');
    loadingText.textContent = 'YÜKLENİYOR...';
    Object.assign(loadingText.style, {
        color: 'white', font: '30px Arial', textShadow: '0 0 10px #fff', marginBottom: '20px'
    });
    loadingScreenDiv.appendChild(loadingText);

    const progressBarContainer = document.createElement('div');
    Object.assign(progressBarContainer.style, {
        width: '60%', maxWidth: '400px', height: '20px',
        backgroundColor: '#555', borderRadius: '10px', overflow: 'hidden'
    });
    loadingScreenDiv.appendChild(progressBarContainer);

    progressBarFill = document.createElement('div');
    Object.assign(progressBarFill.style, {
        width: '0%', height: '100%', backgroundColor: '#4CAF50',
        borderRadius: '10px', transition: 'width 0.1s linear'
    });
    progressBarContainer.appendChild(progressBarFill);

    createStars();
    animateStars();
    startProgressAnimation();
}

function startProgressAnimation() {
    currentProgress = 0;
    progressBarFill.style.width = '0%';
    const increment = 100 / (LOAD_DURATION / 50);

    progressInterval = setInterval(() => {
        currentProgress += increment * (100 / LOAD_DURATION * 50);
        currentProgress = Math.min(currentProgress, 100);
        progressBarFill.style.width = `${currentProgress}%`;

        if (currentProgress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                if (loadingScreenDiv) loadingScreenDiv.style.display = 'none';
                if (animationId) cancelAnimationFrame(animationId);
                document.dispatchEvent(new Event('loadingScreenHidden'));
            }, 500);
        }
    }, 100);
}

function createStars() {
    stars = [];
    if (!starCanvas) return;
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random() * 0.5 + 0.5,
            speed: Math.random() * 0.5 + 0.1
        });
    }
}

function animateStars() {
    if (!starCtx || !starCanvas || !loadingScreenDiv || loadingScreenDiv.style.display === 'none') {
        if (animationId) cancelAnimationFrame(animationId);
        return;
    }
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > starCanvas.height) {
            star.y = 0;
            star.x = Math.random() * starCanvas.width;
        }
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        starCtx.fill();
    });

    animationId = requestAnimationFrame(animateStars);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLoadingScreen);
} else {
    initializeLoadingScreen();
}

window.addEventListener('resize', function () {
    if (starCanvas) {
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
        if (loadingScreenDiv && loadingScreenDiv.style.display !== 'none') {
            createStars();
        }
    }
});