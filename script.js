document.addEventListener('DOMContentLoaded', () => {
    // Add continuous floating hearts
    setInterval(createHeart, 2000);
    
    // Add sparkle effect on mouse move
    document.addEventListener('mousemove', createSparkle);
    
    // Start countdown with more frequent updates
    updateCountdown();
    setInterval(updateCountdown, 1000); // Update every second
});

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = ['❤️', '💖', '💝', '💕'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + '%'; 
    heart.style.animation = 'float 3s forwards, rotate 3s infinite linear';
    heart.style.position = 'fixed';
    heart.style.bottom = '0';
    heart.style.fontSize = '1.5rem';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

function createSparkle(e) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}

function createFirework(x, y) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    document.body.appendChild(firework);

    // Create shockwave effect
    const shockwave = document.createElement('div');
    shockwave.className = 'shockwave';
    shockwave.style.left = x + 'px';
    shockwave.style.top = y + 'px';
    document.body.appendChild(shockwave);
    
    setTimeout(() => shockwave.remove(), 1000);

    const colors = [
        '#ff0000', '#ffd700', '#ff1493', '#00ff00', '#00ffff', 
        '#ff69b4', '#ff4500', '#9400d3', '#7fffd4'
    ];
    
    // Create more particles for bigger fireworks
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        // Create more random patterns
        const angle = (Math.PI * 2 * i) / 80 + (Math.random() * 0.5);
        const velocity = 2 + Math.random() * 6;
        const xDistance = Math.cos(angle) * 150 * velocity;
        const yDistance = Math.sin(angle) * 150 * velocity;
        
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty('--x', xDistance + 'px');
        particle.style.setProperty('--y', yDistance + 'px');
        
        particle.style.animation = 'explode 1.5s ease-out forwards';
        firework.appendChild(particle);
    }

    setTimeout(() => firework.remove(), 1500);
}

function startCelebration() {
    const celebrationText = document.createElement('div');
    celebrationText.className = 'celebration-text';
    celebrationText.innerHTML = '✨ Happy 7th Anniversary! ✨<br>Lộc & Thơ';
    document.body.appendChild(celebrationText);
    celebrationText.style.opacity = '1';

    let fireworksCount = 0;
    const fireworksInterval = setInterval(() => {
        const numFireworks = Math.floor(Math.random() * 2) + 2;
        for(let i = 0; i < numFireworks; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.7);
            createFirework(x, y);
        }
        
        fireworksCount++;
    }, 200);

    // Stop fireworks after 15 seconds
    setTimeout(() => {
        clearInterval(fireworksInterval);
        // Optionally fade out celebration text after fireworks
        setTimeout(() => {
            celebrationText.style.opacity = '0';
            setTimeout(() => celebrationText.remove(), 500);
        }, 1000);
    }, 15000);
}

function updateCountdown() {
    // Get current time in UTC+7
    const now = new Date();
    const utc7Offset = 7 * 60; // UTC+7 offset in minutes
    const localOffset = -now.getTimezoneOffset(); // Local offset in minutes
    const offsetDiff = utc7Offset - localOffset; // Difference to UTC+7
    
    // Adjust current time to UTC+7
    const nowUtc7 = new Date(now.getTime() + offsetDiff * 60 * 1000);
    
    // Set target time to next midnight UTC+7
    const targetDate = new Date(nowUtc7);
    targetDate.setHours(24, 0, 0, 0);
    
    const difference = targetDate.getTime() - nowUtc7.getTime();
    
    if (difference <= 0) {
        document.getElementById('countdown-timer').innerHTML = `
            <div class="countdown-box">
                <div class="number">Happy Anniversary! 🎉</div>
            </div>
        `;
        
        if (!document.querySelector('.celebration-text')) {
            startCelebration();
        }
        return;
    }
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('countdown-timer').innerHTML = `
        <div class="countdown-box">
            <div class="number">${hours.toString().padStart(2, '0')}</div>
            <div class="label">hours</div>
        </div>
        <div class="countdown-box">
            <div class="number">${minutes.toString().padStart(2, '0')}</div>
            <div class="label">minutes</div>
        </div>
        <div class="countdown-box">
            <div class="number">${seconds.toString().padStart(2, '0')}</div>
            <div class="label">seconds</div>
        </div>
    `;
} 