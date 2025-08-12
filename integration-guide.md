# 🎨 ParticlesGL Integration Guide
## Adding Pixel Gallery Effects to Your Website

### 📁 **Required Files**

Copy these files from your ParticlesGL project:
```
your-website/
├── scripts/
│   └── particlesGL.min.js    # Main library
├── assets/                   # Optional: for 3D models
│   └── your-model.gltf
└── your-page.html
```

### 🔗 **Step 1: Add Required Dependencies**

Add these script tags to your HTML (before closing `</body>` tag):

```html
<!-- Required: Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- Optional: For GUI controls during development -->
<script src="https://cdn.jsdelivr.net/npm/lil-gui@0.19.1/dist/lil-gui.umd.min.js"></script>

<!-- Your ParticlesGL Library -->
<script src="scripts/particlesGL.min.js"></script>
```

### 🎯 **Step 2: Basic HTML Structure**

Add classes to elements you want to have particle effects:

```html
<!-- Your existing content -->
<section class="introduction-section">
    <h1 class="section-title particle-title">Introduction</h1>
    
    <div class="content-card">
        <div class="illustration-container">
            <!-- Background particle effect -->
            <div class="particle-background"></div>
            
            <!-- Your existing content -->
            <div class="design-elements">
                <div class="button-stack particle-buttons">
                    <div class="design-button">Button</div>
                    <div class="design-button">Button</div>
                    <div class="design-button">Button</div>
                </div>
            </div>
        </div>
        
        <div class="content-section">
            <h2 class="particle-content-title">Read: How I approach UX Design</h2>
        </div>
    </div>
</section>
```

### ⚡ **Step 3: Initialize Particle Effects**

Add this JavaScript code:

```html
<script>
// Store all particle effects
let particleEffects = [];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeParticleEffects();
});

function initializeParticleEffects() {
    // 1. Title Effect
    particleEffects.push(
        particlesGL({
            target: '.particle-title',
            character: '◆',
            particleSize: 0.06,
            particleColor: '#2c3e50',
            tilt: true,
            tiltFactor: 0.2,
            displaceStrength: 0.8,
            displaceRadius: 0.15,
            returnSpeed: 0.05,
            sampling: 3
        })
    );

    // 2. Background Effect
    const backgroundGeometry = createGridGeometry(0.8, 0.6, 12, 8);
    particleEffects.push(
        particlesGL({
            target: '.particle-background',
            geometry: backgroundGeometry,
            character: '·',
            particleSize: 0.02,
            particleColor: 'rgba(255,255,255,0.6)',
            displaceStrength: 0.3,
            displaceRadius: 0.08,
            returnSpeed: 0.08
        })
    );

    // 3. Interactive Elements
    particleEffects.push(
        particlesGL({
            target: '.particle-buttons',
            character: '●',
            particleSize: 0.04,
            particleColor: 'sample', // Samples colors from element
            tilt: true,
            displaceStrength: 1.0,
            displaceRadius: 0.12,
            sampling: 4
        })
    );

    // 4. Content Title
    particleEffects.push(
        particlesGL({
            target: '.particle-content-title',
            character: '•',
            particleSize: 0.03,
            particleColor: '#2c3e50',
            tilt: true,
            displaceStrength: 0.5,
            displaceRadius: 0.08,
            sampling: 4
        })
    );
}

// Helper function for background grid
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

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    particleEffects.forEach(effect => {
        if (effect && effect.cleanup) effect.cleanup();
    });
});
</script>
```

### 🎨 **Step 4: CSS Styling**

Add these CSS rules to ensure proper positioning:

```css
/* Essential positioning for particle effects */
.particle-title {
    position: relative;
    z-index: 2;
}

.particle-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
}

.particle-buttons {
    position: relative;
    z-index: 2;
}

.particle-content-title {
    position: relative;
    z-index: 2;
}

/* Make sure containers have proper positioning */
.illustration-container {
    position: relative;
    overflow: hidden;
}
```

## 🎛️ **Effect Variations for Different Sections**

### **For Headers/Titles:**
```javascript
particlesGL({
    target: '.your-header',
    character: '◆',           // Diamond shape
    particleSize: 0.06,       // Larger for headers
    particleColor: '#2c3e50', // Your brand color
    tilt: true,               // 3D tilt effect
    tiltFactor: 0.2,
    displaceStrength: 0.8,
    displaceRadius: 0.15,
    sampling: 3               // Higher quality
});
```

