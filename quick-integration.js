// 🎨 ParticlesGL Quick Integration Script
// Copy this code into your website to add particle effects

// Store all particle effects for cleanup
let particleEffects = [];

// Initialize particle effects when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Initializing ParticlesGL effects...');
    initializeParticleEffects();
});

function initializeParticleEffects() {
    
    // ==========================================
    // TITLE EFFECTS - For main headings
    // ==========================================
    
    // Main page title effect
    if (document.querySelector('.particle-title') || document.querySelector('.main-title')) {
        particleEffects.push(
            particlesGL({
                target: '.particle-title, .main-title',
                character: '◆',
                particleSize: 0.06,
                particleColor: '#2c3e50',
                tilt: true,
                tiltFactor: 0.2,
                tiltSpeed: 0.04,
                displaceStrength: 0.8,
                displaceRadius: 0.15,
                velocityInfluence: 0.4,
                returnSpeed: 0.05,
                sampling: 3,
                on: {
                    init: () => console.log('✅ Title particles initialized!')
                }
            })
        );
    }

    // Section headings effect
    if (document.querySelector('.particle-heading') || document.querySelector('.section-heading')) {
        particleEffects.push(
            particlesGL({
                target: '.particle-heading, .section-heading',
                character: '▲',
                particleSize: 0.05,
                particleColor: '#667eea',
                tilt: true,
                tiltFactor: 0.15,
                displaceStrength: 0.7,
                displaceRadius: 0.12,
                returnSpeed: 0.06,
                sampling: 4,
                on: {
                    init: () => console.log('✅ Heading particles initialized!')
                }
            })
        );
    }

    // ==========================================
    // BACKGROUND EFFECTS - For areas/sections
    // ==========================================
    
    // Grid background pattern
    if (document.querySelector('.particle-background') || document.querySelector('.hero-bg')) {
        const gridGeometry = createGridGeometry(1.0, 0.8, 15, 10);
        particleEffects.push(
            particlesGL({
                target: '.particle-background, .hero-bg',
                geometry: gridGeometry,
                character: '·',
                particleSize: 0.02,
                particleColor: 'rgba(255,255,255,0.4)',
                tilt: false,
                displaceStrength: 0.3,
                displaceRadius: 0.08,
                velocityInfluence: 0.2,
                returnSpeed: 0.08,
                on: {
                    init: () => console.log('✅ Background particles initialized!')
                }
            })
        );
    }

    // Circular background pattern
    if (document.querySelector('.particle-circle-bg')) {
        const circleGeometry = createCirclePattern(0.4, 32);
        particleEffects.push(
            particlesGL({
                target: '.particle-circle-bg',
                geometry: circleGeometry,
                character: '◉',
                particleSize: 0.025,
                particleColor: 'rgba(255,255,255,0.3)',
                tilt: false,
                displaceStrength: 0.4,
                displaceRadius: 0.1,
                velocityInfluence: 0.3,
                returnSpeed: 0.06,
                on: {
                    init: () => console.log('✅ Circle background particles initialized!')
                }
            })
        );
    }

    // ==========================================
    // INTERACTIVE ELEMENTS - For buttons, cards
    // ==========================================
    
    // Button/card effects
    if (document.querySelector('.particle-button') || document.querySelector('.particle-card')) {
        particleEffects.push(
            particlesGL({
                target: '.particle-button, .particle-card',
                character: '●',
                particleSize: 0.04,
                particleColor: 'sample', // Samples colors from the element
                tilt: true,
                tiltFactor: 0.3,
                tiltSpeed: 0.06,
                displaceStrength: 1.0,
                displaceRadius: 0.12,
                velocityInfluence: 0.6,
                returnSpeed: 0.04,
                sampling: 4,
                on: {
                    init: () => console.log('✅ Interactive particles initialized!')
                }
            })
        );
    }

    // Image gallery effects
    if (document.querySelector('.particle-image') || document.querySelector('.gallery-item')) {
        particleEffects.push(
            particlesGL({
                target: '.particle-image, .gallery-item',
                character: '■',
                particleSize: 0.035,
                particleColor: 'sample',
                tilt: true,
                tiltFactor: 0.2,
                displaceStrength: 0.8,
                displaceRadius: 0.1,
                velocityInfluence: 0.4,
                returnSpeed: 0.05,
                sampling: 5,
                on: {
                    init: () => console.log('✅ Image particles initialized!')
                }
            })
        );
    }

    // ==========================================
    // TEXT EFFECTS - For content text
    // ==========================================
    
    // Subtitle effects
    if (document.querySelector('.particle-subtitle')) {
        particleEffects.push(
            particlesGL({
                target: '.particle-subtitle',
                character: '•',
                particleSize: 0.03,
                particleColor: '#666',
                tilt: true,
                tiltFactor: 0.1,
                displaceStrength: 0.5,
                displaceRadius: 0.08,
                returnSpeed: 0.07,
                sampling: 4,
                on: {
                    init: () => console.log('✅ Subtitle particles initialized!')
                }
            })
        );
    }

    // Special text effects
    if (document.querySelector('.particle-special')) {
        particleEffects.push(
            particlesGL({
                target: '.particle-special',
                character: '★',
                particleSize: 0.05,
                particleColor: '#ffd700',
                tilt: true,
                tiltFactor: 0.4,
                displaceStrength: 1.2,
                displaceRadius: 0.18,
                velocityInfluence: 0.7,
                returnSpeed: 0.03,
                sampling: 3,
                on: {
                    init: () => console.log('✅ Special text particles initialized!')
                }
            })
        );
    }

    // ==========================================
    // AUTO-DETECT COMMON CLASSES
    // ==========================================
    
    // Auto-detect hero sections
    const heroElements = document.querySelectorAll('.hero, .hero-section, .banner');
    heroElements.forEach((hero, index) => {
        if (!hero.classList.contains('particle-processed')) {
            hero.classList.add('particle-processed');
            
            // Add a background div if it doesn't exist
            if (!hero.querySelector('.auto-particle-bg')) {
                const bgDiv = document.createElement('div');
                bgDiv.className = 'auto-particle-bg';
                bgDiv.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    pointer-events: none;
                `;
                hero.style.position = 'relative';
                hero.insertBefore(bgDiv, hero.firstChild);

                const autoGrid = createGridGeometry(1.2, 0.9, 18, 12);
                particleEffects.push(
                    particlesGL({
                        target: bgDiv,
                        geometry: autoGrid,
                        character: '·',
                        particleSize: 0.015,
                        particleColor: 'rgba(255,255,255,0.3)',
                        displaceStrength: 0.25,
                        displaceRadius: 0.06,
                        returnSpeed: 0.08,
                        on: {
                            init: () => console.log(`✅ Auto hero background ${index + 1} initialized!`)
                        }
                    })
                );
            }
        }
    });

    // Auto-detect main headings
    const headings = document.querySelectorAll('h1:not(.particle-processed), .title:not(.particle-processed)');
    headings.forEach((heading, index) => {
        if (!heading.classList.contains('particle-processed')) {
            heading.classList.add('particle-processed');
            particleEffects.push(
                particlesGL({
                    target: heading,
                    character: '◆',
                    particleSize: 0.05,
                    particleColor: getComputedStyle(heading).color || '#333',
                    tilt: true,
                    tiltFactor: 0.2,
                    displaceStrength: 0.7,
                    displaceRadius: 0.12,
                    returnSpeed: 0.05,
                    sampling: 3,
                    on: {
                        init: () => console.log(`✅ Auto heading ${index + 1} initialized!`)
                    }
                })
            );
        }
    });

    console.log(`🎉 Initialized ${particleEffects.length} particle effects!`);
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Create grid geometry for backgrounds
function createGridGeometry(width, height, cols, rows) {
    const positions = [];
    const stepX = width / (cols - 1);
    const stepY = height / (rows - 1);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = (j * stepX) - (width / 2);
            const y = (i * stepY) - (height / 2);
            positions.push(x, y, 0);
        }
    }

    return positions;
}

// Create circular pattern geometry
function createCirclePattern(radius, points) {
    const positions = [];
    const angleStep = (Math.PI * 2) / points;

    for (let i = 0; i < points; i++) {
        const angle = i * angleStep;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        positions.push(x, y, 0);
    }

    return positions;
}

// Create spiral pattern
function createSpiralGeometry(radius, turns, points) {
    const positions = [];
    const angleStep = (Math.PI * 2 * turns) / points;

    for (let i = 0; i < points; i++) {
        const angle = i * angleStep;
        const currentRadius = (radius * i) / points;
        const x = Math.cos(angle) * currentRadius;
        const y = Math.sin(angle) * currentRadius;
        positions.push(x, y, 0);
    }

    return positions;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Add particle effect to any element
function addParticleEffect(selector, options = {}) {
    const defaultOptions = {
        character: '●',
        particleSize: 0.04,
        particleColor: '#333',
        tilt: true,
        tiltFactor: 0.2,
        displaceStrength: 0.8,
        displaceRadius: 0.12,
        returnSpeed: 0.05,
        sampling: 4
    };

    const finalOptions = { ...defaultOptions, ...options, target: selector };
    
    const effect = particlesGL(finalOptions);
    if (effect) {
        particleEffects.push(effect);
        console.log(`✅ Added particle effect to: ${selector}`);
    }
    return effect;
}

// Remove all particle effects
function removeAllParticleEffects() {
    particleEffects.forEach(effect => {
        if (effect && typeof effect.cleanup === 'function') {
            effect.cleanup();
        }
    });
    particleEffects = [];
    console.log('🧹 All particle effects cleaned up');
}

// Update all particle effects
function updateAllParticleEffects(options) {
    particleEffects.forEach(effect => {
        if (effect && typeof effect.updateOptions === 'function') {
            effect.updateOptions(options);
        }
    });
    console.log('🔄 All particle effects updated');
}

// ==========================================
// CLEANUP AND GLOBAL FUNCTIONS
// ==========================================

// Cleanup on page unload
window.addEventListener('beforeunload', removeAllParticleEffects);

// Make functions globally available
window.ParticlesGL = {
    addEffect: addParticleEffect,
    removeAll: removeAllParticleEffects,
    updateAll: updateAllParticleEffects,
    effects: particleEffects,
    
    // Preset configurations
    presets: {
        title: {
            character: '◆',
            particleSize: 0.06,
            tilt: true,
            tiltFactor: 0.2,
            displaceStrength: 0.8,
            displaceRadius: 0.15,
            sampling: 3
        },
        
        subtitle: {
            character: '•',
            particleSize: 0.03,
            tilt: true,
            tiltFactor: 0.1,
            displaceStrength: 0.5,
            displaceRadius: 0.08,
            sampling: 4
        },
        
        interactive: {
            character: '●',
            particleSize: 0.04,
            particleColor: 'sample',
            tilt: true,
            tiltFactor: 0.3,
            displaceStrength: 1.0,
            displaceRadius: 0.12,
            velocityInfluence: 0.6,
            sampling: 4
        },
        
        background: {
            character: '·',
            particleSize: 0.02,
            particleColor: 'rgba(255,255,255,0.4)',
            tilt: false,
            displaceStrength: 0.3,
            displaceRadius: 0.08,
            returnSpeed: 0.08
        }
    }
};

console.log('🎨 ParticlesGL integration script loaded!');
console.log('💡 Use window.ParticlesGL.addEffect(selector, options) to add effects manually');
console.log('💡 Available presets:', Object.keys(window.ParticlesGL.presets));
