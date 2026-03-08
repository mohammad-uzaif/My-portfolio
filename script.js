// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Initialize Theme Based on Local Storage
const savedTheme = localStorage.getItem('uzaifTheme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('uzaifTheme', isLight ? 'light' : 'dark');
    
    // Toggle Icon and animate rotation
    themeIcon.style.transform = 'rotate(180deg) scale(0)';
    
    setTimeout(() => {
        if(isLight) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        themeIcon.style.transform = 'rotate(360deg) scale(1)';
        
        // Reset transform later to allow future animations
        setTimeout(() => { themeIcon.style.transform = ''; }, 500);
    }, 250);

    // Update 3D Background Colors
    if (window.updateThreeJSTheme) {
        window.updateThreeJSTheme(isLight);
    }
});

// --- Loader Logic ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.visibility = 'hidden';
            initThreeJS(); 
        }, 800);
    }, 1200); // Give time for the text reveal animation
});

// --- Mobile Menu Toggle Logic ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark text-lg"></i>';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-lg"></i>';
        document.body.style.overflow = '';
    }
}

mobileMenuBtn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// --- Projects Modal Logic ---
const openProjectsModalBtn = document.getElementById('open-projects-modal');
const closeProjectsModalBtn = document.getElementById('close-projects-modal');
const projectsModal = document.getElementById('projects-modal');
const projectsModalContent = document.getElementById('projects-modal-content');

function openProjectsModal() {
    projectsModal.classList.remove('opacity-0', 'pointer-events-none');
    projectsModalContent.classList.remove('scale-95');
    projectsModalContent.classList.add('scale-100');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeProjectsModal() {
    projectsModal.classList.add('opacity-0', 'pointer-events-none');
    projectsModalContent.classList.remove('scale-100');
    projectsModalContent.classList.add('scale-95');
    document.body.style.overflow = ''; // Restore scrolling
}

if (openProjectsModalBtn && closeProjectsModalBtn && projectsModal) {
    openProjectsModalBtn.addEventListener('click', openProjectsModal);
    closeProjectsModalBtn.addEventListener('click', closeProjectsModal);
    
    // Close when clicking outside the content box
    projectsModal.addEventListener('click', (e) => {
        if (e.target === projectsModal) {
            closeProjectsModal();
        }
    });
}

// --- Visitor Counter ---
function updateVisitorCount() {
    let count = localStorage.getItem('uzaifPortfolioViews');
    if (!count) {
        count = 1432; // Aesthetic baseline
    } else {
        count = parseInt(count) + 1;
    }
    localStorage.setItem('uzaifPortfolioViews', count);
    
    // Format to look like a digital gauge e.g. 001,432
    const formatted = count.toString().padStart(6, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('visitor-count').innerText = formatted;
}
updateVisitorCount();

// --- Three.js Abstract Constellation Background ---
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    
    // Camera setup to view the flat-ish network
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize performance
    container.appendChild(renderer.domElement);

    // Particles
    const particleCount = 400; // Less is more elegant
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    // Spread them out in a wide, slightly deep plane
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 800;     // X
        positions[i * 3 + 1] = (Math.random() - 0.5) * 800; // Y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200; // Z depth

        // subtle random movement speed
        velocities.push({
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.2,
            z: (Math.random() - 0.5) * 0.1
        });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Minimalist points
    const isInitiallyLight = document.body.classList.contains('light-mode');
    const particleColor = isInitiallyLight ? 0x000000 : 0xffffff;

    const material = new THREE.PointsMaterial({
        color: particleColor,
        size: 1.5,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Lines connecting close particles
    const lineMaterial = new THREE.LineBasicMaterial({
        color: particleColor,
        transparent: true,
        opacity: 0.1
    });
    
    const lineGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Export function to update colors on theme switch
    window.updateThreeJSTheme = function(isLight) {
        const color = isLight ? 0x000000 : 0xffffff;
        material.color.setHex(color);
        lineMaterial.color.setHex(color);
    };

    // Mouse Interaction for subtle parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Update particle positions
        const positions = particles.geometry.attributes.position.array;
        
        // Array to hold dynamic line segments
        const linePositions = [];

        for (let i = 0; i < particleCount; i++) {
            // Move
            positions[i * 3] += velocities[i].x;
            positions[i * 3 + 1] += velocities[i].y;
            positions[i * 3 + 2] += velocities[i].z;

            // Bounds check to keep them from flying away
            if (positions[i * 3] < -400 || positions[i * 3] > 400) velocities[i].x *= -1;
            if (positions[i * 3 + 1] < -400 || positions[i * 3 + 1] > 400) velocities[i].y *= -1;
            if (positions[i * 3 + 2] < -100 || positions[i * 3 + 2] > 100) velocities[i].z *= -1;

            // Check distances for lines (O(n^2) simple approach, optimized by low particle count)
            for(let j = i + 1; j < particleCount; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const distSq = dx*dx + dy*dy + dz*dz;

                // If close enough, draw a line segment
                if (distSq < 3000) {
                    linePositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );
                }
            }
        }

        particles.geometry.attributes.position.needsUpdate = true;
        
        // Update Lines
        linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        // Smooth Camera Parallax Pan
        targetX = mouseX;
        targetY = mouseY;
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
}