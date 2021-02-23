import Sun from './sun.js';
import Planet from './planet.js';
import {SunInfo, MoonInfo, PlanetInfo} from './planetInfo.js';
import Background from './background.js';

class App {
  constructor() {
    this.stage = document.createElement('div');
    this.stage.setAttribute('id', 'stage');
    document.body.appendChild(this.stage);

    this.stage.appendChild(this.createAndAppendCanvas('back'));
    this.stage.appendChild(this.createAndAppendCanvas(''));
    this.stage.appendChild(this.createAndAppendCanvas('path'));

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    this.sun = new Sun(this.stageWidth, this.stageHeight);

    this.createPlanets();

    new Background(400, this.backctx, this.stageWidth, this.stageHeight);
    this.animate();
  }

  createAndAppendCanvas(name) {
    this[`${name}canvas`] = document.createElement('canvas');
    this[`${name}canvas`].setAttribute('id', `${name}canvas`);

    this[`${name}ctx`] = this[`${name}canvas`].getContext('2d');

    return this[`${name}canvas`];
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.sizeCanvasAndScaleCtx('');
    this.sizeCanvasAndScaleCtx('back');
    this.sizeCanvasAndScaleCtx('path');
  }

  sizeCanvasAndScaleCtx(name) {
    this[`${name}canvas`].width = this.stageWidth * 2;
    this[`${name}canvas`].height = this.stageHeight * 2;

    this[`${name}ctx`].scale(2, 2);
  }

  createPlanets() {
    this.planets = [];
    PlanetInfo.forEach((planet) => {
      this.planets.push(
        new Planet(
          planet.name,
          planet.radius,
          planet.color,
          planet.orbitRadius,
          planet.velocity
        )
      );
    });
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.time = new Date();

    // first drawn, drawn on top
    this.ctx.globalCompositeOperation = 'destination-over';
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.pathctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.planets.forEach((planet) => {
      planet.update(
        this.ctx,
        this.time,
        this.stageWidth,
        this.stageHeight,
        this.pathctx
      );
    });

    this.sun.draw(this.ctx);
  }
}

new App();
