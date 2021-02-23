import Sun from './sun.js';
import Moon from './moon.js';
import Earth from './earth.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    this.sun = new Sun();
    this.moon = new Moon();
    this.earth = new Earth();

    this.animate();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;

    this.ctx.scale(2, 2);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    
    this.time = new Date();

    // first drawn, drawn on top
    this.ctx.globalCompositeOperation = 'destination-over';
    this.ctx.clearRect(0, 0, 300, 300);
    
    this.earth.draw(this.ctx, this.time);
    this.moon.draw(this.ctx, this.time);
    this.sun.draw(this.ctx);
  }
}

new App();