### **For Background Areas:**
```javascript
const gridGeometry = createGridGeometry(1.0, 0.8, 15, 10);
particlesGL({
    target: '.background-area',
    geometry: gridGeometry,
    character: '·',                          // Small dots
    particleSize: 0.02,                      // Very small
    particleColor: 'rgba(255,255,255,0.3)',  // Semi-transparent
    tilt: false,                             // No tilt for backgrounds
    displaceStrength: 0.3,                   // Subtle movement
    displaceRadius: 0.08,
    returnSpeed: 0.08
});
```

### **For Interactive Elements:**
```javascript
particlesGL({
    target: '.interactive-element',
    character: '●',
    particleSize: 0.04,
    particleColor: 'sample',    // Sample colors from element
    tilt: true,
    tiltFactor: 0.3,
    displaceStrength: 1.0,      // Strong interaction
    displaceRadius: 0.12,
    velocityInfluence: 0.6,     // Responsive to mouse speed
    sampling: 4
});
```

### **For Images/Cards:**
```javascript
particlesGL({
    target: '.card-image',
    character: '▲',
    particleSize: 0.035,
    particleColor: 'sample',    // Sample image colors
    tilt: true,
    tiltFactor: 0.15,
    displaceStrength: 0.7,
    displaceRadius: 0.1,
    sampling: 5                 // Good balance of quality/performance
});
```

## 🎨 **Character Options**

Choose different characters for different effects:

```javascript
// Geometric shapes
character: '●'    // Filled circle
character: '◆'    // Diamond
character: '▲'    // Triangle  
character: '■'    // Square

// Decorative
character: '★'    // Star
character: '✨'   // Sparkle
character: '◉'    // Double circle

// Technical
character: '·'    // Small dot
character: '+'    // Plus
character: '01'   // Binary (good with monospace font)

// Directional
character: '→'    // Arrow
character: '~'    // Wave
```

## 🎯 **Color Options**

```javascript
// Solid colors
particleColor: '#ff6b6b'              // Hex color
particleColor: 'rgb(255, 107, 107)'   // RGB
particleColor: 'rgba(255,255,255,0.6)' // With transparency

// Sample from element (most dynamic!)
particleColor: 'sample'               // Samples colors from the target element
```

## ⚡ **Performance Tips**

1. **Sampling**: Higher = fewer particles = better performance
   ```javascript
   sampling: 6  // Good for mobile
   sampling: 3  // High quality for desktop
   ```

2. **Particle Size**: Smaller = better performance
   ```javascript
   particleSize: 0.02  // Very efficient
   particleSize: 0.08  // More impactful but heavier
   ```

3. **Multiple Effects**: The library uses a shared renderer for efficiency

## 🔧 **Troubleshooting**

### **Particles not showing?**
- Check browser console for errors
- Ensure Three.js is loaded before particlesGL.js
- Verify target elements exist when script runs

### **Performance issues?**
- Increase `sampling` value (4-8)
- Reduce `particleSize`
- Use fewer effects simultaneously

### **Positioning problems?**
- Ensure parent containers have `position: relative`
- Check z-index values
- Verify overflow settings

## 🎨 **Quick Copy-Paste Templates**

### **Template 1: Simple Text Effect**
```html
<h1 class="my-title">Your Text</h1>
<script>
particlesGL({
    target: '.my-title',
    character: '●',
    particleSize: 0.05,
    particleColor: '#333',
    tilt: true,
    displaceStrength: 0.8
});
</script>
```

### **Template 2: Background Pattern**
```html
<div class="hero-section">
    <div class="particle-bg"></div>
    <!-- Your content -->
</div>

<script>
const grid = createGridGeometry(1.2, 0.8, 20, 12);
particlesGL({
    target: '.particle-bg',
    geometry: grid,
    character: '·',
    particleSize: 0.015,
    particleColor: 'rgba(255,255,255,0.4)',
    displaceStrength: 0.2
});
</script>
```

### **Template 3: Image Gallery**
```html
<div class="gallery">
    <img src="image1.jpg" class="gallery-item">
    <img src="image2.jpg" class="gallery-item">
    <img src="image3.jpg" class="gallery-item">
</div>

<script>
document.querySelectorAll('.gallery-item').forEach((img, index) => {
    particlesGL({
        target: img,
        character: ['●', '◆', '▲'][index % 3],
        particleSize: 0.04,
        particleColor: 'sample',
        tilt: true,
        displaceStrength: 1.0,
        sampling: 5
    });
});
</script>
```

That's it! You now have everything you need to add stunning particle effects to any section of your website. The effects will automatically respond to mouse movement and create engaging interactive experiences.
