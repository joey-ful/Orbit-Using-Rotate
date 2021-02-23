import {MoonInfo} from './planetInfo.js';

export default class Satellite {
  constructor() {
    this.name = MoonInfo.name;
    this.radius = MoonInfo.radius;
    this.color = MoonInfo.color;
    this.orbitRadius = MoonInfo.orbitRadius;

    this.img = new Image();
    this.img.src = `./srcs/${this.name}.png`;
  }

  update(ctx, time, earthRadius, velocity, pathctx) {
    ctx.save();
    this.rotateAndTranslate(ctx, time, velocity);
    this.draw(ctx);
    ctx.restore();

    this.drawPath(pathctx);
    ctx.restore();
  }

  rotateAndTranslate(ctx, time, velocity) {
    ctx.rotate(
      (((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds()) *
        velocity *
        4
    );
    ctx.translate(this.orbitRadius, 0);
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  drawPath(pathctx) {
    pathctx.beginPath();
    pathctx.arc(0, 0, 28, 0, Math.PI * 2, false);
    pathctx.strokeStyle = this.color;
    pathctx.stroke();
  }
}
