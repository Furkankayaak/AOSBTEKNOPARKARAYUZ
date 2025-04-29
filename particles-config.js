particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80, // Number of particles
        "density": {
          "enable": true,
          "value_area": 800 // Area density
        }
      },
      "color": {
        "value": "#61dafb" // Particle color (techy blue)
      },
      "shape": {
        "type": "circle", // Shape of particles
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.6, // Particle opacity
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3, // Particle size
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150, // Max distance to link particles
        "color": "#3b4f7f", // Line color (darker blue)
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3, // Particle movement speed
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true, // Enable hover interactivity
          "mode": "repulse" // Mode on hover (push particles away)
        },
        "onclick": {
          "enable": true, // Enable click interactivity
          "mode": "push" // Mode on click (add particles)
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 100, // Distance particles are pushed
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4 // Number of particles added on click
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true // Handles high-density displays
  });